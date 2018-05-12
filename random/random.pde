int[] randoms = new int[59];
PFont f;
int ball = 80;
int number1 = 72;
int number2 = 71;
void setup(){
  size(860,200);
  background(#210929);
  f = createFont("Arial",16,true);
  //fill an array with numbers from 1 to 59
  for(int i = 0; i<59; i++){
    randoms[i] = i+1;
    
  }
  //shuffle up the array using a kind of sort method
  //ensures no duplicate numbers appear
  for(int i=0; i < randoms.length; i++){
    int j = (int)random(0,58);
    int temp = randoms[i];
    randoms[i] = randoms [j];
    randoms[j] = temp;
  }


}
void draw(){


//create the balls with a loop
//conditionals determine what colour the ball will be according to 
//the number produced.
for(int i=0; i<6; i++){

  if(randoms[i]<10){
    fill(#FFFCE8);
    strokeWeight(0.1);
    ellipse(ball,100,120,120);
    fill(250);
    ellipse(ball,100,50,50);
    textFont(f,16);
    fill(0);
    text(randoms[i],number1+(i+1.4),105);
  }
  else if(randoms[i]>=10 && (randoms[i]<=19)){
    fill(#2CD9FF);
    ellipse(ball,100,120,120);
    fill(250);
    ellipse(ball,100,50,50);
    textFont(f,16);
    fill(0);
    text(randoms[i],number2,105);
  }
  else if(randoms[i]>=20 && (randoms[i]<=29)){
    fill(#FF80B2);
    ellipse(ball,100,120,120);
    fill(250);
    ellipse(ball,100,50,50);
    textFont(f,16);
    fill(0);
    text(randoms[i],number2,105);
  }
  else if(randoms[i]>=30 && (randoms[i]<=39)){
    fill(#59DB27);
    ellipse(ball,100,120,120);
    fill(250);
    ellipse(ball,100,50,50);
    textFont(f,16);
    fill(0);
    text(randoms[i],number2,105);
  }
  else if(randoms[i]>=40 && (randoms[i]<=49)){
    fill(#EDE913);
    ellipse(ball,100,120,120);
    fill(250);
    ellipse(ball,100,50,50);
    textFont(f,16);
    fill(0);
    text(randoms[i],number2,105);
  }
  else{
    fill(#A12CE8);
    ellipse(ball,100,120,120);
    fill(250);
    ellipse(ball,100,50,50);
    textFont(f,16);
    fill(0);
    text(randoms[i],number2,105);
  }
 
    ball += 140;
    
    number1 += 140;
    number2 += 140;
  
  }
  ball = 80;
  number1 =72;
  number2 =71;
 save("output.png");
 exit();
}
