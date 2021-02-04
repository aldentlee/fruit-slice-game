// click on start reset button
//------ we are going to check if we are playing
// -----------Yes if we are playing
// ----------------then reload the page
// -----------No if we are not playing
// ----------------then show trials left box
// ----------------change button text to "reset game"
// ----------------1. create a random fruit (from an array)
// ----------------define a random step (aka changing each fruits speed)
// ----------------2. move fruit down one step every 30 sec
// ----------------------check if the fruit is too low?
// ---------------------------if NOT then repeat #2
// ---------------------------if YES then check if any trials left?
// --------------------------------YES then repeat #1
// --------------------------------NO then show game over, button text changes to start game

//if we slice a fruit
// ---play sound
// ---explode fruit
// ---increase score by 1

// document.ready
$(function () {
  var playing = false;
  var score;
  var step;
  //   used for the set interval function
  var action;
  var trialsRemaining;
  var fruitsArray = ["apple", "banana", "grapes", "kiwi"];

  // click on start reset button
  $("#start-reset").click(function () {
    $("#game-over").hide();
    //we are going to check if we are playing

    if (playing == true) {
      // Yes if we are playing
      // then reload the page
      location.reload();
    } else {
      // No if we are not playing
      playing = true;
      score = 0;

      $("#scoreValue").text(score);

      // show trials left box
      $("#trialsLeft").show();

      //   sets trials to 3
      trialsRemaining = 3;

      //   adds three hearts
      addHearts();

      // change button text to "reset game"
      $("#start-reset").html("Reset Game");

      // 1. create a random fruit (from an array)
      startAction();
      // 2. create a random step
      //   createRandomStep();
    }
  });

  $("#fruit1").mouseover(function () {
    score++;
    $("#scoreValue").html(score);

    // you can use the js way
    // document.getElementById("#sliceSound").play() or you can use the jquery way below

    // returns an array (first element will be the audio)
    $("#slicesound")[0].play();

    // stop fruit from continuing down
    clearInterval(action);

    // hides the fruit after mouseover using an explode animation
    // ----------------animation complete in 500 miliseconds
    $(this).hide("explode", 500, function () {
      // send new fruit after the animation completes
      startAction();
    });
  });

  //   function to refill the trials remaining
  function addHearts() {
    //   emptys the trials when this function is called before populating it with hearts
    $("#trialsLeft").empty();

    for (i = 0; i < trialsRemaining; i++) {
      $("#trialsLeft").append(
        "<img src='images/heart.png' alt='heart' class='trials' />"
      );
    }
  }

  //   starts sending fruits
  function startAction() {
    $("#fruit1").show();
    // creates a random fruit
    randomFruit();

    // randomly puts the fruit on the x-axis
    $("#fruit1").css({ left: Math.round(580 * Math.random()), top: "-70px" });

    // generate a random step between 1 and 6x
    step = 1 + Math.round(5 * Math.random());

    // move fruit down by 1 step every 10 miliseconds
    action = setInterval(function () {
      // --------------------gets the original top position of the fruit image and adds the step ever 10 miliseconds
      $("#fruit1").css("top", $("#fruit1").position().top + step);

      //   check if the fruit is too low - selects the height of the fruitsContainer
      if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
        //   check if there are any trials remaining
        if (trialsRemaining > 1) {
          //   it is important to note here that it is temping to call the startAction function again
          // within itself, but you should never do this.  Instead just borrow raw code from above.

          $("#fruit1").show();
          // creates a random fruit
          randomFruit();

          // randomly puts the fruit on the x-axis
          $("#fruit1").css({
            left: Math.round(580 * Math.random()),
            top: "-70px",
          });

          // generate a random step between 1 and 6x
          step = 1 + Math.round(5 * Math.random());

          // subtract a trial by 1
          trialsRemaining--;
          //   repopulate the trials bar with the correct amount of hearts (since we lost one)
          addHearts();
        } else {
          // game over
          playing = false;
          $("#start-reset").html("Start Game");
          $("#game-over").show();
          $("#game-over").html(
            "<p>Game over!</p><p>Your score is " + score + "!</p>"
          );
          $("#trialsLeft").hide();
          stopAction();
        }
      }
    }, 10);
  }

  //   generates a random fruit
  function randomFruit() {
    $("#fruit1").attr(
      "src",
      "images/" + fruitsArray[Math.round(3 * Math.random())] + ".png"
    );
  }

  //   stop dropping fruits here
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
