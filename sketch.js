class physicsObject{
  constructor(pos, vel, drag, size){
    this.pos = pos;
    this.vel = vel;
    this.drag = drag;
    this.size = size;
  }
  update(accelleration = createVector(0,0)){
    this.vel.add(accelleration.copy().div(this.size*this.size*3.145));

    

    this.pos.add(this.vel.copy().mult(deltaTime/1000));
    this.vel.sub(this.vel.copy().mult(this.drag));

    
  }
  verticalBounce(loss){
    this.vel.mult(createVector(1,-1));
    print(this.vel)
    //this.vel.mult(createVector(1-loss, -(1-loss)))
  }
}
objects = []
function setup() {
  for(var i = 0; i < 50; i++){
    objects[i] = new physicsObject(createVector(i,i), createVector(0,0), 0.02, 1)
  }
  createCanvas(400, 400);
}

function draw() {
  background(200);
  updateObjects();
  drawObjects();
}
function updateObjects(){
  objects.forEach(object => {
    var accelleration = createVector(0,0);
    accelleration.add(createVector(0,9.18));
    
    //print(accelleration)
    if(object.pos.x >= 400){
      object.vel.mult(createVector(1,-1))
      object.update();
    }
    object.update(accelleration);
  });
  print(objects[0].pos)
}
function drawObjects(){
  objects.forEach(object => {
    circle(object.pos.x, object.pos.y, object.size*2)
    
  });
}