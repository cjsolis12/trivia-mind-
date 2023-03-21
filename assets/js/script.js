var categoryButtons= document.querySelectorAll(".button")
var questionBox=document.querySelectorAll(".question")

// API call to trivia categories
var getQuestionCategory = function(categoryChoice) {
    fetch(`https://the-trivia-api.com/api/questions?categories=${categoryChoice}&limit=5`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data)
    })
}

// getting the value of the button clicked
function categoryButtonClicked(){
   var categoryChoice = this.value
   console.log(categoryChoice)
   getQuestionCategory(categoryChoice)
}
// Clicking on each category button
for(const categoryButton of categoryButtons){
    categoryButton.addEventListener('click', categoryButtonClicked)
}


// Looping over each question and answer choices from api 
var createQuestionAndAnswers = function(questionIndex){
    let questionContainer = document.createElement('h2')
    let currentQuestion = data[questionIndex];
    let questionText = currentQuestion.question
    questionContainer.textContent = questionText

}