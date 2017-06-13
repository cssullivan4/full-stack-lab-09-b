var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    new Square(Number(sqAll.value));
}
function createRectangle() {
    new Rectangle(Number(rectW.value), Number(rectH.value));
}
function createTriangle() {
    new Triangle(+triangleSide.value);
}
function createCircle() {
    var inputRadius = Number(circleR.value);
    new Circle(inputRadius);
}
// GENERIC PARENT
var Shape = (function () {
    function Shape(width, height) {
        this.width = width;
        this.height = height;
        // this.width = width; // Protected, so will not need 
        // this.height = height;
    }
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
    };
    Shape.prototype.describe = function () {
        sName.innerText = this.constructor.name;
        sWidth.innerText = String(this.width);
        sHeight.innerText = String(this.height);
        sRadius.innerText = String(this.radius);
        sArea.innerText = this.area();
        sPerimeter.innerText = this.perimeter();
    };
    return Shape;
}());
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(radius) {
        var _this = _super.call(this, 2 * radius, 2 * radius) || this;
        _this.radius = radius;
        _this.cssClass = 'circle';
        _this.draw();
        return _this;
    }
    Circle.prototype.area = function () {
        return Math.PI * Math.pow(this.radius, 2);
    };
    Circle.prototype.perimeter = function () {
        return 2 * Math.PI * this.radius;
    };
    return Circle;
}(Shape));
var Triangle = (function (_super) {
    __extends(Triangle, _super);
    function Triangle(height) {
        var _this = _super.call(this, height, height) || this;
        _this.cssClass = 'triangle';
        _this.draw();
        _this.div.style.width = '0';
        _this.div.style.height = '0';
        _this.div.style.borderRightWidth = height + 'px';
        _this.div.style.borderBottomWidth = height + 'px';
        return _this;
    }
    Triangle.prototype.area = function () {
        return 0.5 * this.height * this.height;
    };
    Triangle.prototype.perimeter = function () {
        return 2 * this.height + Math.sqrt(2 * Math.pow(this.height, 2));
    };
    return Triangle;
}(Shape));
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(width, height) {
        var _this = _super.call(this, width, height) || this;
        _this.cssClass = 'rectangle';
        _this.draw();
        return _this;
    }
    Rectangle.prototype.area = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.perimeter = function () {
        return 2 * this.width + 2 * this.height;
    };
    return Rectangle;
}(Shape));
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(side) {
        var _this = _super.call(this, side, side) || this;
        _this.cssClass = 'square';
        _this.div.classList.remove('rectangle');
        _this.div.classList.add('square');
        return _this;
    }
    return Square;
}(Rectangle));
