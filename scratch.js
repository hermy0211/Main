// Select Elements
const cursor = document.querySelector(".cursor")
const canvasIn = document.querySelector("canvas.in")
const canvasOut = document.querySelector("canvas.out")

// Set Mouse Down
let isMouseDown = false

// Cursor Animations
const growCursor = function() {
  cursor.classList.add("is-down")
}
const shrinkCursor = function() {
  cursor.classList.remove("is-down")
}
const moveCursor = function(x, y) {
  cursor.style.left = x + "px"
  cursor.style.top = y + "px"
}

// Canvas Setup
const setupCanvas = function(canvas) {
  const w = window.innerWidth
  const h = window.innerHeight
  const dpi = window.devicePixelRatio
  
  canvas.width = w * dpi
  canvas.height = h * dpi
  canvas.style.width = w + "px"
  canvas.style.height = h + "px"
  
  const context = canvas.getContext("2d")
  context.scale(dpi, dpi)

  if(canvas.classList.contains("in")) {
    context.strokeStyle = "#FFFFFF"
    context.fillStyle = "#000000"
  } else {
    context.strokeStyle = "#000000"
    context.fillStyle = "#FFFFFF"
  }

  context.lineWidth = 80
  context.lineCap = "round"
  context.lineJoin = "round"

  context.shadowBlur = 4
  context.shadowColor = context.strokeStyle

  context.rect(0, 0, w, h)
  context.fill()
}

// Start Draw
const startDraw = function(canvas, x, y) {
  const context = canvas.getContext("2d")
  // const colors = ["red", "yellow", "blue", "green"]
  // let randomNum = Math.floor(Math.random() * colors.length)

  context.moveTo(x, y)
  context.beginPath()

  // context.strokeStyle = colors[randomNum]
}

// Draw on the Canvas
const moveDraw = function(canvas, x, y) {
  const context = canvas.getContext("2d")
  if(isMouseDown) {
    context.lineTo(x, y)
    context.stroke()
  }
}

// Run Scripts
document.addEventListener("mousedown", function(e) {
  growCursor()
  startDraw(canvasIn, e.pageX, e.pageY)
  startDraw(canvasOut, e.pageX, e.pageY)
  isMouseDown = true
})

document.addEventListener("mouseup", function() {
  shrinkCursor()
  isMouseDown = false
})

document.addEventListener("mousemove", function(e) {
  moveCursor(e.pageX, e.pageY)
  moveDraw(canvasIn, e.pageX, e.pageY)
  moveDraw(canvasOut, e.pageX, e.pageY)
})

setupCanvas(canvasIn)
setupCanvas(canvasOut)

window.addEventListener("resize", function() {
  setupCanvas(canvasIn)
  setupCanvas(canvasOut)
})

// Mobile Support
document.addEventListener("touchstart", function(e) {
  growCursor()
  startDraw(canvasIn, e.pageX, e.pageY)
  startDraw(canvasOut, e.pageX, e.pageY)
  isMouseDown = true
  e.preventDefault()
}, {passive: false})

document.addEventListener("touchend", function(e) {
  shrinkCursor()
  isMouseDown = false
  e.preventDefault()
}, {passive: false})

document.addEventListener("touchmove", function(e) {
  moveCursor(e.pageX, e.pageY)
  moveDraw(canvasIn, e.pageX, e.pageY)
  moveDraw(canvasOut, e.pageX, e.pageY)
  e.preventDefault()
}, {passive: false})