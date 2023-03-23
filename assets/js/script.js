var categoryButtons = document.querySelectorAll(".button")
var main = document.querySelector(".main")
var questionAnswerEl = document.querySelector(".questions-and-answers");
var brainHandEl = document.querySelector("figure")
var questionBox = document.querySelector(".questions")
var answerBox = document.querySelector(".answers")
var progressBar = document.querySelector('.progress');
let questionIndex = 0


// API call to trivia categories
var getQuestionCategory = function(categoryChoice) {
    fetch(`https://the-trivia-api.com/api/questions?categories=${categoryChoice}&limit=1`)
        .then((res)=>{
            return res.json();
    })
        .then((responseData)=>{
            let currentQuestion = responseData[0].question
            questionBox.innerHTML= currentQuestion
            console.log(responseData) 
            createAnswers(responseData)       
    })
    .catch(error => console.log(error));
}

// getting the value of the button clicked
function categoryButtonClicked(){
   startTimer()
   var categoryChoice = this.value
   console.log(categoryChoice)
   getQuestionCategory(categoryChoice)

   main.style.display = 'none';
   brainHandEl.style.display= 'none';
   questionAnswerEl.style.display = 'block';
}

// Clicking on each category button
for(const categoryButton of categoryButtons){
    categoryButton.addEventListener('click', categoryButtonClicked)
}

let timeInterval;

// Progress bar decreases from 100% to 0% in 7 seconds
function startTimer(){
    console.log("Time started")

    progressBar.style.width = '100%';

    // Starts the transitions
    setTimeout(() => {
        progressBar.style.width = '0%';
    }, 0);

    // Starts a timer
    timeInterval = setInterval(function () {
        console.log('Time ended.');
        clearInterval(timeInterval);

        // Add code here once complete
        // What should happen when the timer runs out?
        
    }, 6000);
}

// Creating answer choices array from api answers and displaying
var createAnswers = function(responseData){
    $('#answers').empty()
    let answersArr= [];

    answersArr.push(responseData[0].correctAnswer)
    for (let i =0; i < 3; i++){
        answersArr.push(responseData[0].incorrectAnswers[i])
    }

    let shuffledArray = answersArr.sort((a,b) => 0.5 - Math.random())
    
    // Append array indexes to buttons
    for(let i = 0; i < answersArr.length; i++){
        let answerBtns = document.createElement('button')
        answerBtns.innerHTML = answersArr[i]
        
        // Applied bulma styling to the button element before appending
        answerBtns.classList.add('button', 'is-primary', 'is-outlined', 'is-mobile');
        answerBox.append(answerBtns)
        answerBtns.addEventListener('click', answerClicked);
    }
}

function answerClicked() {
    console.log("answer clicked")

    // need to stop the timer or else it will keep
    // going and think an answer wasnt selected
    clearInterval(timeInterval);
};
// Start button event listener 

