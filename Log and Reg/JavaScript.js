function check() {

    var b = fncheck();
    var c = lncheck();
    var d = dobcheck();
    var f = uncheck();
    var g = pwcheck();
    var h = addcheck();

    if (b & c & d & f & g & h) {
        return true;
    }

    else {
        return false;
    }
}

function LoginCheck() {
    var f = uncheck();
    var g = pwcheck();


    if (f & g) {
        return true;
    }

    else {
        return false;
    }
}

function fncheck() {
    var firstname = document.getElementById("fn").value;
    var letters = " אבגדהוזחטיכלמנסעפצקרשתףםץן"
    for (var i = 0; i < firstname.length; i++) {
        if (!(letters.includes(firstname[i]))) {
            document.getElementById("fne").innerHTML = "<center><error>MUST ENTER HEB CHARACTERS OR SPACE</error></center>";
            return false;
        }
    }

    document.getElementById("fne").innerHTML = "";
    return true;

}

function lncheck() {
    var lastname = document.getElementById("ln").value;
    var letters = " אבגדהוזחטיכלמנסעפצקרשתףםץן"
    for (var i = 0; i < lastname.length; i++) {
        if (!(letters.includes(lastname[i]))) {
            document.getElementById("lne").innerHTML = "<center><error>MUST ENTER HEB CHARACTERS OR SPACE</error></center>";
            return false;
        }
    }

    document.getElementById("lne").innerHTML = "";
    return true;

}

function dobcheck() {
    var date = document.getElementById("dob").value;
    if (!(date.slice(0,4)>1960)) {
        document.getElementById("dobe").innerHTML = "<center><error>YEAR MUST BE OVER 1960</error></center>"
        return false;
    }

    document.getElementById("dobe").innerHTML = "";
    return true;
}

function uncheck() {
    var username = document.getElementById("un").value;
    var allowedchars = "abcdefghijklmnopqrstuvwxyz1234567890_"
    for (var i = 0; i < username.length; i++) {
        if (!(allowedchars.includes((String(username[i])).toLowerCase()))) {
            document.getElementById("une").innerHTML = "<center><error>ALLOWED CHARACTERS ARE abcdefghijklmnopqrstuvwxyz1234567890_ LOWERCASE AND UPPERCASE</center></error>";
            return false;
        }
    } 

    document.getElementById("une").innerHTML = "";
    return true;
}

function pwcheck() {
    var password = document.getElementById("pw").value;
    var allowedchars = "abcdefghijklmnopqrstuvwxyz1234567890_";
    var uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowers = "abcdefghijklmnopqrstuvwxyz";
    var locheck = 0;
    var hicheck = 0;

    if (!(password.length > 5 && password.length < 10)) {
        document.getElementById("pwe").innerHTML = "<center><error>PASSWORD MUST BE 6 TO 10 CHARACTERS LONG</center></error>";
        return false;

    }

    for (var i = 0; i < password.length; i++) {
        if (!(allowedchars.includes((String(password[i])).toLowerCase()))) {
            document.getElementById("pwe").innerHTML = "<center><error>ALLOWED CHARACTERS ARE abcdefghijklmnopqrstuvwxyz1234567890_ LOWERCASE AND UPPERCASE</center></error>";
            return false;
        }

        if (lowers.includes(password[i])) {
            locheck++;
        }

        if (uppers.includes(password[i])) {
            hicheck++;
        }
    }

    if (hicheck < 1 || locheck < 1) {
        document.getElementById("pwe").innerHTML = "<center><error>PASSWORD MUST HAVE AT LEAST ONE UPPER AND LOWER CASE CHARACTER</center></error>";
        return false;

    }

    else {
        document.getElementById("pwe").innerHTML = "";
        return true;
    }
}

function addcheck() {
    var address = document.getElementById("add").value;

    if (address.includes(" ")) {
        for (var i = 0; i < address.length; i++) {
            if (!(address[i] >= 'א' && address[i] <= 'ת' || address[i] == ' ') && isNaN(address[i])) {
                document.getElementById("adde").innerHTML = "<center><error>FORMAT: (address 9)</error><center>";
                return false;
            }
        }
    }

    else {
        document.getElementById("adde").innerHTML = "<center><error>MUST INCLUDE SPACE ( )</error><center>";
        return false;
    }

    document.getElementById("adde").innerHTML = "<center><error></error><center>";
    return true;
}

function Navigate() {
    var length = document.getElementById("tbl1").rows.length;
    var chkStr = "chk";
    var temp = "";
    var flag = true;
    var users = [];
    var counter = 0;

    for (var i = 1; i < length; i++) {
        temp = chkStr + (i - 1);
        flag = document.getElementById(temp).checked;
        if (flag) {
            users[counter] = document.getElementById("tbl1").rows[i].cells[2].innerHTML;
            counter++;
        }
    }
    sqlStr = "(";
    for (var i = 0; i < counter; i++) {
        sqlStr += "N'" + users[i] + "'";
        if (i < counter - 1) {
            sqlStr += ", ";
        }
    }
    sqlStr += ")";
    // על הדף demo התנאי למחיקה נשמר עך אלמנט בשם 
    // invisible אלמנט שהוא 
    document.getElementById("demo").value = sqlStr;

}

function clear() {
    return true;
}