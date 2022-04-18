const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const load = require('load-asset');
// const { ContextReplacementPlugin } = require('webpack');

const settings = {
	dimensions: [ 1080, 1080 ]
};

let agentPushed = 0 
let manager;

let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

// const typeCanvas = document.createElement('canvas');
document.addEventListener("DOMContentLoaded", function(event) { 

const agents = [];

class Agent {
	constructor(x, y, fillStyle, cell) {
		// this.pos = new Vector(x, y);
		this.x=x;
		this.y=y;
		this.radius=cell;
		this.fillStyle=fillStyle
		this.vel = {x:random.range(-1, 1), y:random.range(-1, 1)};

	}

	bounce(width, height) {
		if (this.pos.x <= 0 || this.pos.x >= width)  this.vel.x *= -1;
		if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
	}

	update() {
		this.x += this.vel.x;
		this.y += this.vel.y;
	}

	draw(context) {

		// console.log(context)
		// console.log("draw")
		// console.log(this.y)
		// console.log(this.x)
		// console.log(this.fillStyle)
		context.save();
		context.fillStyle = this.fillStyle
		context.translate(this.x, this.y);

		// context.lineWidth = 4;

		context.beginPath();
		context.arc(0, 0, this.radius, 0, Math.PI * 2);
		context.fill();
		// context.stroke();

		context.restore();
	}
}



let typeCanvas=document.getElementById('canvas1');
let canvas=document.getElementById('canvas2');
const context = canvas.getContext('2d');

// console.log(typeCanvas)
const typeContext = typeCanvas.getContext('2d');
var video  = document.getElementById('video');


video.addEventListener('play', function () {
	// console.log('mousedown')
	setInterval(() => {
		
	
    var $this = this; //cache
	const width= typeCanvas.width;
	const height = typeCanvas.height
	const cell = 10;
	const cols = Math.floor(width  / cell);
	const rows = Math.floor(height / cell);
	const numCells = cols * width;
  
        typeContext.drawImage($this, 0, 0);
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

			const x = col * cell;
			const y = row

			const r = typeData[i * cell * 4 + 0];
			const g = typeData[i * cell* 4 + 1];
			const b = typeData[i * cell* 4 + 2];
			const a = typeData[i * cell* 4 + 3];
// context.fillStyle = 'rgb(0,0,'+b+')';
			// const glyph = getGlyph(r);

			// context.font = `${cell * .5}px ${fontFamily}`;
			// if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

			// context.fillStyle = 'white';



			agents.push(new Agent(x, y,'rgb('+r+','+g+','+b+')', cell ))
			agentPushed++;
			// context.fillStyle = 'rgb('+r+','+g+','+b+')';

			// context.save();
			// context.translate(x, y);
			// context.translate(cell, cell);

			// context.fillRect(0, 0, cell, cell);

			// context.fillText(glyph, 0, 0);

			// context.beginPath();
			// context.arc(0,0, cell, 0, Math.PI*2)
			// context.fill();
			
			// context.restore();


		}
		if(agentPushed>=numCells-5){
			// console.log('agentspushed')
			// console.log(agents)
				agents.forEach(agent=>{

			agent.draw(context);})


	}



		

}, 5000);

})






// const image = await load('./jean.jpg')

// update({

// dimensions:[image.width, image.height]

// })









const sketch = ({ context, width, height }) => {






// let imgObj = new Image();
// imgObj.src = jean
// 	imgObj.onload = function(){
// console.log(imgObj)
// let w = typeCanvas.width;
// let nw = imgObj.naturalWidth;
// let nh = imgObj.naturalHeight;
// let aspect = nw/nh;
// let h = typeCanvas.width / aspect;
// typeCanvas.height = h;
// typeContext.drawImage(imgObj, 0 ,0, w,h)
// }




	// return ({ context, width, height }) => {
	// 	typeContext.fillStyle = 'black';
	// 	typeContext.fillRect(0, 0, cols, rows);

	// 	fontSize = cols * 1.2;

	// 	typeContext.fillStyle = 'white';
	// 	typeContext.font = `${fontSize}px ${fontFamily}`;
	// 	typeContext.textBaseline = 'top';

	// 	const metrics = typeContext.measureText(text);
	// 	const mx = metrics.actualBoundingBoxLeft * -1;
	// 	const my = metrics.actualBoundingBoxAscent * -1;
	// 	const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
	// 	const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

	// 	const tx = (cols - mw) * 0.5 - mx;
	// 	const ty = (rows - mh) * 0.5 - my;

	// 	typeContext.save();
	// 	typeContext.translate(tx, ty);

	// 	typeContext.beginPath();
	// 	typeContext.rect(mx, my, mw, mh);
	// 	typeContext.stroke();

	// 	typeContext.fillText(text, 0, 0);
	// 	typeContext.restore();
	// 	typeContext.save();


	// 	const typeData = typeContext.getImageData(0, 0, cols, rows).data;


	// 	context.fillStyle = 'black';
	// 	context.fillRect(0, 0, width, height);

	// 	context.textBaseline = 'middle';
	// 	context.textAlign = 'center';

	// 	// context.drawImage(typeCanvas, 0, 0);

	// 	for (let i = 0; i < numCells; i++) {
	// 		const col = i % cols;
	// 		const row = Math.floor(i / cols);

	// 		const x = col * cell;
	// 		const y = row * cell;

	// 		const r = typeData[i * 4 + 0];
	// 		const g = typeData[i * 4 + 1];
	// 		const b = typeData[i * 4 + 2];
	// 		const a = typeData[i * 4 + 3];

	// 		const glyph = getGlyph(r);

	// 		context.font = `${cell * 2}px ${fontFamily}`;
	// 		if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

	// 		context.fillStyle = 'white';

	// 		context.save();
	// 		context.translate(x, y);
	// 		context.translate(cell * 0.5, cell * 0.5);

	// 		// context.fillRect(0, 0, cell, cell);

	// 		context.fillText(glyph, 0, 0);
			
	// 		context.restore();


	// 	}
	// };
};

// const getGlyph = (v) => {
// 	if (v < 50) return '';
// 	if (v < 100) return '.';
// 	if (v < 150) return '-';
// 	if (v < 200) return '+';

// 	const glyphs = '_= /'.split('');

// 	return random.pick(glyphs);
// };


// const onKeyUp = (e) => {
// 	text = e.key.toUpperCase();
// 	manager.render();
// };
dotsmove = 'off'
const canvasClick = ()=>{
console.log('canvas click')

dotsmove ='on'

}
canvas.addEventListener('mousedown', canvasClick);



function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    tick();
}

