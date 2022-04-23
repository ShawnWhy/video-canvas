const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const load = require('load-asset');
import style from './main.css'
// const { ContextReplacementPlugin } = require('webpack');
let fpsInterval;
let dotsmove;
let then;
let startTime;
let now
let elapsed;

const settings = {
	dimensions: [ 1080, 1080 ]
};

let agentPushed = 0 
let manager;

let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

document.addEventListener("DOMContentLoaded", function(event) { 

let agents = [];



class Agent {
	constructor(x, y, fillStyle, cell) {
		// this.pos = new Vector(x, y);
		this.x=x;
		this.y=y;
		this.radius=cell/2;
		this.fillStyle=fillStyle
		this.vel = {x:random.range(-50, 50), y:random.range(-50, 50)};

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
	    context.translate(this.radius * 0.5, this.radius * 0.5);

		context.beginPath();
		context.arc(0, 0, this.radius, 0, Math.PI * 2);
		context.fill();
		context.restore();
	}
}



let typeCanvas=document.getElementById('canvas1');
let canvas=document.getElementById('canvas2');
const context = canvas.getContext('2d');

// console.log(typeCanvas)
const typeContext = typeCanvas.getContext('2d');
var video  = document.getElementById('video');
const cell = 40;
var checkvideo = setInterval(() => {
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
clearInterval(checkvideo)

}
}, 200);



video.addEventListener('play', function () {
	// console.log('mousedown')
	var moveieInterval = setInterval(() => {
	dotsmove=  'off'
	// agents = [];

    var $this = this; //cache
	const width= typeCanvas.width;
	const height = typeCanvas.height
	// const cols = Math.floor(width  / cell);
	// const rows = Math.floor(height / cell);
	const cols = width;
	const rows = height;
	const numCells = cols * rows
  
        typeContext.drawImage($this, 0, 0, width, height);
		var typeData = typeContext.getImageData(0, 0, width, height).data;
		// console.log(typeData)
		context.fillStyle = 'white';
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

			agent.draw(context);})
	}	

}, 500);

})

dotsmove = 'off'
const canvasClick = ()=>{
console.log('canvas click')
dotsmove ='on'
}
canvas.addEventListener('mousedown', canvasClick);
// console.log(agents)
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    tick();
}

const tick = () =>{
if(agents.length>0&&dotsmove=='on'){
context.clearRect(0, 0, canvas.width, canvas.height);
for(let i = 0; i<agents.length;i++){
agents[i].update()
agents[i].draw(context)
// agents[i].bounce(1000, 1000)
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

})
// start();


