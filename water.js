water = "";
objectStatus = "";
objects = [];

objectDetector = "";

function preload() {

    water = loadImage("waterBottle.jpg");
}

function setup() {

    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {

    console.log("Model has been loaded!");
    objectStatus = true;
    objectDetector.detect(water, gotResults);
}

function gotResults(error, results) {
    if (error) {

        console.log(error);
    }
    console.log(results);

    objects = results;
}

function draw() {

    if (objectStatus != undefined)
    {
        image(water, 0, 0, 640, 420);

        for (var i = 0; i < objects.length; i++)
        {
            fill(255, 0, 0);
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 10, objects[i].y + 15);
            noFill();
            stroke(0, 255, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        document.getElementById("status").innerHTML = "Status: There is 1 object and cocossd has detected " + objects.length;
    }
}