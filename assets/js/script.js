var category = 




// API call to trivia categories
var getQuestionCategory = function() {
    fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=5`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data)
    })
}

getQuestionCategory();