appleBasket = "";
objectStatus = "";
objects = [];

function preload() {

    appleBasket = loadImage("appleBasket.jpg");
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
    objectDetector.detect(appleBasket, gotResults);
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
    image(appleBasket, 0, 0, 640, 420);

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

        document.getElementById("status").innerHTML = "Status: There is 1 object and cocossd has detected " + objects.length;
    }
}