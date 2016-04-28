/*
 *  #     #
 *  #     #
 *   #   #
 *    # #
 *     #
 */

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
	length () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	distanceTo ({x, y}) {
		const DX = this.x - x;
		const DY = this.y - y;
		return Math.sqrt(DX * DX + DY * DY);
	}
}
/*
 *   #####
 *  #     #
 *	#
 *	#     #
 * 	 #####
 */
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
		
		requestAnimationFrame(DRAW);
		this.element.addEventListener('mousedown', MOUSE_DOWN);
		this.element.addEventListener('mousemove', MOUSE_MOVE);
		this.element.addEventListener('mouseup', MOUSE_UP);
	}
	selectLayer (L) {
		if (this.selectedLayer)
			this.deselectLayer();
		this.selectedLayer = L;
		L.select();
	}
	deselectLayer (L) {
		L = L || this.selectedLayer;
		if (L === this.selectedLayer)
		{
			this.selectedLayer = null;
			L.deselect();
		}
	}
	addLayer (L) {
		this.layers.push(L);
	}
	removeLayer (L) {
		const i = this.layes.indexOf(L);
		this.layers.splice(i, 1);
		if (L === this.selectedLayer)
			this.deselectLayer();
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
	image (img, {x, y}, D) {
		this.context.drawImage(img, x, y, D.x, D.y);
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
/*
 *  #
 *  #
 *	#
 *	#
 * 	#######
 */
class Layer {
	constructor () {
		this.visible = true;
	}
	inside (V) {
		return false;
	}
	draw (C) {
		
	}
	select () {
		
	}
	deselect () {
		
	}
}

class Polygon extends Layer {
	constructor () {
		super();
		this.points = [];
		this.fillStyle = null;
		this.lineStyle = null;
	}
	inside (V) {
		return Collision.pointInPolygon(V, this.points);
	}
	draw (C) {
		if (this.fillStyle)
			C.fill(this.points, this.fillStyle);
		if (this.strokeStyle)
			C.fill(this.points, this.strokeStyle);
	}
}

class Polyline extends Layer {
	constructor () {
		super();
		this.points = [];
		this.strokeStyle = null
	}
	inside (V) {
		let A;
		for (let B of this.points)
		{
			if (A) {
				if (Collision.pointNearLine(V, A, B, 5))
					return true;
			}
			A = B
		}
		return false;
	}
	draw (C) {
		if (this.strokeStyle)
			C.stroke(this.points, this.strokeStyle);
	}
}

class Image extends Layer {
	constructor (image) {
		super();
		this.position = new Vector();
		this.size = new Vector();
		this.image = 
	}
	inside (V) {
		return Collision.pointInBox(V, this.position, this.size);
	}
	draw (C) {
		C.image
	}
}

class Collision {
	constructor () {
		
	}
	static pointInPolygon ({x, y}, polygon) {
	    let inside = false;
		let intersect;
		let A;
		for (let B of polygon) {
			if (A)
			{
				intersect = ((A.y > y) != (B.y > y))
					&& (x < (B.x - A.x) * (y - A.y) / (B.y - A.y) + A.x);
				intersect && (inside = !inside);
			}
			A = B;
		}
	    return inside;
	}
	static pointNearLine ({x, y}, A, B, D) {
		
	}
	static pointInBox ({x, y}, P, D) {
		return (P.x <= x) && (P.x + D.x >= x) && (P.y <= y) && (P.y + D.y >= y);
	}
}
