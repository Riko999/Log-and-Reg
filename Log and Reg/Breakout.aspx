<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="Breakout.aspx.cs" Inherits="Log_and_Reg.Breakout_Breakout" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="StyleSheet1.css" rel="stylesheet" />
    <script src="Basic_Canvas.js"></script>
    <script src="BreakoutJS.js"></script>
    <canvas id="MyCanvas" width="1024" height="512" style="background-color:black"/>

    <script type="text/javascript">
        MainPage();
    </script>

</asp:Content>