<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="Pong.aspx.cs" Inherits="Log_and_Reg.Pong" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="Basic_Canvas.js"></script>
    <script src="PongJS.js"></script>
    <link href="StyleSheet1.css" rel="stylesheet" />
    <canvas id="MyCanvas" width="1024" height="512" />
    <script type="text/javascript">
        Pong_Start();
    </script>
</asp:Content>
