monitor = "";
objectStatus = "";
objects = [];

function preload() {

    monitor = loadImage("monitor.jpg");
}

function setup() {

    canvas = createCanvas(500, 400);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {

    console.log("Model has been loaded!");
    objectStatus = true;
    objectDetector.detect(monitor, gotResults);
}

function gotResults(error, results) {
    if (error) {

        console.log(error);
    } else {

        console.log(results);

        objects = results;
    }
}

function draw() {
    image(monitor, 0, 0, 500, 400);

    if (objectStatus == true)
    {
        for (i = 0; i < objects.length; i++)
        {
            fill(color(255, 0, 0));
            percantage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percantage + "%", objects[i].x + 10, objects[i].y + 15);
            noFill();
            stroke(color(0, 255, 0));
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        document.getElementById("status").innerHTML = "Status: There are 3 objects and cocossd has detected " + objects.length;
    }
}