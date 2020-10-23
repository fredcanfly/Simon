//Declare Arrays:
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

//Declare Variables:
var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  //Play the right sound for color selected
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  //Add then remove the "pressed" class to animate the button that the user clicked on
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  //Check to see if user selected the right color
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    //Check to see if user selected color is the last one in the total pattern, if so, move to chose next color
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

    //If user did not select the right color, make it game over and reset game
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over!!!  Press Any Key To Restart.");
    startOver();
  }
}

function nextSequence() {
  //Reset user clicks and update the title with the current level
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);

  //Randomly pick a color and add it to the total pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Animate the chosen color and play it's sound
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
