using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

namespace Log_and_Reg
{
    public partial class AdminData : System.Web.UI.Page
    {
        public string str;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["Admin"].ToString() == "N")
            {
                Session["ErrorText"] = "ADMIN ACCESS ONLY";
                Response.Redirect("/ErrorPage.aspx");
            }

            else
            {
                str = "<table border='1'><tr><td>שם משתמש</td><td>שם פרטי</td><td>שם משפחה</td><td>כתובת דואר</td><td>טלפון</td><td>תאריך לידה</td><td>כתובת</td><td>מגדר</td><tr>";
                DataSet ds = new DataSet();
                ds.ReadXml(MapPath("AdminList.xml"));
                foreach (DataRow rw in ds.Tables[0].Rows)
                {
                    str += ("<td>" + rw["UserName"] + "</td><td>" + rw["FirstName"] + "</td><td>" + rw["LastName"] + "</td><td>" + rw["Email"] + "</td><td>" + rw["Phone"] + "</td><td>" + rw["DateOfBirth"] + "</td><td>" + rw["Address"] + "</td><td>" + rw["Gender"] + "</td>");
                    str += "</tr>";
                }
            }
        }
    }
}