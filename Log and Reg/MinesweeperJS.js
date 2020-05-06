//general variables
var Grid = [];

var GridXLength = 16;
var GridYLength = 16;

var MaxMines = 40;
var MineAmount = 0;

var LeftDistance = 300;
var TopDistance = 100;

var WinTileCount = GridXLength * GridYLength;

var BreakDraw = false;
//--------------------//

//initiallizing sprites
var Unpressed = new Image();
var Mine = new Image();
var FlagTile = new Image();
var Tile = new Image();
var Medal = new Image();
var Sad = new Image();

Mine.src = "mine.png";
FlagTile.src = "flagged.png";
Unpressed.src = "block.png";
Tile.src = "empty.png";
Medal.src = "Medal.png";
Sad.src = "Sad.png";

//--------------------//
//event listener functions//
function LeftClickListener(event) {
    for (var i = 0; i < GridXLength; i++) {
        for (var j = 0; j < GridYLength; j++) {
            if (((event.clientX - LeftDistance > i * 32) && (event.clientX - LeftDistance
                < (i * 32) + 32)) && ((event.clientY - TopDistance > j * 32) && (event.clientY
                    - TopDistance < (j * 32) + 32))) {
                if (Grid[i][j].IsFlagged == false) {
                    Grid[i][j].IsPressed = true;
                    if (Grid[i][j].AdjacentMines == 0) {
                        TilePressCheck(i, j);
                        DrawGrid();
                    }

                    DrawGrid();

                }
            }

            if (Grid[i][j].IsPressed == true) {
                WinTileCount -= 1;

            }
        }
    }
}

function RightClickListener(event) {
    event.preventDefault();
    for (var i = 0; i < GridXLength; i++) {
        for (var j = 0; j < GridYLength; j++) {
            if (((event.clientX - LeftDistance > i * 32) && (event.clientX - LeftDistance
                < (i * 32) + 32)) && ((event.clientY - TopDistance > j * 32) && (event.clientY
                    - TopDistance < (j * 32) + 32))) {
                Grid[i][j].IsFlagged = (!(Grid[i][j].IsFlagged));
                DrawGrid();
            }
        }
    }
}

function RestartListener(event) {
    if (((event.clientX - LeftDistance > (512 / 2) - 43) && (event.clientX -
        LeftDistance < (512 / 2) + 43)) && ((event.clientY - TopDistance > 260 - 40)
            && (event.clientY - TopDistance < 260))) {
        window.location.reload(false); 
    }
}
//--------------------//
function BuildGrid() {
    //initializing grid

    for (var i = 0; i < GridXLength; i++) {
        Grid[i] = new Array(GridYLength);
        for (var j = 0; j < GridYLength; j++) {
            Grid[i][j] = ({
                IsMine: false,
                IsFlagged: false,
                IsPressed: false,
                AdjacentMines: 0,
            })
        }
    }

    //adding & ramdomizing mines
    for (var i = 0; i < GridXLength; i++) {
        for (var j = 0; j < GridYLength; j++) {
            Grid[i][j].IsMine = true;
            MineAmount++;
            if (MineAmount == MaxMines) {
                break;
            }
        }
        if (MineAmount == MaxMines) {
            break;
        }
    }

    for (var i = 0; i < GridXLength * 10; i++) {
        for (var j = 0; j < GridYLength * 10; j++) {
            var tempIsMine;
            firstRndX = Math.floor(Math.random() * GridXLength);
            firstRndY = Math.floor(Math.random() * GridYLength);

            secondRndX = Math.floor(Math.random() * GridXLength);
            secondRndY = Math.floor(Math.random() * GridYLength);

            tempIsMine = Grid[firstRndX][firstRndY].IsMine;
            Grid[firstRndX][firstRndY].IsMine = Grid[secondRndX][secondRndY].IsMine;
            Grid[secondRndX][secondRndY].IsMine = tempIsMine;
        }
    }

    //Adjecent mines
    for (var i = 0; i < GridXLength; i++) {
        for (var j = 0; j < GridYLength; j++) {
            var XCheckLimMin = 0;
            var XCheckLimMax = 3;
            var YCheckLimMin = 0;
            var YCheckLimMax = 3;
            //Grid edge conditions
            if (i == 0) {
                XCheckLimMin = 1;
            }
            else if (i == GridXLength - 1) {
                XCheckLimMax = 2;
            }
            if (j == 0) {
                YCheckLimMin = 1;
            }
            else if (j == GridYLength - 1) {
                YCheckLimMax = 2;
            }

            for (var k = XCheckLimMin; k < XCheckLimMax; k++) {
                for (var l = YCheckLimMin; l < YCheckLimMax; l++) {
                    if (Grid[i - 1 + k][j - 1 + l].IsMine == true) {
                        Grid[i][j].AdjacentMines += 1;
                    }
                }
            }
        }
    }
}
//--------------------//

