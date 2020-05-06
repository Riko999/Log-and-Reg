//----------general variables----------//
var Board_Width = 1024;
var Board_height = 512;

var leftDistance = 300;
var topDistance = 100;


var PaddleXPlacement = Board_Width / 2;
var PaddleYPlacement = Board_height - 30;

var PaddleMoveVal = 10;

var PaddleXSize = 150;
var PaddleYSize = 10;


var BallXPlacement = Board_Width / 2;
var BallYPlacement = Board_height - 50;

var BallXMovement = -5;
var BallYMovement = -5;

var BallXSize = 15;
var BallYSize = 15;


var BlockXSize = 50;
var BlockYSize = 25;

var ExistBlockCount = 0;

var LifeCount = 3;
//------------------------------------//


//---------------Images---------------//
var Heart = new Image();   // Create new img element
Heart.src = 'PixelArt.png'; // Set source path
//------------------------------------//

//--------array initialization--------//

//[][0] is a binary value for whether block exists, [][1] block x pos, [][2] block y pos, 
//[][3] rcolor, [][4] gcolor, [][5] bcolor. split to rgb instead of using hex because of older
//versions, I was too lazy to fix.
var BlocksArray = new Array(132);
for (var i = 0; i < 132; i++) {
    BlocksArray[i] = new Array(6);
}

//first block on row color
BlocksArray[0][3] = 200;
BlocksArray[0][4] = 72;
BlocksArray[0][5] = 72;

BlocksArray[22][3] = 198;
BlocksArray[22][4] = 108;
BlocksArray[22][5] = 58;

BlocksArray[44][3] = 180;
BlocksArray[44][4] = 122;
BlocksArray[44][5] = 48;

BlocksArray[66][3] = 162;
BlocksArray[66][4] = 162;
BlocksArray[66][5] = 42;

BlocksArray[88][3] = 72;
BlocksArray[88][4] = 160;
BlocksArray[88][5] = 72;

BlocksArray[110][3] = 66;
BlocksArray[110][4] = 72;
BlocksArray[110][5] = 200;

//block pos and Existance
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 22; j++) {
        BlocksArray[22 * i + j][0] = 1;
        BlocksArray[22 * i + j][1] = -38 + 50 * j;
        BlocksArray[22 * i + j][2] = 75 + 25 * i;
        
    }
}
//block color based on first block in row
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 22; j++) {
        BlocksArray[(22 * i) + j][3] = BlocksArray[(i * 22)][3];
        BlocksArray[(22 * i) + j][4] = BlocksArray[(i * 22)][4];
        BlocksArray[(22 * i) + j][5] = BlocksArray[(i * 22)][5];
    }
}

//------------------------------------//

//-----------event functions----------//

function InstListener(event) {
    if ((event.clientX > (leftDistance + Board_Width / 2) - 56) && (event.clientX < (leftDistance +
        Board_Width / 2 + 56)) && (event.clientY > (topDistance + Board_height * (4 / 5)) - 35) &&
        (event.clientY < (topDistance + Board_height * (4 / 5)))) {
        MainPage();
        window.removeEventListener("click", InstListener);
    }
}

function MainPListener(event) {
    if ((event.clientX > (leftDistance + Board_Width * (3 / 4)) - 212) && (event.clientX < (leftDistance +
        Board_Width * (3 / 4) + 212)) && (event.clientY > (topDistance + Board_height * (3 / 4)) - 45) &&
        (event.clientY < (topDistance + Board_height * (3 / 4)))) {
        window.removeEventListener("click", MainPListener);
        InstructionsPage();
    }

    if ((event.clientX > (leftDistance + (Board_Width / 4) - 85)) && (event.clientX < (leftDistance +
        (Board_Width / 4) + 85)) && (event.clientY > (topDistance + Board_height * (3 / 4)) - 45) &&
        (event.clientY < (topDistance + Board_height * (3 / 4)))) {
        window.removeEventListener("click", MainPListener);
        initBreakout();
    }
}
//------------------------------------//

//first starter page
function MainPage() {
    drawRect(0, 0, Board_Width, Board_height, "black", 0, null, null);
    drawText(Board_Width / 2, Board_height / 4, "Breakout", "whitesmoke", 100, "OCR A Std", "lightcyan", 1);
    drawText(Board_Width / 4, (Board_height / 2) + (Board_height / 4), "Start", "whitesmoke", 50, "OCR A Std")
    drawText(Board_Width * (3 / 4), (Board_height / 2) + (Board_height / 4), "Instructions", "whitesmoke", 50, "OCR A Std")

    window.addEventListener("click", MainPListener);
}

//instructions
function InstructionsPage() {
    drawRect(0, 0, Board_Width, Board_height, "black", 0, null, null);
    drawText(Board_Width / 2, Board_height / 4, ".Move the panel with arrow keys", "whitesmoke", 30, "OCR A Std");
    drawText(Board_Width / 2, (Board_height / 4) + 50, ".If the ball hits a block, it's destroyed", "whitesmoke", 30, "OCR A Std");
    drawText(Board_Width / 2, (Board_height / 4) + 100, ".Destroy all blocks to win", "whitesmoke", 30, "OCR A Std");

    drawText(Board_Width / 2, Board_height * (4 / 5), "Back", "whitesmoke", 40, "OCR A Std")
    window.addEventListener("click", InstListener);
}

//------------draw functions------------//

