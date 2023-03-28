var categoryButtons = document.querySelectorAll(".catBut");
var main = document.querySelector(".main");
var questionAnswerEl = document.querySelector(".questions-and-answers");
var brainHandEl = document.querySelector("figure");
var questionBox = document.querySelector(".questions");
var answerBox = document.querySelector(".answers");
var progressBar = document.querySelector(".progress");
var submitBtn = document.querySelector(".submit");
var tryAgainBtn = document.querySelector(".try-again");
var tableDiv = document.querySelector(".tableDiv");
var photoSection = document.querySelector('.photoSection');
let questionIndex = 0;
var score = 0;
var categoryChoice;
var questions = [];

// API call to trivia categories
var getQuestionCategory = function (categoryChoice, questionIndex) {
  if (questions.length === 0) {
    fetch(`https://the-trivia-api.com/api/questions?categories=${categoryChoice}`)
      .then((res) => {
        return res.json();
      })
      .then((responseData) => {
        questions = responseData;
        // getPhoto(categoryChoice, questionIndex);
        getPicture(categoryChoice);
        displayQuestionAndAnswers(questionIndex);
      })
      .catch((error) => {
        questionAnswerEl.style.display = "none";
        return;
      });
  } else if (questionIndex >= questions.length){
    answerBox.style.display = "none";

    questionBox.innerHTML = `Quiz has ended! Your Score is ${score}`
    document.querySelector('.progress-bar').style.display = 'none';

    document.querySelector('.saveScore').style.display = 'inline-grid';
    var imgElement= document.getElementById('photo')
    imgElement.style.display = "none"
    return;
  } else {
    displayQuestionAndAnswers(questionIndex);
  }
  startTimer();
};

// API call to pexel pictures
var getPicture = function (categoryChoice) {
    searchQuery = categoryChoice.split("_")[0]
  fetch(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1&page=${Math.floor(Math.random() * 10) + 1}`, {
    headers: {
      Authorization: "69GSdMwytrFk7RQ3smY6ZSnjrwiZlKA5b0urYfP9iThhwOPTWywY9Jkf",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      var imageUrl = responseData.photos[0].src.medium
      var imgElement= document.getElementById('photo')
      imgElement.src = imageUrl
      photoSection.style.display = "block";
    })
    .catch((error) => console.log(error));
};


var displayQuestionAndAnswers = function (questionIndex) {
  let currentQuestion = questions[questionIndex].question;
  questionBox.innerHTML = currentQuestion;
  createAnswers(questions[questionIndex]);
};

// getting the value of the button clicked
function categoryButtonClicked() {
  categoryChoice = this.value;
  main.style.display = "none";
  brainHandEl.style.display = "none";
  questionAnswerEl.style.display = "block";

  getQuestionCategory(categoryChoice, questionIndex);
}
// Clicking on each category button
for (const categoryButton of categoryButtons) {
  categoryButton.addEventListener("click", categoryButtonClicked);
}

tryAgainBtn.addEventListener("click", tryAgain);
function tryAgain () {
    location.reload();
}

submitBtn.addEventListener("click", submitInfo);

function submitInfo() {
    const nameInput = document.querySelector(".input").value;
    var Input = document.querySelector('.input');
    if (nameInput.length == 0) {
        Input.placeholder = "Must enter a name to save!";
        return;
    }
 
    var tableDataNew = {
        name: nameInput,
        score: score
    }
    // addScoreToTable(tableDataNew);
    scoreArr = loadTableCookie();
    scoreArr.push(tableDataNew);
    localStorage.setObj("tableCookie", scoreArr);
    fillTable(scoreArr);
    tableDiv.style.display = 'inline-grid';
    submitBtn.disabled = true;
}

let timeInterval;

function startTimer() {
    console.log("Time started");
    startProgressBar();
    // 5 second timer
    timeInterval = setInterval(function () {
     // When timer runs out 
      clearInterval(timeInterval); // Clear the timer after 5s
      questionIndex++;
      getQuestionCategory(categoryChoice, questionIndex);
    }, 5000);
  }

  function startProgressBar() {
    progressBar.classList.add('notransition'); // Disable transitions
    progressBar.style.width = "100%";
    progressBar.offsetHeight; // Trigger a reflow, flushing the CSS changes
    progressBar.classList.remove('notransition'); // Re-enable transitions
    progressBar.style.width = "0%";
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
    clearInterval(timeInterval);

    const selectedAnswer = event.target.innerHTML;
    if (selectedAnswer === questionData.correctAnswer) {
      // function for tracking points
      score++;
    } else {
    }
    questionIndex++;
    getQuestionCategory(categoryChoice, questionIndex);
    getPicture(categoryChoice)
  }
};

const table = document.querySelector(".table");

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

function loadTableCookie() {
    var scoreArr;

    scoreArr = localStorage.getObj("tableCookie");

    if(!scoreArr){
        scoreArr = [];
    }
    return scoreArr;
}

function fillTable (data) {
    for (let i = 0; i < data.length; i++) {

        const row = table.insertRow();
        const nameCell = row.insertCell();
        const scoreCell = row.insertCell();

        nameCell.innerHTML = data[i].name;
        scoreCell.innerHTML = data[i].score;
    };
};