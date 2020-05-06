<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="Minesweeper.aspx.cs" Inherits="Log_and_Reg.Minesweeper" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="StyleSheet1.css" rel="stylesheet" />
    <script src="Basic_Canvas.js"></script>
    <script src="MinesweeperJS.js"></script>
    <canvas id="MyCanvas" width="512" height="512"/>
    <script type="text/javascript">
        initMinesweeper();
    </script>
</asp:Content>
