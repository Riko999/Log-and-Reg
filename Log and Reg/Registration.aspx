<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="Registration.aspx.cs" Inherits="Log_and_Reg.Registration" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="StyleSheet1.css" rel="stylesheet" />
    <script src="JavaScript.js"></script>
    <form class="fc" action="Registration.aspx" method="post">
        <table style="width:100%">

            <tr>
                <td>
                    שם פרטי:
                    <input type="text" id="fn" name="FN" required/>
                </td>

                <td id="fne">
                </td>
            </tr>

            <tr>
                <td>
                    שם משפחה:
                    <input type="text" id="ln" name="LN" required/>
                </td>

                <td id="lne">
                </td>
            </tr>
            
            <tr>
                <td>
                    דואר אלקטרוני:
                    <input type="email" id="em" name="EM" required />
                </td>
            </tr>
            
            <tr>
                <td>
                    תאריך לידה:
                    <input type="date" id="dob" name="DOB" required/>
                </td>

                <td id="dobe">
                </td>
            </tr>

            <tr>
                <td>
                    מגדר:
                    <input type="radio" name="gender" value="Man" checked> Man
                    <input type="radio" name="gender" value="Woman"> Woman
                    <input type="radio" name="gender" value="Non-Binary"> Non-Binary
                </td>
                <td></td>
            </tr>

            <tr>
                <td>
                    טלפון: (123-456-7890)
                    <input type="tel" id="ph" name="PH" title="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
                </td>
                <td>
                </td>
            </tr>

            <tr>
                <td>
                    כתובת:
                    <input type="text" id="add" name="ADD" required/>
                </td>
                
                <td id="adde">
                </td>
            </tr>

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
                   <input type="submit" id="sub" name="submit" value="הרשמה" onclick="return check()"><br />
                </td>

                <td>
                    <input type="submit" id="sub1" value="נקה.י" onclick="return clear()">
                </td>
            </tr>

            <tr>
                <td>
                    <h1 id="subsucsess"></h1>
                </td>
            </tr>

        </table>
    </form>
</asp:Content>
