using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Threading;
using System.Xml.Linq;

namespace Log_and_Reg
{
    public partial class UserData : System.Web.UI.Page
    {
        protected string userColumnsTable = "";
        protected string userDetailsTable = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            userColumnsTable += "<table><tr><td>שם פרטי:<td><tr><tr><td>שם משפחה:<td><tr><tr><td>שם משתמש:</td></tr><tr><td>סיסמה:</td></tr><tr><td>כתובת דואר אלקטרוני:</td></tr><tr><td>מספר טלפון:</td></tr><tr><td> כתובת:</td></tr><tr><td> מגדר:</td></tr><tr><td> תאריך לידה:</td></tr>";

            //logout not working
            if (Request.Form["logout"] != null)
            {
                Session["Admin"] = "N";
                Session["UserName"] = "Guest";
                Response.Redirect("Login.aspx");
                Response.End();
            }

            // protect from unathorize users to open page
            if (Session["UserName"].ToString() == "Guest")
            {
                Session["ErrorText"] = "ERROR: SESSION HAS TIMED OUT";
                Response.Redirect("ErrorPage.aspx");
            }
            else
            {
                if (Session["Admin"].ToString() == "Y")
                {

                    DataSet Data = new DataSet();
                    Data.ReadXml(MapPath("AdminList.xml"));
                    foreach (DataRow row in Data.Tables[0].Rows)
                    {
                        if (row["UserName"].ToString() == Session["UserName"].ToString())
                        {
                            string username = row["UserName"].ToString();
                            string password = row["Password"].ToString();
                            string firstName = row["FirstName"].ToString();
                            string lastName = row["LastName"].ToString();
                            string email = row["Email"].ToString();
                            string phone = row["Phone"].ToString();
                            string address = row["Address"].ToString();
                            string Gender = row["Gender"].ToString();
                            string BirthDate = row["DateOfBirth"].ToString();
                            userDetailsTable += string.Format("<table cellpadding = \"5\" ><tr><td>{0}</td></tr><tr><td>{1}</td></tr><tr><td>{3}</td></tr><tr><td>{4}</td></tr><tr><td>{5}</td></tr><tr><td>{6}</td></tr><tr><td>{7}</td></tr><tr><td>{8}</td></tr></table>", firstName, lastName, username, password, email, phone, address, Gender, BirthDate);
                        }
                    }
                }
                string cmdString = "";
                SqlCommand cmd;
                //build the fields display in table format (first column of table)

                string connectionString = Session["ConnectionString"].ToString();

                SqlConnection conn = new SqlConnection(connectionString);
                cmdString = string.Format("SELECT * FROM [Table] WHERE ([UserName] = N'{0}')", Session["UserName"]);
                cmd = new SqlCommand(cmdString, conn);
                conn.Open();
                SqlDataAdapter da = new SqlDataAdapter(cmdString, connectionString);
                DataSet ds = new DataSet();
                da.Fill(ds);

                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    //build the fields values in table format (second column of table)
                    userDetailsTable += "<table><tr><td>" + ds.Tables[0].Rows[i]["FirstName"] + "</td></tr>" + "<tr><td>" + ds.Tables[0].Rows[i]["LastName"] + "</td></tr>" + "<tr><td>" + ds.Tables[0].Rows[i]["UserName"] + "</td></tr>" + "<tr><td>" + ds.Tables[0].Rows[i]["Password"] + "</td></tr>" + "<tr><td>" + ds.Tables[0].Rows[i]["Email"] + "</td></tr>" + "<tr><td>" + ds.Tables[0].Rows[i]["Phone"] + "</td></tr>" + "<tr><td>" + ds.Tables[0].Rows[i]["Address"] + "</td></tr>" + "<tr><td>" + "<tr><td>" + ds.Tables[0].Rows[i]["Gender"] + "</td></tr>" + "<tr><td>" + ds.Tables[0].Rows[i]["DateOfBirth"] + "</td></tr>";
                }
                conn.Close();
            }

            userDetailsTable += "</table>";
            userColumnsTable += "</table>";
        }
    }
}