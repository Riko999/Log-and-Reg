<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="AdminPage.aspx.cs" Inherits="Log_and_Reg.AdminPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link href="StyleSheet1.css" rel="stylesheet" />
    <h1>שלום מנהל!</h1>
    <br />
    <a href="AdminUserData.aspx">נתוני משתמשים</a>
    <a href="AdminData.aspx">רשימת מנהלים</a>
</asp:Content>
