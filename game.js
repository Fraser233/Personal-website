var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

$(document).keypress(function() {
  if (!start) {
    $("#level-title").text("level" + level);
    nextSequence();
    start = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level" + level);

  var ranNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[ranNum];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("worng");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  gamePattern = [];
  start = false;
  level = 0;
}
