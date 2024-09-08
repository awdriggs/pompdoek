let container; //for size and placement in the dom
let slider1; //test
let saveButton;
let resetButton;

function setup(){
  container = select('#canvas-wrapper');
  createCanvas(container.width, container.width * (9/16)); //keep hd proportions

  slider1 = select('#circ-size');
  saveButton = select('#save');
  saveButton.mousePressed(() => saveCanvas('pompdoek', 'png'));
}

function draw(){
  background(220);
  let s = slider1.value();
  ellipse(width/2, height/2, s, s);
}

function windowResized() {
  container = select('#canvas-wrapper'); //regrab the container to get the new width
  resizeCanvas(container.width, container.width * (9/16)); //keep hd proportions
}

