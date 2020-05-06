function init() {
    var canvas = document.getElementById('MyCanvas');
    return canvas.getContext('2d');
}

function drawRect(x, y, width, height, color, EdgWidth = 1, EdgeColor = "black") {
    context = init();

    context.fillStyle = color;
    context.fillRect(x, y, width, height);

    context.beginPath();
    context.lineWidth = EdgWidth;
    context.strokeStyle = EdgeColor;
    context.rect(x, y, width, height);
    context.stroke();
}

function drawCircle(x, y, R, color, start, end, edgeColor, edgeWidth, DIR = true) {
    context = init();

    context.beginPath();
    context.arc(x, y, R, start * Math.PI, end * Math.PI, DIR)
    context.fillStyle = color;
    context.fill();

    context.lineWidth = edgeWidth;
    context.strokeStyle = edgeColor;
    context.stroke();
}

function drawText(x, y, text, color, size, fontFam = "Comic Sans MS", edgeColor = color, edgeWidth = 0) {
    context = init();

    context.font = size + "px " + fontFam;
    context.fillStyle = color;
    context.textAlign = "center";
    context.fillText(text, x, y);

    context.lineWidth = edgeWidth;
    context.strokeStyle = edgeColor;
    context.strokeText(text, x, y);

}

function drawTriangle(x1, y1, x2, y2, x3, y3, color, edgeColor, edgeWidth) {
    context = init();

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.lineTo(x1, y1);
    context.closePath();

    context.lineWidth = edgeWidth;
    context.strokeStyle = edgeColor;
    context.stroke();

    context.fillStyle = color;
    context.fill();
}