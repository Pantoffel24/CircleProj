//this uses a motor logic. The paper spins the segments
//the segments themselves are stationary

let angle = 0; 

function setup(){
    //creates the canvas
    //windowWidth and windowHeight fills the screen
    createCanvas(windowWidth, windowHeight);

    angleMode(DEGREES); //so that working with arcs uses degrees.
}

function draw(){
    //Paint the background black
    background(0);

    noFill();
    stroke(255);
    strokeWeight(4);

    translate(windowWidth/2,windowHeight/2);
    d = 200 //200 pixels

    //this rotates the page
    rotate(angle);
    
    //segment 1
    arc(0,0,d,d,0,90);

    //segment 2
    arc(0,0,d,d,120,200);

    //segment 3
    arc(0,0,d,d,230,330);

    angle = angle + 0.5;
}