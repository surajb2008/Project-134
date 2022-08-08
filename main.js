img = "";
person = [];
status = "";
song = "";
canvas = "";

function preload(){
    img = loadImage('baby.jpg');
    song = loadSound('money_jiggle_jiggle.mp3');
}
function setup(){
    canvas = createCanvas(350, 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Person Detected";
}
function modelLoaded(){
    console.log("Model is Loaded!");
    status = true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    person = results;
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        var alarm = false;
        for(i = 0; i < person.length; i++){
            document.getElementById("status").innerHTML = "Status : Person Detected";
            document.getElementById("person").innerHTML = "The logic of the web app will be:" + person.length;
            fill(r,b,g)
            percent = floor(person[i].confidence * 100);
            text(person[i].label + "" + percent + "%", person[i].label + 15, person[i].label + 15);
            noFill();
            stroke(r,g,b);
            rect(person[i].x, person[i].y, person[i].width, person[i].height);
            if(person[i].label != 'person')
                {
                    alarm = true;
                    break;
                }

        }
        if (alarm == true)
        {
            //play();
           console.log('Try to play the alarm');
        }
        else{
            
            console.log('Try to stop the alarm');
        }
    }
}
function play(){
    song.play();
    song.setVolume(10);
    song.rate(1);
}