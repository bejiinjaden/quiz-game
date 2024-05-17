let questionsAnswers;
const question = document.querySelector('.question');
const answers = document.querySelectorAll('.btn');
let random = 0;
let questionTracker=0;
answers.forEach((element) => console.log(element))
async function fetchdata() {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const data = await response.json();

        questionsAnswers = data.results;

        console.log(questionsAnswers);

        runGame(); 

        answers.forEach((element) => {

            element.addEventListener('click',(event)=>checkAnswer(element.textContent,event))
            })

    } catch (error) {
        console.log(error);
    }
}

fetchdata();

function shuffle(array){

    let j;
    for(let i =0 ; i< array.length ; i++){
         j = Math.floor(Math.random() * Math.random() * array.length );

        [array[i] , array[j]] = [array[j] , array[i]];   
    }
}



function runGame(){

    question.innerHTML = questionsAnswers[questionTracker].question;

    let allAnswers = [...questionsAnswers[questionTracker].incorrect_answers,questionsAnswers[questionTracker].correct_answer];

    console.log(allAnswers)
    random= Math.round(Math.random() * 3);

    shuffle(allAnswers);

    for(let i=0;i<allAnswers.length;i++){
        const button = document.querySelector(`.btn[answer-btn="${i}"]`);
        console.log(button);
        document.querySelector(`.btn[answer-btn="${i}"]`).innerHTML = allAnswers[i];
    }

}



function checkAnswer(text,event){
    const correct_answer = questionsAnswers[questionTracker].correct_answer;

    if(text === correct_answer){
        alert("Answer Was Right");
        questionTracker++;
        event.target.style.backgroundColor = "rgba(158, 255, 113, 0.562)";

        setTimeout(function(){
            event.target.style.backgroundColor = "white";
          runGame();

        },2000)
          

        
       
    }else{
        alert("answer was wrong");
        
        event.target.style.backgroundColor = "rgba(247, 123, 123, 0.589)"
       const correct_element = Array.from(answers).find((element)=>{
            return element.textContent === questionsAnswers[questionTracker].correct_answer;
        })

        if (correct_element) {
            correct_element.style.backgroundColor = "rgba(158, 255, 113, 0.562)";
        }
        
        setTimeout(function(){
            event.target.style.backgroundColor = "white";
            correct_element.style.backgroundColor = "white";
            questionTracker++;
          runGame();

        },2000)
    }

}



