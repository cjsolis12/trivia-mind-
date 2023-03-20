var categoryButtons= document.querySelectorAll(".button")

// API call to trivia categories
var getQuestionCategory = function() {
    fetch(`https://the-trivia-api.com/api/questions?categories=science&limit=5`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data)
    })
}

getQuestionCategory();
// getting the value of the button clicked
function categoryButtonClicked(){
   var categoryChoice = this.value
   console.log(categoryChoice)
}
// Clicking on each category button
for(const categoryButton of categoryButtons){
    categoryButton.addEventListener('click', categoryButtonClicked)
}