//draws grid from data
function DrawGrid() {
    WinTileCount = GridXLength * GridYLength;

    for (var i = 0; i < GridXLength; i++) {
        if (BreakDraw) {
            break;
        }
        for (var j = 0; j < GridYLength; j++) {
            if (BreakDraw) {
                break;
            }
            if (Grid[i][j].IsPressed == false) {
                if (Grid[i][j].IsFlagged == true) {
                    context.drawImage(FlagTile, i * 32, j * 32, 32, 32);
                }

                else {
                    context.drawImage(Unpressed, i * 32, j * 32, 32, 32);
                }
            }

            else if (Grid[i][j].IsPressed == true) {
                if (Grid[i][j].IsMine == true) {
                    context.drawImage(Mine, i * 32, j * 32, 32, 32);

                    Loss();
                    BreakDraw = true;
                    break;
                }

                else {
                    if (BreakDraw) {
                        break;
                    }
                    if (Grid[i][j].AdjacentMines == 0) {
                        context.drawImage(Tile, i * 32, j * 32, 32, 32);
                    }

                    else {
                        context.drawImage(Tile, i * 32, j * 32, 32, 32);
                        drawText((i * 32) + 17, (j * 32) + 28, Grid[i][j].AdjacentMines.toString(), "black", 30, "ariel");
                    }
                }

            }

            if (Grid[i][j].IsPressed == true) {
                WinTileCount -= 1;

            }
        }
    }

    if (WinTileCount == MaxMines) {
        Win();
    }
}

//initalizes the empty tile chain reaction
function TilePressCheck(TileX, TileY) {
    Grid[TileX][TileY].IsPressed = true;
    var XCheckLimMin = 0;
    var XCheckLimMax = 3;
    var YCheckLimMin = 0;
    var YCheckLimMax = 3;
    //Grid edge conditions
    if (TileX == 0) {
        XCheckLimMin = 1;
    }
    else if (TileX == GridXLength - 1) {
        XCheckLimMax = 2;
    }
    if (TileY == 0) {
        YCheckLimMin = 1;
    }
    else if (TileY == GridYLength - 1) {
        YCheckLimMax = 2;
    }

    //limits for cornors and edges
    for (var k = XCheckLimMin; k < XCheckLimMax; k++) {
        for (var l = YCheckLimMin; l < YCheckLimMax; l++) {
            if ((Grid[TileX - 1 + k][TileY - 1 + l].AdjacentMines == 0) &&
                (Grid[TileX - 1 + k][TileY - 1 + l].IsPressed == false)) {
                TilePressCheck(TileX - 1 + k, TileY - 1 + l);
            }
            Grid[TileX - 1 + k][TileY - 1 + l].IsPressed = true;

        }
    }
    DrawGrid();
}

function initMinesweeper() {
    Unpressed.onload = function () {
        //to initialize ctx
        drawRect(0, 0, 0, 0, "black");

        BuildGrid();

        DrawGrid();

        //events for mouse clicks, listener functions are inserted
        window.addEventListener("click", LeftClickListener);

        window.addEventListener('contextmenu', RightClickListener, false);
    }
}
//in case of loss, loss page display
function Loss() {
    window.setTimeout(function () {
        window.removeEventListener("click", LeftClickListener);
        window.removeEventListener("click", RightClickListener);
        drawRect(0, 0, 512, 512, "lightgrey");
        drawText(512 / 2, 200, "!Better luck next time", "black", 40, "ariel");
        drawText(512 / 2, 260, "Play again", "black", 20, "ariel");
        context.drawImage(Sad, (512 / 2) - 75 / 2.0, 300,75,75);
        window.addEventListener("click", RestartListener);
    }, 1000);
}

//in case of win. win page
function Win() {
    window.setTimeout(function () {
    window.removeEventListener("click", LeftClickListener);
    window.removeEventListener("click", RightClickListener);
    drawRect(0, 0, 512, 512, "lightgrey");
    drawText(512 / 2, 180, "!Congratulations", "black", 40, "ariel");
        drawText(512 / 2, 220, "You have won the game", "black", 20, "ariel");
        drawText(512 / 2, 260, "Play again", "black", 20, "ariel");
        context.drawImage(Medal, (512 / 2)-75/2.0, 300);
        window.addEventListener("click", RestartListener);

    }, 1000);
}