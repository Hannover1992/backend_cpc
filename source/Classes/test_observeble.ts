//date struction Shape
interface Shape {
    color: string;
    name: string;
}

interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

function paintShape(opts: PaintOptions) {
    //print if defined
    if(opts.shape) {
        console.log(opts.shape.color);
    }
    if (opts.xPos) {
        console.log(opts.xPos);
    }
    if (opts.yPos) {
        console.log(opts.yPos);
    }
}

function getShape() {
    return { color: "blue", name: "circle" };
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
