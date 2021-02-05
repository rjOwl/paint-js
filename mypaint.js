// Reference
// https://stackoverflow.com/questions/8693693/offset-when-drawing-on-canvas

let fillColor=0, strokeColor=0;
var c = document.getElementById("rect");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.fillStyle = "#ff8600"
ctx.fillRect(0, 0, 50, 23);
ctx.stroke();

var c = document.getElementById("circle");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.fillStyle = "#ff8600"
ctx.arc(25, 17, 15, 0, 2 * Math.PI);
ctx.fill();

var c = document.getElementById("line");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(300, 150);
ctx.lineWidth=2
ctx.strokeStyle = "#ff8600"
ctx.stroke(); 

var c = document.getElementById("buggyCircle");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.fillStyle = "blue"
ctx.arc(25, 17, 15, 0, 2 * Math.PI);
ctx.fill();


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");

var canvasOffset = $("#canvas").offset();

var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var startX;
var startY;
var isDown = false;
let shape=-1;


var last_mousex = last_mousey = 0;
var mousex = mousey = 0;

btns = document.getElementsByTagName("button")

btns[0].addEventListener("click", function(){shape=0;});
btns[1].addEventListener("click", function(){shape=1;});
btns[2].addEventListener("click", function(){shape=2;});
btns[3].addEventListener("click", function(){shape=3;});
btns[4].addEventListener("click", function(){shape=4;});
btns[5].addEventListener("click", function(){shape=5;});
btns[6].addEventListener("click", function(){fillColor=0;strokeColor=0;});

$("#canvas").mousedown(function (e) {if(shape!=-1) handleMouseDown(e);});
$("#canvas").mousemove(function (e) {if(shape!=-1) handleMouseMove(e);});
$("#canvas").mouseup(function (e) {  if(shape!=-1) handleMouseUp(e);});
$("#canvas").mouseout(function (e) { if(shape!=-1) handleMouseOut(e);});



$("#fillChange").click(function () {
    $("#paletteFill")[0].click();
    fillColor=1;
});

$("#strokeChange").click(function () {
    $("#paletteStroke")[0].click();
    strokeColor=1;
});

function drawLine(toX, toY, ctx) {
    if(ctx){
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(toX, toY);
        ctx.lineWidth=2
        if(strokeColor != 0)
            ctx.strokeStyle = document.getElementById("paletteStroke").value
        ctx.stroke(); 
    }
}

function drawRect(toX, toY, context) {
    if(context){
    context.beginPath();
    if(strokeColor != 0)
        context.strokeStyle = document.getElementById("paletteStroke").value
    if(fillColor != 0){
        context.fillStyle = document.getElementById("paletteFill").value
        console.log(fillColor);
        context.fillRect(startX, startY, toX - startX, toY - startY);
    }
    else
        context.rect(startX, startY, toX - startX, toY - startY);
    context.stroke();
  }
}

function drawCircle(toX, toY, ctx){
    // Center = ctx.arc(100,75,50,0*Math.PI,1.5*Math.PI)
    // Start_angle = ctx.arc(100,75,50,0,1.5*Math.PI)
    // End_angle = ctx.arc(100,75,50,0*Math.PI,1.5*Math.PI)
    // console.log(radius)

    ctx.beginPath();
    // arc(x, y, radius, 0, PI)
    ctx.arc(startX, startY, Math.abs(startX-toX), 0, 2*Math.PI);
    if(fillColor != 0){
        ctx.fillStyle = document.getElementById("paletteFill").value
        ctx.fill();
    }
    if(strokeColor != 0)
        ctx.strokeStyle = document.getElementById("paletteStroke").value
    ctx.stroke(); 
}


function erase(mousex, mousey, ctx){
     //clears x, y with width and height of 20
    ctx.clearRect(mousex,mousey, 20, 20);
}


function freestyleDrawing(toX, toY,  ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#ff8600"
    ctx.fillRect(toX, toY, 15, 15);
    ctx.stroke();
}

function handleMouseDown(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    // Lock down the starting x, y
    if(!isDown){
        startX = mouseX;
        startY = mouseY;
        isDown = true;
    }
}


function handleMouseUp(e) {
    isDown = false;
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    if(shape==0){
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        drawLine(mouseX, mouseY, ctx)
    }
    else if(shape==1){
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        drawCircle(mouseX, mouseY, ctx);
    }
    else if(shape==2){
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        drawRect(mouseX, mouseY, ctx);
    }
    else if(shape==5){
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        drawCircle(mouseX, mouseY, ctx2);
    }
}

function handleMouseOut(e) {
    // isDown = false;
}

function handleMouseMove(e){
    if(isDown){
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
        // line
        if(shape == 0){
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawLine(mouseX, mouseY, ctx2)
        }
        // circle
        else if(shape == 1){
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawCircle(mouseX, mouseY, ctx2);
        }
        else if(shape==5){
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawCircle(mouseX, mouseY, ctx);
        }
        // rectangle
        else if(shape == 2){
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            drawRect(mouseX, mouseY, ctx2);
        }
        // free style
        else if(shape == 3){
            // ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            freestyleDrawing(mouseX, mouseY, ctx);
        }
        // erase
        else if(shape == 4){
            erase(mouseX, mouseY, ctx);
        }
    }
}

