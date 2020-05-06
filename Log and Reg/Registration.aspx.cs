using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
namespace Log_and_Reg
{
    public partial class Registration : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Form["submit"] != null)
            {
                string firstname = Request.Form["FN"];
                string lastname = Request.Form["LN"];
                string userName = Request.Form["UN"];
                string password = Request.Form["PW"];
                string email = Request.Form["EM"];
                string phone = Request.Form["PH"];
                string address = Request.Form["ADD"];
                string gender = Request.Form["gender"];
                string DateOfBirth = Request.Form["DOB"];

                if (email != "" && userName != "")
                {
                    // email should be unique
                    if (isExistsMail(email))
                    {
                        Session["ErrorText"] = email + " already exists";
                        Response.Redirect("ErrorPage.aspx");
                        Response.End();
                    }
                    // user name should be unique
                    if (isExistsUserName(userName))
                    {
                        Session["ErrorText"] = userName + " already exists";
                        Response.Redirect("ErrorPage.aspx");
                        Response.End();
                    }

                    // this parameter is taken from database property "Connection String"
                    string connectionString = Session["ConnectionString"].ToString();
                    // Build insert query base on user details
                    string cmdStr = string.Format("INSERT INTO [Table](FirstName, [LastName], Email,  [DateOfBirth], Gender, Phone, [Address], [UserName], [Password]) VALUES (N'{0}', N'{1}', N'{2}', N'{3}', N'{4}', N'{5}',  N'{6}', N'{7}', N'{8}')", firstname , lastname, email, DateOfBirth, gender, phone, address, userName, password);
                    // Create connected scenario connection
                    SqlConnection conObj = new SqlConnection(connectionString);
                    SqlCommand cmdObj = new SqlCommand(cmdStr, conObj);
                    conObj.Open();
                    int n = cmdObj.ExecuteNonQuery();
                    conObj.Close();
                    if (n == 1)
                    {
                        Response.Redirect("Login.aspx");
                    }
                }
            }

        }

        bool isExistsMail(string mail)
        {
            bool b = false;
            // this parameter is taken from database property "Connection String"
            string connectionString = Session["ConnectionString"].ToString();

            SqlConnection conn = new SqlConnection(connectionString);
            string cmdString = string.Format("SELECT * FROM [Table] WHERE (Email = N'{0}')", mail);
            SqlCommand cmd = new SqlCommand(cmdString, conn);
            conn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            if (dr.HasRows)
                b = true;
            conn.Close();
            return b;
        }

        bool isExistsUserName(string name)
        {
            bool b = false;
            // this parameter is taken from database property "Connection String"
            string connectionString = Session["ConnectionString"].ToString();

            SqlConnection conn = new SqlConnection(connectionString);
            string cmdString = string.Format("SELECT * FROM [Table] WHERE ([UserName] = N'{0}')", name);
            SqlCommand cmd = new SqlCommand(cmdString, conn);
            conn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            if (dr.HasRows)
                b = true;
            conn.Close();
            return b;

        }
    }
}