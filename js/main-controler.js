'use strict'
var gElCanvas
var gCtx
var gColorBody = '#000000'
var gColorReact = '#ffffff'
var gLineWidth = 2
var gCurrShape = 'lines'
var gisDrag = false
var gStartPos
const gTouchEvs = ['touchmove', 'touchstart', 'touchend']

window.onload = init

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    addListeners()
}

///////////////// on move /click////////////////////

function openModalTools() {

    const elTools = document.querySelector('.tools-user')
    elTools.style.display = elTools.style.display === 'none' ? 'flex' : 'none'
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    gStartPos = getEvPos(ev)
    gisDrag = true
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (gisDrag) {
        drawShape(getEvPos(ev), gStartPos.x, gStartPos.y)
    }
}

function onUp() {
    gisDrag = false
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}



///////////////// option tools for user////////////////////

function drawShape({ x, y }, xS, yS) {
    if (gCurrShape === 'line') {
        gStartPos = { x, y }
        drawLines(x, y, xS, yS, )
    } else if (gCurrShape === 'circle') {
        drawArc(x, y)
    } else if (gCurrShape === 'lines') {
        drawLines(x, y, xS, yS, )
    } else if (gCurrShape === 'rect') {
        drawRect(x, y)

    } else if (gCurrShape === 'triangle') {
        drawTriangle(x, y, xS, yS)

    } else if (gCurrShape === 'triangleMap') {
        drawTriangleMap(x, y, xS, yS)


    }
}

function drawArc(x, y, size = 60, color = 'blue') {
    gCtx.beginPath()
    gCtx.lineWidth = gLineWidth
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.strokeStyle = gColorReact
    gCtx.stroke()
    gCtx.fillStyle = gColorBody
    gCtx.fill()
}

function drawLines(x, y, xEnd, yEnd) {
    gCtx.beginPath()
        // from
    gCtx.moveTo(x, y)
        // to
    gCtx.lineTo(xEnd, yEnd)
        // bold
    gCtx.lineWidth = gLineWidth;
    //color
    gCtx.strokeStyle = gColorBody
        //print stroke
    gCtx.stroke()
}

function drawTriangleMap(x, y, ys, xs) {
    gCtx.beginPath();
    gCtx.lineWidth = gLineWidth
    gCtx.moveTo(ys, xs)
    gCtx.lineTo(x + 100, y + 100)
    gCtx.lineTo(x - 50, y - 50)
    gCtx.closePath()
    gCtx.fillStyle = gColorBody
    gCtx.fill()
    gCtx.strokeStyle = gColorReact
    gCtx.stroke()
}

function drawTriangle(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = gLineWidth
    gCtx.moveTo(x, y - 50)
    gCtx.lineTo(x - 50, y + 50)
    gCtx.lineTo(x + 50, y + 50)
    gCtx.closePath()
    gCtx.fillStyle = gColorBody
    gCtx.fill()
    gCtx.strokeStyle = gColorReact
    gCtx.stroke()
}

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = gLineWidth
    gCtx.rect(x, y, 150, 150)
    gCtx.fillStyle = gColorBody
    gCtx.fillRect(x, y, 150, 150)
    gCtx.strokeStyle = gColorReact
    gCtx.stroke();
}
/////////////////  screen display  ////////////////////

function showRange(lineWidth) {
    const elRange = document.querySelector('.show-range').innerText = lineWidth + ' lineWidth'
    gLineWidth = lineWidth
}

function onChangeColor(color) {
    gColorBody = color
}

function onChangeColorRange(color) {
    gColorReact = color
}

function onChangeShape(shape) {
    gCurrShape = shape
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 40
    gElCanvas.height = elContainer.offsetHeight - 70
}