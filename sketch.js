//this uses a motor logic. The paper spins the segments
//the segments themselves are stationary

let angle = 0; 
let speed = 0.5; //base speed

function setup(){
    //creates the canvas
    //windowWidth and windowHeight fills the screen
    createCanvas(windowWidth, windowHeight);

    angleMode(DEGREES); //so that working with arcs uses degrees.
}

function draw(){
    //Paint the background black
    background(0);

    //Sensor logic
    let mouseA = getCorrectedMouseAngle();
    let distFromCentre = dist(mouseX, mouseY, width/2, height/2);
    let isHovering = false;

    //Check if the mouse is on the ring 
    if(distFromCentre>90 && distFromCentre<120){
        //Check if mouse is on a specific segment
        if((mouseA>0 && mouseA<90) || 
            (mouseA>120 && mouseA<200)||
            (mouseA>230 && mouseA<330)) {
                isHovering = true;
            } 
    }

    //new physics block
    if(isHovering){
        speed = 0;
        cursor(HAND); //show pointer idk
    } else {
        speed = 0.5;
        cursor(ARROW) //show arrow (what)
    }

    push(); //starts isolation

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

    pop();

    angle = angle + speed;
}

//helper function thingy
function getCorrectedMouseAngle(){
    //1. Calculate the angle from the centre
    let rawAngle = degrees(atan2(mouseY - height/2, mouseX - width/2));

    //2. Negative raw angle correction
    if(rawAngle<0){
        rawAngle = rawAngle + 360;
    }

    //3. Subtract the circles rotation (un-spin)
    let correctedAngle = rawAngle - angle;

    //4. Keep it within the 0-360 range
    correctedAngle = correctedAngle%360;
    if(correctedAngle<0){
        correctedAngle = correctedAngle + 360;
    }

    return correctedAngle;
}