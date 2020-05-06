using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Log_and_Reg
{
    public partial class ErrorPage : System.Web.UI.Page
    {
        public string ErrorMsg;
        protected void Page_Load(object sender, EventArgs e)
        {
            ErrorMsg = (string)Session["ErrorText"];

            if (ErrorMsg == null)
            {
                ErrorMsg = "Error in data";
            }
        }
    }
}