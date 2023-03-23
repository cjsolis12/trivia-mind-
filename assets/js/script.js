var categoryButtons = document.querySelectorAll(".button")
var catBtns = document.querySelector(".catBtns")
var questionBox = document.querySelector(".questions")
var answerBox = document.querySelector(".answers")
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
   var categoryChoice = this.value
   console.log(categoryChoice)
   getQuestionCategory(categoryChoice)
   catBtns.style.display = 'none';
}

// Clicking on each category button
for(const categoryButton of categoryButtons){
    categoryButton.addEventListener('click', categoryButtonClicked)
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
    // Apply bulma styling to the button element before appending
        answerBtns.classList.add('button', 'is-primary', 'is-outlined', 'is-mobile');
        answerBox.append(answerBtns)
    }
}

// Start button event listener 