//draws blank board
function BoardReset() {
    drawRect(0, 0, Board_Width, Board_height, "black", 0, null, null);
    
}
//draws paddle & resets coordinates
function PaddleReset(tempPlacement) {
    drawRect(tempPlacement, PaddleYPlacement, PaddleXSize, PaddleYSize, "white");
}
//draws ball & resets coordinates
//neat glitch effect
function BallReset(BallX, BallY) {
    drawRect(BallX - (BallXMovement *1.5), BallY - (BallYMovement*1.5), BallXSize, BallYSize, "blue");
    drawRect(BallX - (BallXMovement), BallY - (BallYMovement), BallXSize, BallYSize, "green");
    drawRect(BallX - (BallXMovement/2.0), BallY - (BallYMovement/2.0), BallXSize, BallYSize, "#FA1505");
    drawRect(BallX, BallY, BallXSize, BallYSize, "white");
}

//draws blocks, outline so it won't look like a grid.
function BlocksReset(Arr) {
    for (var i = 0; i < 132; i++) {
        if (Arr[i][0] == 1) {
            drawRect(Arr[i][1], Arr[i][2], BlockXSize, BlockYSize, "rgb(" + Arr[i][3] + "," + Arr[i][4] + "," + Arr[i][5] + ")", 0, "rgb(" + Arr[i][3] + "," + Arr[i][4] + "," + Arr[i][5] + ")");
        }
    }

}
//------------------------------------//

function initBreakout() {
    BoardReset();
    PaddleReset(PaddleXPlacement);
    BallReset(BallXPlacement, BallYPlacement);
    BlocksReset(BlocksArray);
    //paddle mechanics
    window.addEventListener("mousemove", function (event) {
        if (event.clientX - (PaddleXSize / 2) < leftDistance) {
            PaddleXPlacement = 0;
        }

        else if (event.clientX + (PaddleXSize / 2) > leftDistance + Board_Width) {
            PaddleXPlacement = Board_Width - PaddleXSize;
        }

        else {
            PaddleXPlacement = event.clientX - (PaddleXSize / 2) - leftDistance;
        }
    })

    //ball movemnt
    var MainInterval = window.setInterval(function () {
        if (BallXPlacement <= 0) {
            BallXMovement *= -1;
        }
        if (BallXPlacement >= Board_Width - BallXSize) {
            BallXMovement *= -1;
        }
        if ((BallYPlacement <= 0)) {
            BallYMovement *= -1;
        }

        if (BallYPlacement >= Board_height - BallYSize) {
            BallXPlacement = Board_Width / 2;
            BallYPlacement = Board_height - 50;

            BallXMovement = -5;
            BallYMovement = -5;
            LifeCount -= 1;
        }

        //sets ball angle reletive to place hit on paddle
        if ((BallYPlacement + BallYSize >= PaddleYPlacement) && ((BallXPlacement + BallXSize / 2.0 >
            PaddleXPlacement) && (BallXPlacement + BallXSize / 2.0 < PaddleXPlacement
                + PaddleXSize))) {
            var deltaX = BallXPlacement - (PaddleXPlacement + PaddleXSize / 2);
            BallXMovement = deltaX * 0.25;
            BallYMovement *= -1;
        }

        for (var i = 0; i < 132; i++) {
            if (BlocksArray[i][0] == 1) {
                if (true) {


                    //if statements check if ball is in block range and also account for ball movement error and size error
                    if ((((BlocksArray[i][1] <= BallXPlacement + BallXSize) && (BlocksArray[i][1] +
                        BallXMovement >= BallXPlacement + BallXSize)) || ((BlocksArray[i][1] + BlockXSize >=
                            BallXPlacement) && (BlocksArray[i][1] - BallXMovement <=
                                BallXPlacement))) && ((BlocksArray[i][2] < BallYPlacement) &&
                                    BlocksArray[i][2] + BlockYSize > BallYPlacement + BallYSize)) {
                        BallXMovement *= -1;
                        BlocksArray[i][0] = 0;
                    }

                    if ((((BlocksArray[i][2] <= BallYPlacement + BallYSize) && (BlocksArray[i][2] +
                        BallYMovement >= BallYPlacement + BallYSize)) || ((BlocksArray[i][2] + BlockYSize >=
                            BallYPlacement) && (BlocksArray[i][2] - BallYMovement <=
                                BallYPlacement))) && ((BlocksArray[i][1] < BallXPlacement) &&
                                    BlocksArray[i][1] + BlockXSize > BallXPlacement + BallXSize)) {
                        BallYMovement *= -1;
                        BlocksArray[i][0] = 0;
                    }
                }
            }
        }
        //---------//


        //recreating screen after each interval
        BallXPlacement += BallXMovement;
        BallYPlacement += BallYMovement;

        BoardReset();
        PaddleReset(PaddleXPlacement);
        BallReset(BallXPlacement, BallYPlacement);
        BlocksReset(BlocksArray);


        for (var i = 0; i < LifeCount; i++) {
            context.drawImage(Heart, 36 * i + 20, 20, 36, 36);
        }

        //turn off for testing
        if (LifeCount == 0) {
            clearInterval(MainInterval);
            Loss();
        }

        //easier for win func, closes interval
        ExistBlockCount = 0;

        for (var i = 0; i < 132; i++) {
            if (BlocksArray[i][0] != 0) {
                ExistBlockCount += 1;
            }
        }

        if (ExistBlockCount == 0) {
            clearInterval(MainInterval);
            Win();
        }

    }, (1000 / 60.0))
}

function Loss() {
    BoardReset();
    drawText(Board_Width / 2, Board_height / 2, "!Too bad", "red", 100, "impact");
}

function Win() {
    BoardReset();
    drawText(Board_Width/2, Board_height/2, "!Well done", "green", 100, "impact");
}