<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="AdminUserData.aspx.cs" Inherits="WebApplication1.AdminUserData" %>

<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Data" %>
<script runat="server">
    // פעולה על השרת שתפקידה למחוק את המשתמשים שמנהל הרשת סימן
    void Button1_Click(object sender, EventArgs e)
    {
        if (Request.Form["demo"] != "()")
            deleteWhere = Request.Form["demo"];
        else
            deleteWhere = "";
        if (deleteWhere != "")
        {
            string connString = Session["ConnectionString"].ToString();
            SqlConnection conn = new SqlConnection(connString);
            string cmdString = string.Format("DELETE FROM [Table] WHERE UserName in {0}", deleteWhere);
            SqlCommand cmd = new SqlCommand(cmdString, conn);
            conn.Open();
            cmd.ExecuteNonQuery();
            conn.Close();
            Response.Redirect("AdminPage.aspx");
        }
    }

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="JavaScript.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <form name="AdminUserdata" action="AdminUserData.aspx" method="post" runat="server">

        <table>
            <tr>
                <td>
                    <span>סנן על פי</span>
                    <!-- תנאי סינון ראשון-->
                        <select name="where1">
                            <option value="FirstName">שם פרטי</option>
                            <option value="LastName">שם משפחה</option>
                            <option value="UserName">שם משתמש</option>
                            <option value="Email">דוא&quotל</option>
                            <option value="Phone">טלפון</option>
                        </select>
                    <span>= </span>
                    <input type="text" id="txt1" name="txt1" placeholder="הכנס ערך" />
                </td>
            </tr>
            
            <tr>
                <td>
                    <!-- תנאי סינון שני-->
                    <span>סנן על פי</span>
                    <select name="where2">
                        <option value="firstName">שם פרטי</option>
                        <option value="lastName">שם משפחה</option>
                        <option value="userName">שם משתמש</option>
                        <option value="email">דוא&quotל</option>
                        <option value="phone">טלפון</option>
                    </select>
                    <span>= </span>
                    <input type="text" id="txt2" name="txt2" placeholder="הכנס ערך" />
                    <input type="submit" value="סנן" name="sub" id="sub" />
                </td>
            </tr>
            <tr>
                <td id="err_where" style="color: red; font-weight: bold"></td>
            </tr>
        </table>
        <br />        
        <div runat="server" style="font-size: 12px">
            <%--טבלת המשתמשים שנבנית בצורה דינאמית בצד שרת--%>
            <%=user%>
        </div>
        <asp:Button ID="Button1"
            Text="מחק משתמשים"
            OnClientClick="Navigate()"
            runat="server" OnClick="Button1_Click" />
        <p>
            <input type="text" id="demo" name="demo" size="20" style="visibility: hidden" /></p>
    </form>
</asp:Content>
