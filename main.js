img="";
statusz="";
objects= [];
song="";

function preload(){
song=loadSound("xyz.mp3");
}

function draw(){
    image(video, 0, 0, 640, 420);



    if (statusz != ""){
        objectDetector.detect(video, gotResult);

        r= random(255);
        g= random(255);
        b= random(255);

        for(i= 0;  i< objects.length; i++){
            document.getElementById("status").innerHTML="Status : object detected";
            document.getElementById("baby").innerHTML=  "Baby:" + objects.length;

            fill(r,g,b);
            percent= floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent + "%",  objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    } 
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}

function modelLoaded(){
    console.log("model is loaded");
    statusz=true;

}

function gotResult(error, result){
    if(error){
        console.log(error);
    }
    console.log(result);
    objects=result;
}