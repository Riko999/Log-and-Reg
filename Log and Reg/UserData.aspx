<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="UserData.aspx.cs" Inherits="Log_and_Reg.UserData" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <form class="fc" action="UserData.aspx" method="post">
    <link href="StyleSheet1.css" rel="stylesheet" />
    <table>
        <tr>
            <td><%=userColumnsTable %></td>
            <td><%=userDetailsTable %></td>
        </tr>
    </table>
    <br />
    <a href="UserUpdate.aspx">עדכן פרטים</a>

    <a href="UserDelete.aspx">מחק משתמש</a>

    <input type="submit" value="התנתקות" name="logout" id="logout"/>
    </form>
</asp:Content>
