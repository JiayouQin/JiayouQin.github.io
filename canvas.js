class Joint{
    constructor(x,y,length=100,parent=null){
        this.x = x
        this.y = y
        this.angle = 0
        this.length = length
        this.y_ = 100
        this.x_ = 100
        this.parent = null
        this.child = null
        if (parent){
            this.parent = parent
            this.parent.child = this
        }
    }

    getAngle(){
        let dy = this.y_ - this.y
        let dx = this.x_ - this.x
        this.angle = Math.atan2(dy, dx)
    }

    inverse(x,y){
        this.x_ = x;
        this.y_ = y;
        this.getAngle()
        this.x = this.x_ - this.length*Math.cos(this.angle)
        this.y = this.y_ - this.length*Math.sin(this.angle)

    }

    backfoward(x,y){
        this.x = x;
        this.y = y;
        this.x_ = this.x + this.length*Math.cos(this.angle)
        this.y_ = this.y + this.length*Math.sin(this.angle)
    }

    draw(context){
        context.strokeStyle = 'white'
        context.beginPath();
        context.moveTo(this.x, this.y)
        context.lineTo(this.x_, this.y_)
        context.width = 3
        context.stroke()
    }

    processUnfixed(context,x,y){
        this.inverse(x,y);
        this.draw(context);
        if (this.parent){
            this.parent.processUnfixed(context,this.x,this.y);
        }
    }

    processFixed(context,x,y){
        this.inverse(x,y);
        if (this.parent){
            this.parent.processFixed(context,this.x,this.y);
        }
    }
    processFixed2(context,x,y){
        this.backfoward(x,y);
        this.draw(context);
        if (this.child){
            this.child.processFixed2(context, this.x_, this.y_);
        }
    }

}

let canvas1 = document.getElementById("canvas1")
canvas1.style.background = "#000"
let context1 = canvas1.getContext("2d")
// var h = window.innerHeight
// var w = window.innerWidth
var h = 600
var w = 800
canvas1.height = h
canvas1.width = w

let joint11 = new Joint(100,100);
let joint12 = new Joint(100,100,150,joint11);
let joint13 = new Joint(100,100,50,joint12);
// context.fillRect(0,0,100,100)

function cursorMoved(event) {
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
    let x = event.offsetX;
    let y = event.offsetY;
    joint13.processUnfixed(context1, x, y)
}

let canvas2 = document.getElementById("canvas2")
canvas2.style.background = "#000"
let context2 = canvas2.getContext("2d")
// var h = window.innerHeight
// var w = window.innerWidth

canvas2.height = h
canvas2.width = w

let joint21 = new Joint(100,200);
let joint22 = new Joint(100,100,150,joint21);
let joint23 = new Joint(100,100,100,joint22);
let joint24 = new Joint(100,100,50,joint23);

function cursorMoved2(event) {
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    let x = event.offsetX;
    let y = event.offsetY;
    joint24.processFixed(context2, x, y)  
    joint21.processFixed2(context2, canvas2.width/2, canvas2.height/2)  
}

let canvas3 = document.getElementById("canvas3")
canvas3.style.background = "#000"
let context3 = canvas3.getContext("2d")
// var h = window.innerHeight
// var w = window.innerWidth
canvas3.height = h
canvas3.width = w

let joint31a = new Joint(100,300);
let joint32a = new Joint(100,200,200,joint31a);
let baseX1 = 200; let baseY1 = 200;
let joint31b = new Joint(100,300);
let joint32b = new Joint(100,200,200,joint31b);
let baseX2 = 150; let baseY2 = 300;
let joint31c = new Joint(100,300);
let joint32c = new Joint(100,200,200,joint31c);
let baseX3 = 200; let baseY3 = 400;
let joint31d = new Joint(100,300);
let joint32d = new Joint(100,200,200,joint31d);
let baseX4 = 600; let baseY4 = 200;
let joint31e = new Joint(100,300);
let joint32e = new Joint(100,200,200,joint31e);
let baseX5 = 650; let baseY5 = 300;
let joint31f = new Joint(100,300);
let joint32f = new Joint(100,200,200,joint31f);
let baseX6 = 600; let baseY6 = 400;

function cursorMoved3(event) {
    context3.clearRect(0, 0, canvas2.width, canvas2.height);
    let x = event.offsetX;
    let y = event.offsetY;
    joint32a.processFixed(context3, x, y)  
    joint31a.processFixed2(context3, baseX1, baseY1)  
    joint32b.processFixed(context3, x, y)  
    joint31b.processFixed2(context3, baseX2, baseY2)  
    joint32c.processFixed(context3, x, y)  
    joint31c.processFixed2(context3, baseX3, baseY3)  
    joint32d.processFixed(context3, x, y)  
    joint31d.processFixed2(context3, baseX4, baseY4)  
    joint32e.processFixed(context3, x, y)  
    joint31e.processFixed2(context3, baseX5, baseY5)  
    joint32f.processFixed(context3, x, y)  
    joint31f.processFixed2(context3, baseX6, baseY6)  
}