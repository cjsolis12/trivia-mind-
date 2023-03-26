var categoryButtons = document.querySelectorAll(".button");
var main = document.querySelector(".main");
var questionAnswerEl = document.querySelector(".questions-and-answers");
var brainHandEl = document.querySelector("figure");
var questionBox = document.querySelector(".questions");
var answerBox = document.querySelector(".answers");
var progressBar = document.querySelector(".progress");
let questionIndex = 0;
var score = 0;
var categoryChoice;


// API call to trivia categories
var getQuestionCategory = function (categoryChoice, questionIndex) {
  fetch(`https://the-trivia-api.com/api/questions?categories=${categoryChoice}`)
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      console.log(responseData);
      let currentQuestion = responseData[questionIndex].question;
      console.log(currentQuestion);
      questionBox.innerHTML = currentQuestion;
      createAnswers(responseData[questionIndex]);
    })
    .catch((error) => console.log(error));
};

// API call to pexel pictures
var getPicture = function (categoryChoice) {
    searchQuery = categoryChoice.split("_")[0]
    console.log(searchQuery)
  fetch(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1&page=${Math.floor(Math.random() * 10) + 1}`, {
    headers: {
      Authorization: "69GSdMwytrFk7RQ3smY6ZSnjrwiZlKA5b0urYfP9iThhwOPTWywY9Jkf",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      console.log(responseData);
      var imageUrl = responseData.photos[0].src.medium
      console.log(imageUrl)
      var imgElement= document.getElementById('photo')
      imgElement.src = imageUrl
    })
    .catch((error) => console.log(error));
};

// getting the value of the button clicked
function categoryButtonClicked() {
  startTimer();
  categoryChoice = this.value;
  console.log(categoryChoice);
  getQuestionCategory(categoryChoice, questionIndex);
 
  getPicture(categoryChoice);

  main.style.display = "none";
  brainHandEl.style.display = "none";
  questionAnswerEl.style.display = "block";
}

// Clicking on each category button
for (const categoryButton of categoryButtons) {
  categoryButton.addEventListener("click", categoryButtonClicked);
}

let timeInterval;

// Progress bar decreases from 100% to 0% in 7 seconds
function startTimer() {
  console.log("Time started");

  progressBar.style.width = "100%";

  // Starts the transitions
  setTimeout(() => {
    progressBar.style.width = "0%";
  }, 0);

  // Starts a timer
  timeInterval = setInterval(function () {
    console.log("Time ended.");
    clearInterval(timeInterval);

    // Add code here once complete
    // What should happen when the timer runs out?
  }, 6000);
}

// Creating answer choices array from api answers and displaying
var createAnswers = function (questionData) {
  $("#answers").empty();
  let answersArr = [];

  answersArr.push(questionData.correctAnswer);
  for (let i = 0; i < 3; i++) {
    answersArr.push(questionData.incorrectAnswers[i]);
  }

  let shuffledArray = answersArr.sort((a, b) => 0.5 - Math.random());

  // Append array indexes to buttons
  for (let i = 0; i < answersArr.length; i++) {
    let answerBtns = document.createElement("button");
    answerBtns.innerHTML = shuffledArray[i];
    var classArr = ["is-primary", "is-danger", "is-warning", "is-link"];
    answerBtns.classList.add(
      "button",
      classArr[i % classArr.length],
      "is-outlined",
      "is-mobile",
      "btngap"
    );
    answerBox.append(answerBtns);
    answerBtns.addEventListener("click", function (event) {
      answerClicked(event);
    });
  }

  function answerClicked(event) {
    console.log("answer clicked");
    const selectedAnswer = event.target.innerHTML;
    if (selectedAnswer === questionData.correctAnswer) {
      // function for tracking points
      score++;
      console.log(`correct! ${score}`);
    } else {
      console.log("incorrect");
    }
    // need to stop the timer or else it will keep
    // going and think an answer wasnt selected
    clearInterval(timeInterval);
    questionIndex++;
    getQuestionCategory(categoryChoice, questionIndex);
    getPicture(categoryChoice)
  }
};
