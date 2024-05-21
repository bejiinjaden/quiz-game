import { fetchdata } from "./main.js";


export let category;
const selectCategory= document.querySelector('select');
const play_btn = document.querySelector('.play-btn');
const container = document.querySelector('.container');

document.addEventListener('DOMContentLoaded',()=> {
    play_btn.addEventListener('click', start_game);
})
    function start_game(){

    


        container.innerHTML = '';

        container.innerHTML = `
            <h2 class="question">Question</h2>
            <div class="options">
                <button class="btn" answer-btn=0>answer</button>
                <button class="btn" answer-btn=1>answer</button>
                <button class="btn" answer-btn=2>answer</button>
                <button class="btn" answer-btn=3>answer</button>
            </div>
        `;

        console.log(selectCategory.value);
        
        switch(selectCategory.value) {
            case "General Knowledge":
                category = "generalKnowledge";
                break;
            case "Science&Nature":
                category = "ScienceNature";
                break;
            case "Science: Computers":
                category = "ScienceComputers";
                break;
            case "Science: Math":
                category = "ScienceMath";
                break;
            case "Entertainment: Books":
                category = "EntertainmentBooks";
                break;
            case "Entertainment: Film":
                category = "EntertainmentFilm";
                break;
            case "Entertainment: Music":
                category = "EntertainmentMusic";
                break;
            case "Entertainment: Anime":
                category = "EntertainmentAnime";
                break;
            case "Mythology":
                category = "Mythology";
                break;
            case "History":
                category = "History";
                break;
            case "Sports":
                category = "Sports";
                break;
                case "Random":
                category = "Random";
                break;
        }
        console.log(category);

       

        fetchdata(category);
        ;

    }    

   export function showCategory(){

    container.innerHTML = `
        <div class="category">
            <select class="category_select">
                <option value="General Knowledge">General Knowledge</option>
                <option value="Science&Nature">Science & Nature</option>
                <option value="Science: Computers">Science: Computers</option>
                <option value="Science: Math">Science: Math</option>
                <option value="Entertainment: Books">Entertainment: Books</option>
                <option value="Entertainment: Film">Entertainment: Film</option>
                <option value="Entertainment: Music">Entertainment: Music</option>
                <option value="Entertainment: Anime">Entertainment: Anime</option>
                <option value="Mythology">Mythology</option>
                <option value="History">History</option>
                <option value="Sports">Sports</option>
                <option value="Random">Random</option>
            </select>
            <button class="play-btn">Play</button>
        </div>
    `;
    document.querySelector('.play-btn').addEventListener('click', start_game);
}

    
        



