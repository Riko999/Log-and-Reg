using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Xml.Linq;

namespace Log_and_Reg
{
    public partial class UserUpdate : System.Web.UI.Page
    {
        public string user = "";
        public string password = "";
        public string email = "";
        protected string phone = "";
        public string address = "";
        public string gender = "";
        public string birthday = "";
        public string fname = "";
        public string lname = "";


        // Execute query on database - connected scenario
        public void ExecuteQuery(string command)
        {
            // this parameter is taken from database property "Connection String"
            string connectionString = Session["ConnectionString"].ToString();

            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand(command, con);
            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();

        }
        protected void Page_Load(object sender, EventArgs e)
        {
            // protect from unathorize users to open page
            if (Session["UserName"].ToString() == "Guest")
            {
                Session["ErrorText"] = "ERROR: SESSION HAS TIMED OUT";
                Response.Redirect("ErrorPage.aspx");
            }

            ////////////////////////
            // Disconnected scenario
            ////////////////////////
            // user value is Taken from session
            user = Session["UserName"].ToString();
            if (Session["Admin"].ToString() == "Y")
            {
                DataSet dp = new DataSet();
                dp.ReadXml(MapPath("AdminList.xml"));
                foreach (DataRow rw in dp.Tables[0].Rows)
                {
                    if (rw["UserName"].ToString() == Session["UserName"].ToString())
                    {
                        gender = rw["Gender"].ToString();
                        fname = rw["FirstName"].ToString();
                        lname = rw["LastName"].ToString();
                        phone = rw["Phone"].ToString();
                        user = rw["UserName"].ToString();
                        password = rw["Password"].ToString();
                        email = rw["Email"].ToString();
                        birthday = rw["DateOfBirth"].ToString();
                        address = rw["Address"].ToString();
                    }
                }

                if (Request.Form["Update"] != null)
                {
                    password = Request.Form["pw"].ToString();
                    email = Request.Form["email"].ToString();
                    phone = Request.Form["phone"].ToString();
                    address = Request.Form["add"].ToString();
                    gender = Request.Form["gender"].ToString();
                    birthday = Request.Form["dob"].ToString();
                    fname = Request.Form["fn"].ToString();
                    lname = Request.Form["ln"].ToString();

                    // update table record from the form
                    var doc = XDocument.Load(MapPath("Admins.xml"));
                    var node = doc.Descendants("AD").FirstOrDefault(ad => ad.Element("UserName").Value == Session["UserName"].ToString());
                    node.SetElementValue("LastName", lname);
                    node.SetElementValue("FirstName", fname);
                    node.SetElementValue("Password", password);
                    node.SetElementValue("Password", password);
                    node.SetElementValue("Email", email);
                    node.SetElementValue("Gender", gender);
                    node.SetElementValue("Phone", phone);
                    node.SetElementValue("DateOfBirth", birthday);
                    node.SetElementValue("Address", address);
                    doc.Save(MapPath("Admins.xml"));
                    Response.Redirect("AdminsPage.aspx");
                }
            }
            else
            {
                // this parameter is taken from database property "Connection String"
                string connectionString = Session["ConnectionString"].ToString();
                //Bring user data from TbUsers table
                string cmdStr = string.Format("SELECT  * FROM  [Table] WHERE ([UserName] = N'{0}')", user);
                /// Phase 1 of disconnected scenario ///
                SqlDataAdapter da = new SqlDataAdapter(cmdStr, connectionString);
                DataSet ds = new DataSet(); // יצירת דאטה סט
                da.Fill(ds); // מילוי דאטה סט
                password = ds.Tables[0].Rows[0]["Password"].ToString();
                email = ds.Tables[0].Rows[0]["Email"].ToString();
                phone = ds.Tables[0].Rows[0]["Phone"].ToString();
                address = ds.Tables[0].Rows[0]["Address"].ToString();
                gender = ds.Tables[0].Rows[0]["Gender"].ToString();
                birthday = ds.Tables[0].Rows[0]["DateOfBirth"].ToString();
                fname = ds.Tables[0].Rows[0]["FirstName"].ToString();
                lname = ds.Tables[0].Rows[0]["LastName"].ToString();

                // if update button pressed, update field values from the form
                if (Request.Form["Update"] != null)
                {
                    password = Request.Form["pw"].ToString();
                    email = Request.Form["email"].ToString();
                    phone = Request.Form["phone"].ToString();
                    address = Request.Form["add"].ToString();
                    gender = Request.Form["gender"].ToString();
                    birthday = Request.Form["dob"].ToString();
                    fname = Request.Form["fn"].ToString();
                    lname = Request.Form["ln"].ToString();

                    // update table record from the form
                    ds.Tables[0].Rows[0]["Password"] = password;
                    ds.Tables[0].Rows[0]["Email"] = email;
                    ds.Tables[0].Rows[0]["Phone"] = phone;
                    ds.Tables[0].Rows[0]["Address"] = address;
                    ds.Tables[0].Rows[0]["Gender"] = gender;
                    ds.Tables[0].Rows[0]["DateOfBirth"] = birthday;
                    ds.Tables[0].Rows[0]["FirstName"] = fname;
                    ds.Tables[0].Rows[0]["LastName"] = lname;

                    // Phase 2 of disconnected scenario
                    SqlCommandBuilder builder = new SqlCommandBuilder(da);
                    da.UpdateCommand = builder.GetUpdateCommand();
                    da.Update(ds);

                    Response.Redirect("UserData.aspx");
                }
            }

        }
    }
}