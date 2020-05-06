using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Data.SqlClient;
using System.Data;
namespace WebApplication1
{
    public partial class AdminUserData : System.Web.UI.Page
    {
        public string user;
        public string deleteWhere = "";
        public string filterWhere = "";
        // פעולה על השרת שתפקידה למחוק את המשתמשים שמנהל הרשת סימן
        protected void Page_Load(object sender, EventArgs e)
        {

            if (Session["Admin"].ToString() == "N")
            {
                Session["ErrorText"] = "ADMIN ACCESS ONLY";
                Response.Redirect("ErrorPage.aspx");
            }

            user = " <table border='1' id=\"tbl1\" name=\"tbl1\"><tr><th>שם פרטי</th><th>שם משפחה</th><th>שם משתמש</th><th>סיסמה</th><th>כתובת מייל</th><th>מספר טלפון</th><th>כתובת</th><th>מגדר</th><th>תאריך לידה</th><th>בחר</th></tr>";

            // this parameter is taken from database property "Connection String"
            string connectionString = Session["ConnectionString"].ToString();

            string cmdStr = "SELECT  [FirstName], [LastName], [UserName], [Password], [Email], [Phone], [Address], [Gender], [DateOfBirth]  FROM [Table]";
            // Filter block - start
            bool continueFlag = true;
            // אם נלחץ כפתור "סנן" אז מתווספים תנאים לשאילתה
            if (Request.Form["sub"] != null)
            {
                string field1 = Request.Form["where1"].ToString();
                string field2 = Request.Form["where2"].ToString();
                string field1Value = Request.Form["txt1"].ToString();
                string field2Value = Request.Form["txt2"].ToString();

                if (field1Value == "" && field2Value == "")
                {
                    //הצגת כל המשתמשים. שום תנאי לא נבחר
                }
                // נבחרו שני תנאים
                else if (field1Value != "" && field2Value != "")
                {
                    if (field1 != field2)
                    {
                        filterWhere = " WHERE (" + field1 + " = N'" + field1Value + "')";
                        filterWhere += " AND (" + field2 + " = N'" + field2Value + "')";
                    }
                    else
                    {
                        user = "<table border='1' id=\"tbl1\" name=\"tbl1\"><span style='color:red; font-weight:bold'>על שני החתכים להיות שונים</span>";
                        continueFlag = false;
                    }
                }
                // נבחר התנאי הראשון
                else if (field1Value != "" && field2Value == "")
                {
                    filterWhere = " WHERE (" + field1 + " = N'" + field1Value + "')";
                }
                // נבחר התנאי השני
                else if (field1Value == "" && field2Value != "")
                {
                    filterWhere = " WHERE (" + field2 + " = N'" + field2Value + "')";
                }
                // SELECT הוספת תנאים לפקודת ה
                if (filterWhere != "")
                {
                    cmdStr += filterWhere;
                }
            }
            // Filter block - end


            if (continueFlag)
            {
                SqlDataAdapter da = new SqlDataAdapter(cmdStr, connectionString);
                DataSet ds = new DataSet();
                da.Fill(ds);
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    user += "<tr><td>" + ds.Tables[0].Rows[i]["FirstName"] + "</td>" + "<td>" + ds.Tables[0].Rows[i]["LastName"] + "</td>" + "<td>" + ds.Tables[0].Rows[i]["UserName"] + "</td>" + "<td>"
                        + ds.Tables[0].Rows[i]["Password"] + "</td>" + "<td>" + ds.Tables[0].Rows[i]["Email"]
                        + "</td>" + "<td>" + ds.Tables[0].Rows[i]["Phone"] + "</td>" + "<td>"
                        + ds.Tables[0].Rows[i]["Address"] + "</td>" + "<td>" + ds.Tables[0].Rows[i]["Gender"]
                        + "</td><td>" + ds.Tables[0].Rows[i]["DateOfBirth"] + "</td><td>" + "<input type=\"checkbox\" name =\"chk" + i + "\" id =\"chk" + i + "\""
                    + "/> " + "</td></tr>";
                }
            }
            user += "</table>";
        }
    }
}
