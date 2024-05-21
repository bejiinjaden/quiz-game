import { showCategory } from "./category.js";

const topicapi = {
    generalKnowledge: "https://opentdb.com/api.php?amount=10&category=9&type=multiple",
    ScienceNature: "https://opentdb.com/api.php?amount=10&category=17&type=multiple",
    ScienceComputers: "https://opentdb.com/api.php?amount=10&category=18&type=multiple",
    ScienceMath: "https://opentdb.com/api.php?amount=10&category=19&type=multiple",
    EntertainmentBooks: "https://opentdb.com/api.php?amount=10&category=10&type=multiple",
    EntertainmentFilm: "https://opentdb.com/api.php?amount=10&category=11&type=multiple",
    EntertainmentMusic: "https://opentdb.com/api.php?amount=10&category=12&type=multiple",
    EntertainmentAnime: "https://opentdb.com/api.php?amount=10&category=31&type=multiple",
    Mythology: "https://opentdb.com/api.php?amount=10&category=20&type=multiple",
    History: "https://opentdb.com/api.php?amount=10&category=23&type=multiple",
    Sports: "https://opentdb.com/api.php?amount=10&category=21&type=multiple",
    Random: "https://opentdb.com/api.php?amount=10&type=multiple"
}


let questionsAnswers;
let questionTracker = 0;

export async function fetchdata(selectedCategory) {
    try {
        const response = await fetch(topicapi[selectedCategory]);

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        const data = await response.json();

        questionsAnswers = data.results;

        console.log(questionsAnswers);

        runGame();
    } catch (error) {
        console.log(error);
    }
}

function shuffle(array) {
    let j;
    for (let i = 0; i < array.length; i++) {
        j = Math.floor(Math.random() * Math.random() * array.length);
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function runGame() {
    const questionElement = document.querySelector('.question');
    const optionsContainer = document.querySelector('.options');

    if (questionTracker >= questionsAnswers.length) {
        alert("Game ended");
        questionTracker = 0;
        showCategory();
        return;
    }

    questionElement.innerHTML = questionsAnswers[questionTracker].question;

    let allAnswers = [...questionsAnswers[questionTracker].incorrect_answers, questionsAnswers[questionTracker].correct_answer];
    shuffle(allAnswers);

    optionsContainer.innerHTML = '';

    allAnswers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = answer;
        button.dataset.answerBtn = index;
        optionsContainer.appendChild(button);
    });

    
    optionsContainer.addEventListener('click', handleAnswerClick);
}

function handleAnswerClick(event) {
    const clickedBtn = event.target.closest('.btn');
    if (!clickedBtn) return;

    const text = clickedBtn.textContent;
    checkAnswer(text, event);
}

function checkAnswer(text, event) {
    if (questionTracker >= questionsAnswers.length) {
        return;
    }

    const correct_answer = questionsAnswers[questionTracker].correct_answer;

    if (text === correct_answer) {
        event.target.style.backgroundColor = "rgba(158, 255, 113, 0.562)";
    } else {
        event.target.style.backgroundColor = "rgba(247, 123, 123, 0.589)";
        const correct_element = Array.from(document.querySelectorAll('.btn')).find((element) => {
            return element.textContent === correct_answer;
        });
        if (correct_element) {
            correct_element.style.backgroundColor = "rgba(158, 255, 113, 0.562)";
        }
    }

    setTimeout(function () {
        questionTracker++;
        runGame();
    }, 3500);
}
