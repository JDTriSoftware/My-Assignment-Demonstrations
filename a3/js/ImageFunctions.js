/** Author: Justin Triantafilou, 000775460 */

let globalCounter = 0;
let intervalTime = 2500;

const imgArray = [["images/Img1.jpg", "images/Img2.jpg", "images/Img3.jpg"],
["images/Img4.jpg", "images/Img5.jpg", "images/Img6.jpg"],
["images/Img7.jpg", "images/Img8.jpg", "images/Img9.jpg"]];

window.addEventListener("load", function() {
    console.log("Hello World")
    randomImage = Math.floor(Math.random()*3);
    var imageDest = document.getElementById("imgOne");
    imageDest.src = imgArray[0][randomImage];
    imageDest = document.getElementById("imgTwo");
    imageDest.src = imgArray[1][randomImage];
    imageDest = document.getElementById("imgThree");
    imageDest.src = imgArray[2][randomImage];
    var displayCounter = document.getElementById("displayCounter");
    displayCounter.textContent = globalCounter;
    displayTimer = document.getElementById("displayRefreshTimer");
    displayTimer.textContent = intervalTime;
}); 

let timerInterval1 = setInterval(switchImage1, intervalTime);
let timerInterval2 = setInterval(switchImage2, intervalTime);
let timerInterval3 = setInterval(switchImage3, intervalTime);


function userInterval() {
    var userIntervalTime = document.querySelector("#userIntervalTime").value;
    if (!isNaN(userIntervalTime) && userIntervalTime >=500 && userIntervalTime <=10000) {
        clearInterval(timerInterval1);
        clearInterval(timerInterval2);
        clearInterval(timerInterval3);
        intervalTime = userIntervalTime;
        displayTimer = document.getElementById("displayRefreshTimer");
        displayTimer.textContent = intervalTime;
        timerInterval1 = setInterval(switchImage1, intervalTime);
        timerInterval2 = setInterval(switchImage2, intervalTime);
        timerInterval3 = setInterval(switchImage3, intervalTime);
        console.log(intervalTime);
        console.log(userIntervalTime);
        console.log(intervalTime);
    }
}

function switchImage1() {
    intervalTime = 2000
    randomImage = Math.floor(Math.random()*3);
    var firstImage = document.getElementById("imgOne");
    firstImage.src = imgArray[0][randomImage];
    globalCounter++;
    displayCounter.textContent = globalCounter;
    console.log(globalCounter);
    console.log(intervalTime);
}

function switchImage2() {
    intervalTime = 2000
    randomImage = Math.floor(Math.random()*3);
    var secondImage = document.getElementById("imgTwo");
    secondImage.src = imgArray[1][randomImage];
    globalCounter++;
    displayCounter.textContent = globalCounter;
}

function switchImage3() {
    intervalTime = 2000
    randomImage = Math.floor(Math.random()*3);
    var thirdImage = document.getElementById("imgThree");
    thirdImage.src = imgArray[2][randomImage];
    globalCounter++;
    displayCounter.textContent = globalCounter;
}

function randomizeImage(){ // This function will switch the photos but will bug the counter variable.
    var randomizeImage = document.getElementById("randomizeImage");
    randomizeImage.addEventListener("click", function() {
        randomImage = Math.floor(Math.random()*3);
        randomArray = Math.floor(Math.random()*3);
        var imageDest = document.getElementById("imgOne");
        imageDest.src = imgArray[randomArray][randomImage];
        randomImage = Math.floor(Math.random()*3);
        randomArray = Math.floor(Math.random()*3);
        imageDest = document.getElementById("imgTwo");
        imageDest.src = imgArray[randomArray][randomImage];
        randomImage = Math.floor(Math.random()*3);
        randomArray = Math.floor(Math.random()*3);
        imageDest = document.getElementById("imgThree");
        imageDest.src = imgArray[randomArray][randomImage];
        clearInterval(timerInterval1);
        clearInterval(timerInterval2);
        clearInterval(timerInterval3);
        timerInterval1 = setInterval(switchImage1, intervalTime);
        timerInterval2 = setInterval(switchImage2, intervalTime);
        timerInterval3 = setInterval(switchImage3, intervalTime);
        displayTimer = document.getElementById("displayRefreshTimer");
        displayTimer.textContent = intervalTime;
        //globalCounter+=3;
        //displayCounter.textContent = globalCounter;
    });
}

function fixCounterBug() {
    globalCounter+=3;
    displayCounter.textContent = globalCounter;
}

function do_animation(event) {
    target = event.srcElement;
    target.classList.remove("card-img-top"); 
    setTimeout( () => {target.classList.add("card-img-top");}, 0 ); 
}
