// INPUT VALUES
var sqAll = document.getElementById('sq-all');
var rectW = document.getElementById('rect-w');
var rectH = document.getElementById('rect-h');
var triangleSide = document.getElementById('triangle-side');
var circleR = document.getElementById('circle-r');

// SHAPES 
var sName = document.getElementById('shape-n');
var sWidth = document.getElementById('shape-w');
var sHeight = document.getElementById('shape-h');
var sRadius = document.getElementById('shape-r');
var sArea = document.getElementById('shape-a');
var sPerimeter = document.getElementById('shape-p');

var stage = document.getElementById('stage');

document.getElementById('circle-btn').addEventListener('click', createCircle);
document.getElementById('triangle-btn').addEventListener('click', createTriangle);
document.getElementById('rect-btn').addEventListener('click', createRectangle);
document.getElementById('sq-btn').addEventListener('click', createSquare);

// CREATE CLASSES
function createSquare() {
    new Square(sqAll.value);
}
function createRectangle() {
    new Rectangle(rectW.value, rectH.value);
}
function createTriangle() {
    new Triangle(triangleSide.value);
}
function createCircle() {
    var inputRadius = circleR.value;
    new Circle(inputRadius);
}

// GENERIC PARENT
function Shape(width, height) {
    this.width = width;
    this.height = height;
}
// PROTOTYPES 
Shape.prototype.draw = function () {
    this.div = document.createElement('div');
    this.div.className = 'shape ' + this.cssClass;

    var x = Math.floor(Math.random() * (600 - this.width));
    var y = Math.floor(Math.random() * (600 - this.height));

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
Shape.prototype.describe = function () {
    sName.innerText = this.constructor.name;
    sWidth.innerText = this.width;
    sHeight.innerText = this.height;
    sRadius.innerText = this.radius;
    sArea.innerText = this.area();
    sPerimeter.innerText = this.perimeter();
}

// METHODS
function Rectangle(width, height) {
    Shape.call(this, width, height);
    this.cssClass = 'rectangle';
    this.draw();
}
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.area = function () {
    return this.width * this.height;
}

Rectangle.prototype.perimeter = function () {
    return 2 * this.width + 2 * this.height;
}

function Square(side) {
    Rectangle.call(this, side, side);
    this.cssClass = 'square';
    this.div.classList.remove('rectangle');
    this.div.classList.add(this.cssClass);
}
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

function Triangle(height) {
    Shape.call(this, height, height);
    this.cssClass = 'triangle';
    this.draw();
    this.div.style.width = '0';
    this.div.style.height = '0';
    this.div.style.borderRightWidth = height + 'px';
    this.div.style.borderBottomWidth = height + 'px';
}
Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.area = function () {
    return 0.5 * this.height * this.height;
}
Triangle.prototype.perimeter = function () {
    // 2 * height + (square root of (2 * height^2))
    return 2 * this.height + Math.sqrt(2 * Math.pow(this.height, 2));
}

function Circle(radius) {
    Shape.call(this, 2 * radius, 2 * radius);
    this.radius = radius;
    this.cssClass = 'circle';
    this.draw();
}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function () {
    // return Math.PI * this.radius * this.radius;
    return Math.PI * Math.pow(this.radius, 2);
}
Circle.prototype.perimeter = function () {
    return 2 * Math.PI * this.radius;
}