const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const load = require('load-asset');
import style from './main.css'
import koro from './koro.mp4'
import troika from './troika.mp4'
// const { ContextReplacementPlugin } = require('webpack');
let fpsInterval;
let then;
let startTime;
let now
let elapsed;
let agents = [];
let dotsmove = 'off'
let canvas
let movieInterval
let context
let typeContext
let typeCanvas
let video
let cell = 5
let generateFilter
let shape='circles'
let mousePos
let inputStrings = []
let glyphs = '_= /'.split('');
let videoWidth;
let videoHeight;
let videoChoice = "pedler"
// glyphs.push("Ukrain")


const getGlyph = (v) => {
	
	return random.pick(glyphs);
};

function getMousePos(canvas, evt) {
console.log("gettingmouse pos")
  var rect = canvas.getBoundingClientRect();
	console.log(rect)
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    tick();
}
class Agent {
	constructor(x, y, fillStyle, cell) {
		// this.pos = new Vector(x, y);
		this.x=x;
		this.y=y;
		this.radius=cell/2;
		this.fillStyle=fillStyle
		this.vel = {x:random.range(-.5, .5), y:random.range(-.5, .5)};

	}


getDistance(v) {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		return Math.sqrt(dx * dx + dy * dy);
}

moveBit(){
	this.x += this.vel.x;
	this.y += this.vel.y;
	switch(shape){
case 'circles':
this.draw(context)
break;
case 'squares':
this.drawSquare(context)
break;
case 'rumbus':
this.drawRumbus(context)
break;
case 'words':
context.fillStyle = 'black';
context.textBaseline = 'middle';
context.textAlign = 'center';
this.drawText(context)
}

this.bounce(1000, 1000)
}




	bounce(width, height) {
		if (this.x <= 0 || this.x >= width)  this.vel.x *= -1;
		if (this.y <= 0 || this.y >= height) this.vel.y *= -1;
	}

	update() {
		this.x += this.vel.x;
		this.y += this.vel.y;
	}

	draw(context) {
		context.save();

		context.fillStyle = this.fillStyle
		context.translate(this.x, this.y);
	    context.translate(this.radius, this.radius);

		context.beginPath();
		context.arc(0, 0, this.radius, 0, Math.PI * 2);
		context.fill();
		context.restore();
	}
	drawSquare(context) {
		context.save();

		context.fillStyle = this.fillStyle
		context.translate(this.x, this.y);
	    // context.translate(this.radius, this.radius);

		context.beginPath();

		context.fillRect(0,0,this.radius*2, this.radius*2);
		context.fill();
		context.restore();
	}
	drawRumbus(context) {
		context.save();

		context.fillStyle = this.fillStyle
		context.translate(this.x, this.y);
		context.rotate(Math.PI*.25);

	    // context.translate(this.radius, this.radius);

		context.beginPath();

		context.fillRect(0,0,this.radius, this.radius);



		context.fill();

		context.restore();
	}
	drawText(context) {


		const glyph = getGlyph(200);
		fontSize = this.radius * 2.4;

		typeContext.fillStyle = 'black';
	

			context.font = `${this.radius * 2}px ${fontFamily}`;
			if (Math.random() < 0.1) context.font = `${this.radius * 6}px ${fontFamily}`;
			typeContext.textBaseline = 'top';

		context.fillStyle = this.fillStyle

			context.save();
			context.translate(this.x, this.y);
			context.translate(this.radius * 0.5, this.radius * 0.5);

			// context.fillRect(0, 0, cell, cell);

			context.fillText(glyph, 0, 0);
			
			context.restore();

		
	}
}



let agentPushed = 0 
let fontSize = 1200;
let fontFamily = 'serif';

