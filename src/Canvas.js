class Vector {
	constructor (x, y) {
		this.set(x, y);
	}
	set (x = 0, y = 0) {
		this.x = x;
		this.y = y;
		return this;
	}
	copy ({x, y}) {
		this.set(x, y);
		return this;
	}
	clone () {
		return new Vector(this.x, this.y);
	}
	add ({x, y}) {
		this.x += x;
		this.y += y;
		return this;
	}
	sub ({x, y}) {
		this.x -= x;
		this.y -= y;
		return this;
	}
	multiply (s) {
		this.x *= s;
		this.y *= s;
		return this;
	}
}

class Canvas {
	constructor () {
		this.element = document.createElement('canvas');
		this.context = this.element.getContext('2d');
		this.mouse = new Vector();
		this.selectedLayer = null;
		this.layers = [];
		
		const DRAW = () => {
			requestAnimationFrame(DRAW);
			this.clear();
			for (let layer of this.layers)
				layer.visible && layer.draw(this);
		}
		
		const MOUSE_MOVE = e => {
			this.mouse.set(e.pageX, e.pageY);
		}
		
		const MOUSE_DOWN = e => {
			if (this.selectedLayer) {
				this.selectedLayer.onmousedown(this.mouse);
			}
		}
		
		const MOUSE_UP = e => {
			if (this.selectedLayer) {
				this.selectedLayer.onmousedown(this.mouse);
			} else {
				for (let layer of this.layers) {
					if (layer.visible && layer.inside(this.mouse)) {
						this.selectedLayer = layer;
						break;
					}
				}

			}
		}
	}
	clear () {
		this.context.clearRect(0, 0, this.width, this.height);
	}
	stroke (points, style, width = 1) {
		const C = this.context;
		C.strokeStyle = style;
		C.lineWidth = width;
		C.beginPath();
		for (let point of points)
			C.lineTo(point.x, point.y);
		C.stroke();
		return this;
	}
	fill (points, style) {
		const C = this.context;
		C.fillStyle = style;
		C.beginPath();
		for (let point of points)
			C.lineTo(point.x, point.y);
		C.fill();
		return this;
	}
	point ({x, y}, style, size) {
		const C = this.context;
		const R = size / 2;
		C.fillStyle = style;
		C.fillRect(x - R, y - R, size, size);
		return this;
	}
	set width (v) {
		return this.element.width = v;
	}
	get width () {
		return this.element.width;
	}
	set height (v) {
		return this.element.height = v;
	}
	get height () {
		return this.element.height;
	}
}

class Layer {
	constructor () {
		this.visible = true;
	}
	inside (V) {
		return false;
	}
	draw (C) {
		
	}
}