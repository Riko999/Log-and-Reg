<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Log_and_Reg.Login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="StyleSheet1.css" rel="stylesheet" />
    <script src="JavaScript.js"></script>
    <form class="fc" action="Login.aspx" method="post">
        <table >
            <tr>
                <td>
                    שם משתמש:
                    <input type="text" id="un" name="UN" required/>
                </td>

                <td id="une">
                </td>
            </tr>

            <tr>
                <td>
                    סיסמה:
                    <input type="password" id="pw" name="PW" required/>
                </td>

                <td id="pwe">
                </td>
            </tr>

            <tr>
                <td>
                   <input type="submit" id="sub" name="submitlog" value="התחברות" onclick="return LoginCheck()"><br />
                </td>

                <td>
                    <input type="submit" id="sub1" value="נקה.י" onclick="return clear()">
                </td>
            </tr>
        </table>
    </form>
</asp:Content>
