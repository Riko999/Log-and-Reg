
function Create_Board(point1, point2) {
    var Board_Width = 1024;
    var Board_hight = 512;
    drawRect(0, 0, Board_Width, Board_hight, "black", 0);

    for (var i = 100; i < Board_hight; i = i + 50) {
        drawRect(Board_Width / 2 - 2, i, 4, 25, "white", 1, null);
    }

    drawRect(0, 95, Board_Width, 5, "grey", 0);

    drawRect(Board_Width / 2 - Board_Width / 4 - 150, 0, 100, 50, "black", 2, "white");
    drawText(Board_Width / 2 - Board_Width / 4 - 100, 43, String(point1), "white", 50, "Impact", null, 1);
    drawRect(Board_Width / 2 + Board_Width / 4 + 50, 0, 100, 50, "black", 2, "white");
    drawText(Board_Width / 2 + Board_Width / 4 + 100, 43, String(point2), "white", 50, "Impact", null, 1);

    for (var i = 100; i < Board_hight; i = i + 50) {
        drawRect(Board_Width / 2 - 2, i, 4, 25, "white", 1, null);
    }
}

function Moveball(BallPlaceX, BallPlaceY) {
    drawCircle(BallPlaceX, BallPlaceY, 10, "white", 0, 2, "white", 0, false);
}

function BarMovement1(placeBar1) {
    drawRect(20, placeBar1, 10, 100, "white", 0, "white");
}

function BarMovement2(placeBar2) {
    var Board_Width = 1024;
    drawRect(Board_Width - 20, placeBar2, 10, 100, "white", 0, "white");
}

function Pong_Start() {
    var PressedKey;
    var ball_R = 10;
    var win = 0;
    var Board_Width = 1024;
    var Board_hight = 512;

    var DefMoveVal = 4;
    var MoveXball = DefMoveVal;
    var MoveYball = DefMoveVal;

    var BarMovement = 10;

    var Bar1Place = Board_hight / 2 - 50;
    var Bar2Place = Board_hight / 2 - 50;

    var BallPlaceX = Board_Width / 2;
    var BallPlaceY = Board_hight / 2;

    var Player1_points = 0;
    var Player2_points = 0;

    var timer = 1000/60;
    Create_Board(Player1_points, Player2_points);
    Moveball(BallPlaceX, BallPlaceY);
    drawRect(20, Bar1Place, 10, 100, "white", 0, "white");
    drawRect(Board_Width - 20, Bar2Place, 10, 100, "white", 0, "white");

    window.addEventListener("keydown", function (event) {
        PressedKey = event.key;
        if ((PressedKey == "w" || PressedKey == "W") && (Bar1Place > 100)) {
            Bar1Place -= BarMovement;
        }
        if ((PressedKey == "s" || PressedKey == "S") && (Bar1Place < Board_hight - 100)) {
            Bar1Place += BarMovement;
        }
        if ((PressedKey == "ArrowUp") && (Bar2Place > 100)) {
            Bar2Place -= BarMovement;
        }
        if ((PressedKey == "ArrowDown") && (Bar2Place < Board_hight - 100)) {
            Bar2Place += BarMovement;
        }
    });

    window.setInterval(function () {
        if (BallPlaceY > Board_hight - ball_R || BallPlaceY < ball_R + 100) {
            MoveYball = - MoveYball;
        }
        if (BallPlaceX < 20 + ball_R && BallPlaceX < 20 + ball_R - 2) {
            if (BallPlaceY >= Bar1Place && BallPlaceY <= Bar1Place + 100) {
                MoveXball = Math.random() + DefMoveVal;
            }
        }
        else if (BallPlaceX > Board_Width - 20 - ball_R && BallPlaceX > Board_Width - 20 - ball_R - 2) {
            if (BallPlaceY >= Bar2Place && BallPlaceY <= Bar2Place + 100) {
                MoveXball = -(Math.random() + DefMoveVal);
            }
        }
        if (BallPlaceX < 0) {
            win = 2;
            drawRect(0, 0, Board_Width, Board_hight, "black", 0);
            drawText(Board_Width / 2, Board_hight / 2, "player 2 won!", "white", 100, "Impact", "white", 3)
            return win;
        }
        else if (BallPlaceX > Board_Width) {
            win = 1;
            drawRect(0, 0, Board_Width, Board_hight, "black", 0);
            drawText(Board_Width / 2, Board_hight / 2, "player 1 won!", "white", 100, "Impact", "white", 3)
            return win;
        }
        BallPlaceX += MoveXball;
        BallPlaceY += MoveYball;
        Create_Board(Player1_points, Player2_points);
        Moveball(BallPlaceX, BallPlaceY);

        
        BarMovement1(Bar1Place);
        BarMovement2(Bar2Place);
    }, timer);
}
