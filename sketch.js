

//p5 busines
let container; //for size and placement in the dom

//sliders
let slider1; //test
let rightBoundrySlider, bottomBoundrySlider;
let mainW, cornerW, bottomW, bottomH, rightW, rightH;

//buttons
let saveButton, resetButton, setColorButton;

//drawing vars 
let flipflop = 0;
let color1, color2;

function setup(){
  container = select('#canvas-wrapper');
  createCanvas(container.width, container.width * (9/16)); //keep hd proportions

  noStroke();

  //this handles all the sliders
  assignControls();
  resetControls();

  //button business
  saveButton = select('#save');
  saveButton.mousePressed(() => saveCanvas('pompdoek', 'png'));
  
  //reset button
  resetButton = select('#reset');
  resetButton.mousePressed(resetControls);
}

function windowResized() {
  container = select('#canvas-wrapper'); //regrab the container to get the new width
  resizeCanvas(container.width, container.width * (9/16)); //keep hd proportions
}

function draw() {
  background(255);
  color1 = colorOneInput.value();
  color2 = colorTwoInput.value();

  //set boundry 
  let rightDiv = map(rightBoundrySlider.value(), 0, 1, 1, width); 
  let bottomDiv = map(bottomBoundrySlider.value(), 0, 1, 1, height); 

  //test
  // line(rightDiv, 0, rightDiv, height);
  // line(0, bottomDiv, width, bottomDiv);

  ////main 
  let cols, rows;
  cols  = floor(map(mainW.value(), 0, 1, 2, 100)); //must be a whole number? 
  squareCheck(0, 0, rightDiv, bottomDiv, cols);

  ////bottom 
  cols = floor(map(bottomW.value(), 0, 1, 2, 100));   
  rows = floor(map(bottomH.value(), 0, 1, 2, 100));
  longCheck(0, bottomDiv, rightDiv, height - bottomDiv, cols, rows);

  ////right
  cols = floor(map(rightW.value(), 0, 1, 2, 100));   
  rows = floor(map(rightH.value(), 0, 1, 2, 100));
  longCheck(rightDiv, 0, width - rightDiv, bottomDiv, cols, rows);

  ////corner
  cols = floor(map(cornerW.value(), 0, 1, 2, 100));
  squareCheck(rightDiv, bottomDiv, width - rightDiv, height - bottomDiv, cols);
}

//long check
function longCheck(startX, startY, sectionW, sectionH, c, r){
  let w = sectionW/c;
  let h = sectionH/r;

  let toggle = flipflop;


  //a total hack! even number of rows was causeing the checkerboard to break
  //this makes it always odd
  if(r % 2 == 0){
    r+=1;
  }


  for(let i = 0; i < c; i++){
    for(let j = 0; j < r; j++){
      // print(i,j);
      // fill(random(0,255));
      // toggle % 2 ? fill(0) : fill(255);
      toggle % 2 ? fill(color1) : fill(color2);
      rect(i * w + startX, j * h + startY, w, h);
      toggle++;
    }
  }

}
//squre check 
function squareCheck(startX, startY, sectionW, sectionH, c){
  let w = sectionW/c;
  let h = w;
  let r = floor(sectionH/h) + 1; 
  
  //a total hack! even number of rows was causeing the checkerboard to break
  //this makes it always odd
  if(r % 2 == 0){
    r+=1;
  }

  // console.log(width, c, w, r, h);
  let toggle = flipflop;

  for(let i = 0; i < c; i++){
    for(let j = 0; j < r; j++){
      // print(i,j);
      // fill(random(0,255));
      // toggle % 2 ? fill(0) : fill(255);
      toggle % 2 ? fill(color1) : fill(color2);
      rect(i * w + startX, j * h + startY, w, h);
      toggle++;
    }
  }
}

//assign sliders
function assignControls() {
  //all sliders are from 0 to 1 in html, mapping is handled in the draw loop

  //attach the slider values
  rightBoundrySlider = select('#right-boundry');  
  bottomBoundrySlider = select('#bottom-boundry');  
  mainW = select('#main-columns');
  bottomW = select('#bottom-columns');
  bottomH = select('#bottom-rows');
  rightW = select('#right-columns');
  rightH = select('#right-rows');
  cornerW = select('#corner-columns');
  
  //attach the color button
  colorOneInput = select("#color-1");
  colorTwoInput = select("#color-2");
}

function resetControls() {
  console.log('reset');
  // slider1.elt.value = 0.2
  rightBoundrySlider.elt.value = 0.8;
  bottomBoundrySlider.elt.value = 0.66;
  mainW.elt.value = 0.2;
  cornerW.elt.value = 0.2;
  bottomW.elt.value = 0.7;
  bottomH.elt.value = 0.03;
  rightW.elt.value = 0.03;
  rightH.elt.value = 0.4;

  colorOneInput.elt.value = "#434f71"
  colorTwoInput.elt.value = "#FFFFFF"
}