document.addEventListener("DOMContentLoaded", function(event) { 

typeCanvas=document.getElementById('canvas1');
canvas=document.getElementById('canvas2');
context = canvas.getContext('2d');

// console.log(typeCanvas)
typeContext = typeCanvas.getContext('2d');
video  = document.getElementById('video');
var checkvideo = setInterval(() => {
	if ( video.readyState === 4 ) {
videoWidth = video.videoWidth;
videoHeight = video.videoHeight;
// console.log(videoHeight)
var typeCanvasHeight = videoHeight/cell;
var typeCanvasWidth = videoWidth/cell
// console.log(typeCanvasHeight)
// console.log(typeCanvasWidth)
typeCanvas.width = typeCanvasWidth;
typeCanvas.height = typeCanvasHeight;
canvas.height = videoHeight;
canvas.width= videoWidth;
clearInterval(checkvideo)

}
}, 200);



//main funciton
generateFilter= function(video){
	// console.log('mousedown')
	clearInterval(movieInterval)
	 movieInterval = setInterval(() => {
	context.clearRect(0, 0, canvas.width, canvas.height);

	dotsmove= 'off'
	agents = [];

    var $this = this; //cache
	const width= typeCanvas.width;
	const height = typeCanvas.height
	// const cols = Math.floor(width  / cell);
	// const rows = Math.floor(height / cell);
	const cols = width;
	const rows = height;
	const numCells = cols * rows
  
        typeContext.drawImage(video, 0, 0, width, height);
		var typeData = typeContext.getImageData(0, 0, width, height).data;
		// console.log(typeData)
		context.fillStyle = 'black';
		context.fillRect(0, 0, width, height);

		context.textBaseline = 'middle';
		context.textAlign = 'center';

		// context.drawImage(typeCanvas, 0, 0);
		for (let i = 0; i < numCells; i++) {

			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col*cell;
			const y = row*cell;

			const r = typeData[i * 4 + 0];
			const g = typeData[i * 4 + 1];
			const b = typeData[i * 4 + 2];
			const a = typeData[i * 4 + 3];
			// let newAgent = new Agent(x, y,'rgb('+r+','+g+','+b+')', cell )
			// console.log(newAgent)

			agents.push(new Agent(x, y,'rgb('+r+','+g+','+b+')', cell ))
			// console.log(agents)
			// console.log(Agent)
			// console.log("agent")
			agentPushed++;

		}
		if(agentPushed>=numCells){
	
				agents.forEach(agent=>{

			switch(shape){
case 'circles':
agent.draw(context)
break;
case 'squares':
agent.drawSquare(context)
break;
case 'rumbus':
agent.drawRumbus(context)
break;
case 'words':
context.textBaseline = 'middle';
context.textAlign = 'center';
agent.drawText(context)
}




})
	}	

}, 500);


if(canvas){
canvas.addEventListener('mousedown', canvasClick);
canvas.addEventListener('mousemove', (e)=>{
console.log('moisemove')
movePixles(e)
})
}
}



video.addEventListener('play', function () {

generateFilter(video);

})



})
const canvasClick = ()=>{
clearInterval(movieInterval)
console.log('canvas click')
if(dotsmove=='off'){
dotsmove ='on'
}
else{
dotsmove="off"
generateFilter(video);
}
}


const tick = () =>{

if(agents.length>0&&dotsmove=='on'){
for(let i = 0; i<agents.length;i++){
agents[i].update()
switch(shape){
case 'circles':
agents[i].draw(context)
break;
case 'squares':
agents[i].drawSquare(context)
break;
case 'rumbus':
agents[i].drawRumbus(context)
break;
case 'words':
context.fillStyle = 'black';
context.textBaseline = 'middle';
context.textAlign = 'center';
agents[i].drawText(context)
}

agents[i].bounce(videoWidth, videoHeight)
}
}
     window.requestAnimationFrame(tick)
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);   
}
}
startAnimating(5)


const selectSizes = document.getElementById('sizeSelect')
//select sizes function
const changeSize= function(){
let sizeValue = parseInt(selectSizes.value);
console.log(sizeValue);
cell=sizeValue
	if ( video.readyState === 4 ) {
var videoWidth = video.videoWidth;
var videoHeight = video.videoHeight;
// console.log(videoHeight)
var typeCanvasHeight = videoHeight/cell;
var typeCanvasWidth = videoWidth/cell
// console.log(typeCanvasHeight)
// console.log(typeCanvasWidth)
typeCanvas.width = typeCanvasWidth;
typeCanvas.height = typeCanvasHeight;
canvas.height = videoHeight;
canvas.width= videoWidth;
clearInterval(movieInterval);
generateFilter(video)
	}
}
selectSizes.addEventListener('change', ()=>{changeSize()})


const selectFilter = document.getElementById('filterSelect')
selectFilter.addEventListener('change', ()=>{changeFilter()})


function changeFilter(){
console.log(selectFilter.value)
shape = selectFilter.value;
}




const loadVideo= function(){
video  = document.getElementById('video');
switch(videoChoice){
case "troika":
video.src = troika
break;
case "pedler":
video.src= koro
}
}

loadVideo()

const selectVideo = document.getElementById('videoSelect')
function changeVideo(){
console.log(selectVideo.value)
videoChoice=selectVideo.value;
loadVideo()
setTimeout(() => {
	

if ( video.readyState === 4 ){
var videoWidth = video.videoWidth;
var videoHeight = video.videoHeight;
// console.log(videoHeight)
var typeCanvasHeight = videoHeight/cell;
var typeCanvasWidth = videoWidth/cell
// console.log(typeCanvasHeight)
// console.log(typeCanvasWidth)
typeCanvas.width = typeCanvasWidth;
typeCanvas.height = typeCanvasHeight;
canvas.height = videoHeight;
canvas.width= videoWidth;
clearInterval(movieInterval);
generateFilter(video)
}
}, 50);
}
selectVideo.addEventListener('change', ()=>{changeVideo()})

// selectVideos.addEventListener('change', loadVideo())

const wordsInputForm = document.getElementById('inputWordsForm')
const wordsInput = document.getElementById('inputWords')

wordsInputForm.addEventListener('submit',(e)=>{
e.preventDefault();
e.stopPropagation();

addWords()})

function addWords(){
var word = wordsInput.value;
console.log(wordsInput.value)
if(word.length<20){
inputStrings.push(word)
glyphs=glyphs.concat(inputStrings)
console.log(glyphs)
};
}

const movePixles=(e)=>{
mousePos = getMousePos(canvas, e)

for (let i = 0; i < agents.length; i++) {
	const agent = agents[i];
const dist = agent.getDistance(mousePos);
	if (dist > 200) continue;
		agent.moveBit()
		}	



}
