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
    public partial class UserDelete : System.Web.UI.Page
    {
        public string user;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["UserName"].ToString() == "Guest")
            {
                Session["ErrorText"] = "ERROR: SESSION HAS TIMED OUT";
                Response.Redirect("ErrorPage.aspx");
            }
            string btn = Request.Form["DelUsr"];
            user = (string)Session["UserName"];
            if (btn != null)
            {
                // this parameter is taken from database property "Connection String"
                string connectionString = Session["ConnectionString"].ToString();

                SqlConnection conn = new SqlConnection(connectionString);
                string cmdString = string.Format("DELETE FROM [Table] WHERE ([UserName] = N'{0}')", Session["UserName"]);
                SqlCommand cmd = new SqlCommand(cmdString, conn);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
                Response.Redirect("Registration.aspx");
            }
        }
    }
}