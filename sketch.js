class physicsObject{
  constructor(pos, vel, drag, size, ID){
    this.pos = pos;
    this.vel = vel;
    this.drag = drag;
    this.size = size;
    this.ID = ID
  }
  update(accelleration = createVector(0,0)){
    this.vel.add(accelleration.copy().div(this.size*this.size*3.145));

    

    this.pos.add(this.vel.copy().mult(deltaTime/1000));
    this.vel.sub(this.vel.copy().mult(this.drag));

    
  }
  verticalBounce(loss = 0){
    //this.vel.mult(createVector(1,-1));
    //print(this.vel)
    this.vel.mult(createVector(1-loss, -(1-loss)))
  }
  horizontalBounce(loss = 0){
    //this.vel.mult(createVector(1,-1));
    //print(this.vel)
    this.vel.mult(createVector(-(1-loss), (1-loss)))
  }
}
objects = []
gravity = false;

function setup() {
  for(var i = 0; i < 25; i+=1){
    objects[i] = new physicsObject(createVector(random(0,400),random(0,400)), createVector(0,0), 0.02, random(5,15), i)
  }
  //frameRate(1)
  //objects[0] = new physicsObject(createVector(200,200), createVector(0,0), 0.02, 5, 0)
  //objects[1] = new physicsObject(createVector(200,201), createVector(0,0), 0.02, 5, 1)
  createCanvas(400, 400);
  background(200);
  drawObjects();
}

function draw() {
  objects[0] = new physicsObject(createVector(mouseX,mouseY), createVector(0,0), 0.02, 10, 0)
  background(200);
  updateObjects();
  drawObjects();
}
function updateObjects(){
  objects.forEach(object => {
    var accelleration = createVector(0,0);
    if(gravity){accelleration.add(createVector(0,9.18*object.size*object.size*3.14))};
    
    //Bounce
    if(object.pos.y >= 400 || object.pos.y <= 0){
      object.verticalBounce(0)
      for(var i = 0; i <10; i++){
        object.update();
        if(object.pos.y < 400 && object.pos.y > 0){
          i = 10
        }
      }
    }
    if(object.pos.x >= 400 || object.pos.x <= 0){
      object.horizontalBounce(0)
      for(var i = 0; i <10; i++){
        object.update();
        if(object.pos.x < 400 && object.pos.x > 0){
          i = 10
        }
      }
    }
    //Collision
    objects.forEach(otherObject => {
      if(object.ID!= otherObject.ID){
        var dist = otherObject.pos.copy().dist(object.pos)
        print(dist)
        if(dist < object.size+otherObject.size){
          /*stroke("red")
          strokeWeight(object.size*5)
          point(object.pos.x,object.pos.y)
          stroke("black")*/
          otherObject.vel.add((otherObject.pos.copy().sub(object.pos).mult(0.5)).mult(0.9));
        }
      }
    });
    object.update(accelleration);
  });
  //print(objects[0].pos)
}
function drawObjects(){
  objects.forEach(object => {
    strokeWeight(object.size*2)
    point(object.pos.x, object.pos.y)
    
  });
}