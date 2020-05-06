<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="UserDelete.aspx.cs" Inherits="Log_and_Reg.UserDelete" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="StyleSheet1.css" rel="stylesheet" />
    <form id="deleteUser" method="post" action="UserDelete.aspx">
    <table>
            <tr>
                <td>האם אתה בטוח שברצונך למחוק את המשתמש</td>
                <td><%=user %>?</td>
            </tr>
            <tr>
                <td><input type="submit" value=" Delete User" name="DelUsr" /></td>
            </tr>
     </table>
     </form>
</asp:Content>
