
class Canvas {
	constructor(width, height, vectorLength) {
		this.width = width;
		this.height = height;
		this.vectorLength = vectorLength;	
		this.canvas = document.getElementById('canvas');
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
	}
	getContext() {
		if (this.canvas.getContext) {
			return canvas.getContext('2d');
		} else {
			alert('Browser is too old');
		}
	}
} 

class Drawer {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext();
		this.context.imageSmoothingQuality = "high";
	}

	draw() {	
		for (let i = 0; i < this.canvas.width; i += this.canvas.vectorLength) {
			this.drawLine([i, i], [0, this.canvas.height]);
		}
		for (let i = 0; i < this.canvas.height; i += this.canvas.vectorLength) {
			this.drawLine([0, this.canvas.width] , [i, i]);
		}

	}

	drawLine(x, y) {
		this.context.beginPath();
		this.context.moveTo(x[0], y[0]);
		this.context.lineTo(x[1], y[1]);
		this.context.stroke();
	}
}

var drawer = new Drawer(new Canvas(1000, 600, 30));
drawer.draw();
