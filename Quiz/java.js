

// Questions for the quiz{

var questions = [
{
    prompt: "True or False: Java Script is case sensitive",

    options: ["True", "False"],
    answer: "True",
},

{
    prompt: "Which definition below describes a FUNCTION in Java Script?",
    options: ["Something we use to store groups of data", "A reusable block of code that performs a specific task", "A way we can store a single piece of data"],
    answer: "A reusable block of code that performs a specific task",
},

{
    prompt: "Which syntax is used to call a function?",
    options: ["functionName()", "functionName", "functionName[]"],
    answer: "functionName()",
},

{
    prompt: "How do you start a for loop?",
    options: ["for (i = 0; i < 5; i++)", "for (i = 0; i < 5)", "for (i = 0; i < 5; i--)"],
    answer: "for (i = 0; i < 5; i++)",
},

{
    prompt: "How do you start a while loop?",
    options: ["while (i < 5; i++)", "while (i < 5; i--)", "while (i < 5)"],
    answer: "while (i < 5)",
},

{
    prompt: "What does || mean?",
    options: ["OR", "AND", "NOT"],
    answer: "OR",
},

{
    prompt: "What does && mean?",
    options: ["OR", "NOT", "AND"],
    answer: "AND",
},
]

/*Elements*/

let questionsEl = document.querySelector("#question");

let timerEl = document.querySelector("#timer");

let optionsEl = document.querySelector("#options");

let submitBtn = document.querySelector("#submit");

let startBtn = document.querySelector("#start");

let nameEl = document.querySelector("#name");

let restartBtn = document.querySelector("#restart");

/*Default Values*/

let currentQuestionIndex = 0;
let time = questions.length * 20;
let timerId;

/*Quiz Start*/

function quizStart() {
    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;
    let homeScreenEl = document.getElementById("start-screen");
    homeScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let promptEl = document.getElementById("question");

    promptEl.textContent = currentQuestion.prompt;
    optionsEl.innerHTML = "";
    currentQuestion.options.forEach(
        function(choice, i){
            let choiceBtn = document.createElement("button");
            choiceBtn.setAttribute("value", choice);
            choiceBtn.textContent = i + 1 + ". " + choice;
            choiceBtn.addEventListener("click",questionClick);
            optionsEl.appendChild(choiceBtn);
        });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {

        time -= 10;

        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

/*End Quiz*/

function quizEnd() {
    clearInterval(timerId);
    let endScreenEl = document.getElementById("end-quiz");
    endScreenEl.removeAttribute("class");
    let finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

/* Save Scores*/

function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !=="") {
        let highscores = JSON.parse(
            window.localStorage.getItem("scores")
        ) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem("scores", JSON.stringify(highscores));
        alert(
            "Score saved!"
        );
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert("Score saved!");
    }
}

/*Events*/

nameEl.onKeyup = checkForEnter;

submitBtn.onclick = saveHighscore;

startBtn.onclick = quizStart;