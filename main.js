
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

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Drawer {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext();
		this.context.imageSmoothingQuality = "high";
	}

	draw() {	
		this.context.globalAlpha = 0.2;
		for (let i = 0; i < this.canvas.width; i += this.canvas.vectorLength) {
			//vertical lines
			this.drawLine(new Point(i, 0), new Point(i, this.canvas.height));
		}
		for (let i = 0; i < this.canvas.height; i += this.canvas.vectorLength) {
			//horizontal lines
			this.drawLine(new Point(0, i) , new Point(this.canvas.width, i));
		}
		this.context.globalAlpha = 1;
		this.drawLine(new Point(0, this.canvas.height / 2) , new Point(this.canvas.width, this.canvas.height / 2));	
		this.drawLine(new Point(this.canvas.width / 2, 0) , new Point(this.canvas.width / 2, this.canvas.height));	

	}

	drawLine(p1, p2) {
		this.context.beginPath();
		this.context.moveTo(p1.x, p1.y);
		this.context.lineTo(p2.x, p2.y);
		this.context.stroke();
	}
}

const drawer = new Drawer(new Canvas(1000, 600, 20));
drawer.draw();
