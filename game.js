var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //Checking if the most recent answer is same as game pattern
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      //checking if the sequence is same as game pattern sequence
      setTimeout(nextSequence, 1000); //while calling a prebuilt fn inside setTimeout, don't use ()
    }
  } else {
    playSound("wrong"); //When the user clicked wrong button

    $("body").addClass("game-over"); //Animation when game over
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver(); //When it's wrong, we start the game over
  }
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  //this keyword selects the current object and it's id is taken using attr()fn
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1); //Passing the index of the last answer
});

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play(); //Playing the Sound of the button color
}

//It's the main function for creating patterns
function nextSequence() {
  userClickedPattern = []; //Making a fresh user clicked pattern whenever fn is called
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor); //Adds element to the end of the array

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  //Selecting the button using the randomChosenColor and adding the 'Flash' animation to it

  playSound(randomChosenColor); //Playing the sound of the random chosen color

  level++; //Increasing the level every time function is called
  $("#level-title").text("Level " + level);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed"); //Adding the class when clicked

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100); //Removing the class so that it gets animated
}
