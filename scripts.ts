// INPUT VALUES
let sqAll = <HTMLInputElement>document.getElementById('sq-all');
let rectW = <HTMLInputElement>document.getElementById('rect-w');
let rectH = <HTMLInputElement>document.getElementById('rect-h');
let triangleSide = <HTMLInputElement>document.getElementById('triangle-side');
let circleR = <HTMLInputElement>document.getElementById('circle-r');

// SHAPES 
let sName = document.getElementById('shape-n');
let sWidth = document.getElementById('shape-w');
let sHeight = document.getElementById('shape-h');
let sRadius = document.getElementById('shape-r');
let sArea = document.getElementById('shape-a');
let sPerimeter = document.getElementById('shape-p');

let stage = document.getElementById('stage');

document.getElementById('circle-btn').addEventListener('click', createCircle);
document.getElementById('triangle-btn').addEventListener('click', createTriangle);
document.getElementById('rect-btn').addEventListener('click', createRectangle);
document.getElementById('sq-btn').addEventListener('click', createSquare);

// CREATE CLASSES
function createSquare() {
    new Square(Number(sqAll.value));
}
function createRectangle() {
    new Rectangle(Number(rectW.value), Number(rectH.value));
}
function createTriangle() {
    new Triangle(+triangleSide.value);
}
function createCircle() {
    let inputRadius = Number(circleR.value);
    new Circle(inputRadius);
}

// GENERIC PARENT
abstract class Shape {
    protected div: HTMLDivElement;
    protected cssClass: string;
    protected radius: number;
    constructor(protected width: number, protected height: number) {
        // this.width = width; // Protected, so will not need 
        // this.height = height;
    }
    draw() {
        this.div = document.createElement('div');
        this.div.className = 'shape ' + this.cssClass;

        let x = Math.floor(Math.random() * (600 - this.width));
        let y = Math.floor(Math.random() * (600 - this.height));

        this.div.style.top = y + 'px';
        this.div.style.left = x + 'px';
        this.div.style.width = this.width + 'px';
        this.div.style.height = this.height + 'px';

        this.div.addEventListener('click', this.describe.bind(this));
        this.div.addEventListener('dblclick', function () {
            this.div.remove();
        }.bind(this));

        stage.appendChild(this.div);
    }
    describe() {
        sName.innerText = this.constructor.name;
        sWidth.innerText = String(this.width);
        sHeight.innerText = String(this.height);
        sRadius.innerText = String(this.radius);
        sArea.innerText = this.area();
        sPerimeter.innerText = this.perimeter();
    }
    abstract area();
    abstract perimeter();
}

class Circle extends Shape {
    constructor(radius: number) {
        super(2 * radius, 2 * radius);
        this.radius = radius;
        this.cssClass = 'circle';
        this.draw();

    }
    area() {
        return Math.PI * Math.pow(this.radius, 2);
    }
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}

class Triangle extends Shape {
    constructor(height: number) {
        super(height, height);
        this.cssClass = 'triangle';
        this.draw();
        this.div.style.width = '0';
        this.div.style.height = '0';
        this.div.style.borderRightWidth = height + 'px';
        this.div.style.borderBottomWidth = height + 'px'
    }
    area() {
        return 0.5 * this.height * this.height;
    }
    perimeter() {
        return 2 * this.height + Math.sqrt(2 * Math.pow(this.height, 2));
    }
}
class Rectangle extends Shape {
    constructor(width: number, height: number) {
        super(width, height);
        this.cssClass = 'rectangle';
        this.draw();
    }
    area() {
        return this.width * this.height;
    }

    perimeter() {
        return 2 * this.width + 2 * this.height;
    }
}

class Square extends Rectangle {
    constructor(side: number) {
        super(side, side);
        this.cssClass = 'square'
        this.div.classList.remove('rectangle');
        this.div.classList.add('square');
    }
}