const tick = () =>{
// console.log('tick')
if(agents.length>0&&dotsmove=='on'){
context.clearRect(0, 0, canvas.width, canvas.height);
for(let i = 0; i<agents.length;i++){
// const agent = agents[i];
// for(let j = 0; j<agents.length;j++){
// const other = agents[j]
// const dist = agent.getDistance(other.pos);
//  context.lineWidth = 0.1;
// console.log("dist")
// console.log(dist)
// if(dist<300){
// context.beginPath();
// context.moveTo(agent.pos.x, agent.pos.y)
// context.lineTo(other.pos.x, other.pos.y);
// context.stroke();
// }
// }
// console.log("agent")
agents[i].update()
agents[i].draw(context)
// agent.bounce(1000, 1000)


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
// document.addEventListener('keyup', onKeyUp);


// const start = async () => {
// 	manager = await canvasSketch(sketch, settings);
// };

// start();

// function getMyVideo() {
//   var canvas = document.getElementById('canvas');
//   if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');

//     return document.getElementById('myvideo');
//   }
// }

// getMyVideo




// const url = 'https://picsum.photos/200';

// const loadMeSomeImage = (url) => {
// 	return new Promise((resolve, reject) => {
// 		const img = new Image();
// 		img.onload = () => resolve(img);
// 		img.onerror = () => reject();
// 		img.src = url;
// 	});
// };

// const start = async () => {
// 	const img = await loadMeSomeImage(url);
// 	console.log('image width', img.width);
// 	console.log('this line');
// };

// const start = () => {
// 	loadMeSomeImage(url).then(img => {
// 		console.log('image width', img.width);
// 	});
// 	console.log('this line');
// };

})
// start();


