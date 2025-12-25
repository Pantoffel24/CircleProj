//this uses a motor logic. The paper spins the segments
//the segments themselves are stationary

let angle = 0; 
let speed = 0.5; //base speed
let isReading = false; //whether the user is reading a story

function setup(){
    //creates the canvas
    //windowWidth and windowHeight fills the screen
    createCanvas(windowWidth, windowHeight);

    angleMode(DEGREES); //so that working with arcs uses degrees.
}

function draw(){
    //Paint the background black
    background(0);
    let label = document.getElementById("arc-label");
    //Sensor logic
    let mouseA = getCorrectedMouseAngle();
    let distFromCentre = dist(mouseX, mouseY, width/2, height/2);
    let isHovering = false;

    //Check if the mouse is on the ring 
    if(distFromCentre > 40 && distFromCentre<160){
        //Check if mouse is on a specific segment
        if(mouseA>0 && mouseA<90){
            isHovering = true;
            label.innerHTML = "DRACULA<br><small>The feeling is bizarre</small>";
        }
        else if (mouseA>120 && mouseA<200){
            isHovering = true;
            label.innerHTML = "Story 2";
        }
        else if (mouseA>230 && mouseA<330){
            isHovering = true;
            label.innerHTML = "Story 3";
        }

        else {
            label.innerText = "";
        }
    }

    //new physics block
    let targetSpeed = 0.5;
    if(isHovering){
        targetSpeed = 0;
        cursor(HAND); //show pointer idk
    } else {
        cursor(ARROW) //show arrow (what)
    }

    speed = lerp(speed, targetSpeed, 0.1); //smooth transition

    push(); //starts isolation

    noFill();
    stroke(255);
    strokeWeight(4);

    translate(width/2,height/2);
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
    let rawAngle = atan2(mouseY - height/2, mouseX - width/2);

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

function mousePressed(){

    if(isReading){
        return;
    }
    let mouseA = getCorrectedMouseAngle();
    let distance = dist(mouseX, mouseY, width/2, height/2);

    if(distance > 40 && distance<160){
        if(mouseA>0 && mouseA<90){
            openStory("story-1");
        }

        else if (mouseA>120 && mouseA<200){
            openStory("story-2");
        }

        else if (mouseA>230 && mouseA<330){
            openStory("story-3");
        }
    }

}

function openStory(id){
    noLoop(); //stops the draw loop
    isReading = true; //user is reading a story

    document.getElementById(id).style.display = "block"; //shows the story div
}

function closeStory(id){
    let cards = document.querySelectorAll(".story-card");
    cards.forEach(card => {
        card.style.display = "none";
    });
    setTimeout(() => {
        isReading = false; //user is no longer reading
        loop();
    }, 100);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}