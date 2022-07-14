//apka musi być uruchomiona na Live Server
const gameWindow = document.querySelector(".gameWindow");
let round = 0;
let points = 0;
let isPrev = false;

const questions = []


function showQuestions()
{
    console.log(questions);

    document.querySelector('body').removeEventListener('click', showQuestions)
    if (round < questions.length)
    {
        gameWindow.innerHTML = `<h2 class ="questionContent">Pytanie ${questions[round].number}
        <p>${questions[round].content}</p>
        </h2>
        <p class = "roundCounter">${round+1}/${questions.length}</p>

        
        <div class = "answers">
        
        <p class="answer A"><span class = "ans"> Odp. A </span> ${questions[round].A}</p>
        <p class="answer B"><span class = "ans"> Odp. B </span> ${questions[round].B}</p>
        <p class="answer C"><span class = "ans"> Odp. C </span> ${questions[round].C}</p>
        <p class="answer D"><span class = "ans"> Odp. D </span> ${questions[round].D}</p>
        
        </div>

        <div class = "buttons">
        <button class="prev"><img src="arrow.png"></button>
        <button class = "next"><img src="arrow2.png"></button>
        </div>
        `
    }
    else
    {
        gameWindow.innerHTML = `
        <div class = "results">
            <div class = "resultsCongrats"><h2>Congratulations</h2>
            </div>
                <span class = "correct">Correct points: ${points}</span>
                <span class = "incorrect">Incorrect points: ${round - points}</span>
                <span></span>
        </div>
        `
    }

    //back
    function prevQuestion()
    {
        isPrev = true;
        if(round>0)
        {
            round--;
        }
        
        showQuestions();
    }

    const prev = document.querySelector(".prev");
    if(prev)
    {
        prev.addEventListener('click', prevQuestion);
    }
    

    function checkAnswer()
    {
        allAnswers.forEach(answer => answer.removeEventListener('click', checkAnswer))

        if(this.classList.contains(questions[round].correct))
        {
           console.log("correct");
           this.classList.add("correctAnswer");
           //popierdzielone jest cos z numerami rund
           // problem z logika is guessed, nadal dodaje punkty kilka razy
           if(questions[round].isGuessed != true)
           {
            points++;
           }
           questions[round].isGuessed = true;
           round++;
        }
        else
        {
            this.classList.add("wrongAnswer");
            round++;
            if(isPrev && points > 0)
            {
                points--;
            }
            
        }

        function nextQuestion()
        {
                showQuestions();
                isPrev = false;
        }

        
        const next = document.querySelector(".next");
        

        next.addEventListener('click', nextQuestion);
        

    }

    const allAnswers = document.querySelectorAll(".answer");
    allAnswers.forEach(answer => answer.addEventListener('click', checkAnswer))

    console.log("Points " + points, "Round "+ round);


}

//downloading the json file with window onload 
window.addEventListener('load', function()
{
    fetch("./questions.json")
    .then(response => {
       return response.json();
    })
    .then(jsondata => questions.push(...jsondata));
})

document.querySelector('body').addEventListener('click', showQuestions)
    
//zagadka czemu dopiero po wywolaniu funkcji tablica zapełnia sie obiektami JSON a wczesniej jest całkowicie pusta
//Czy trzeba bedzie zrobic przycisk "Rozpocznij quiz" aby sie pytania załadowały?


// function prevQuestion()
//         {
//                 round= round-2;
//                 showQuestions();
//         }

//     prev.addEventListener('click', prevQuestion);
//     const prev = document.querySelector(".prev");