<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="UserUpdate.aspx.cs" Inherits="Log_and_Reg.UserUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="JavaScript.js"></script>
    <link href="StyleSheet1.css" rel="stylesheet" />
<form id="Update" action="UserUpdate.aspx" method="post">
      <table>
            <tr>
                <td>שם פרטי</td>
                <td><input type="text" Id="fn" name="fn" required  value="<%=fname%>"/></td>
                <td id="fne" style="color:red"></td>
            </tr>
            <tr>
                <td>שם משפחה</td>
                <td><input type="text" id="ln" name="ln" required  value="<%=lname%>" /></td>
                <td id="lne" style="color:red"></td>
            </tr>
            <tr>
                <td>כתובת דואר אלקטרוני</td>
                <td><input id="email" name="email" required  value="<%=email%>"/></td>
                <td id="EmailErr" style="color:red" ></td>
            </tr>
            <tr>
                <td>מספר טלפון</td>
                <td><input type="tel" id="phone" name="phone"required  value="<%=phone%>"/></td>
                <td id="phe" style="color:red" ></td>
            </tr>
            <tr>
                <td>מין</td>
                <td>
                    <input type="radio" name="gender" value="Man" required /> Man<br />
                    <input type="radio" name="gender" value="Womam" required "/>Woman<br />
                    <input type="radio" name="gender" value="Non-Binary" required />Non-Binary
                </td>
                <td id="GenderErr" style="color:red" ></td>
            </tr>
            <tr>
                <td>כתובת</td>
                <td><input type="text" id="add" name="add" required value="<%=address%>" /></td>
                <td id="adde" style="color:red" ></td>
            </tr>
            <tr>
                <td>תאריך לידה</td>
                <td><input type="date" id="dob" name="dob" value="<%=birthday%>" /></td>
                <td id="dobe" style="color:red" ></td>
            </tr>
            <tr>
                <td>שם משתמש</td>
                <td><input type="text" id="un" name="un" value="<%=user%>" disabled="disabled"/></td>
                <td id="une" style="color:red" ></td>
            </tr>
            <tr>
                <td>סיסמא</td>
                <td><input type="password" id="pw" name="pw" required value="<%=password%>"  /></td>
                <td id="pwe" style="color:red" ></td>
            </tr>
            <tr>
                <td><input type="submit" name="Update" value="עדכן פרטים" onclick="return check();" style="width: 200px" /></td>
           </tr>
        </table>
            </form>
</asp:Content>
