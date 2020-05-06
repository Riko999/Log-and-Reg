using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
// imports
using System.Data;
using System.Data.SqlClient;

namespace Log_and_Reg
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Form["submitlog"] != null)
            {
                // pull the username and passwords from the form
                string username = Request.Form["UN"];
                string password = Request.Form["PW"];
                // check to see if the username exists

                if (IsCorrect(username, password))
                {
                    Session["UserName"] = username;
                    Session["Password"] = password;
                    Response.Redirect("/UserData.aspx");
                }

                else
                {
                    if (IsAdminExists(username, password))
                    {
                        Session["UserName"] = username;
                        Session["Password"] = password;
                        Session["Admin"] = "Y";
                        Response.Redirect("AdminPage.aspx");
                    }
                    Session["ErrorText"] = "שגיאה המשתמש לא נמצא או שסיסמא לא נכונה";
                    Response.Redirect("ErrorPage.aspx");
                }

            }
        }

        public bool IsCorrect(string usern, string pass)
        {
            /*
             * Check the sql database for any row that contains both the entered username and the entered password
             * */

            bool correct = false;
            // use the connection string recevied from the mainDB properties
            string SQLConnStr = Session["ConnectionString"].ToString();
            // convert the SQLConn to an SqlConnection Object
            SqlConnection SQLConn = new SqlConnection(SQLConnStr);
            // create the command to look for fields that have the same username and password as the user entered
            string SQLCmdStr = string.Format("SELECT * FROM [Table] WHERE UserName=N'{0}' AND Password=N'{1}'", usern, pass);
            // convert the SqlCmdStr to an SqlCommand Object
            SqlCommand SQLCmd = new SqlCommand(SQLCmdStr, SQLConn);
            // Open the connection to the mainDB database
            SQLConn.Open();
            // execute the query in sql on the mainDB database and save the result
            SqlDataReader reader = SQLCmd.ExecuteReader();

            if (reader.HasRows)
            {
                correct = true;
            }
            // Close to the connection to the mainDB database
            SQLConn.Close();
            // return the result
            return correct;
        }

        public static bool IsAdminExists(string user, string password)
        {
            bool flag = false;
            DataSet ds = new DataSet();
            ds.ReadXml(System.Web.HttpContext.Current.Server.MapPath("AdminList.xml"));
            foreach (DataRow r in ds.Tables[0].Rows)
            {
                if (user.Equals(r[0]) && password.Equals(r[1]))
                {
                    flag = true;
                }
            }

            return flag;
        }
    }
}