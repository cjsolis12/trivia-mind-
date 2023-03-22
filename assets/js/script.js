var categoryButtons = document.querySelectorAll(".button")
var questionBox = document.querySelector(".questions")
let questionIndex = 0


// API call to trivia categories
var getQuestionCategory = function(categoryChoice) {
    fetch(`https://the-trivia-api.com/api/questions?categories=${categoryChoice}&limit=5`)
    .then((res)=>{
        return res.json();
    })
    .then((responseData)=>{
        console.log(responseData)
    })
    .catch(error => console.log(error));
}

// getting the value of the button clicked
function categoryButtonClicked(){
   var categoryChoice = this.value
   console.log(categoryChoice)
   getQuestionCategory(categoryChoice)
    createQuestionAndAnswers()
}

// Clicking on each category button
for(const categoryButton of categoryButtons){
    categoryButton.addEventListener('click', categoryButtonClicked)
}


// Looping over each question and answer choices from api 

var createQuestionAndAnswers = function(responseData){
    if(responseData){
        let currentQuestion = responseData[questionIndex].question
        console.log(currentQuestion)
        questionBox.innerHTML= currentQuestion
    }  
}

// Start button event listener 

