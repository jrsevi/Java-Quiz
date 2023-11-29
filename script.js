/*Print Scores*/
let scoresBtn = document.querySelector("#view-scores");


function printScores() { 
    let highscores = JSON.parse(
        window.localStorage.getItem("scores")
    ) || [];
    highscores.sort(function (a,b){
        return b.score - a.score;
    });
    highscores.forEach(function (score) {
        let liTag = document.createElement("li");
        liTag.textContent=score.name + " - " + score.score;
        let olEl = document.getElementById("scores");
        olEl.appendChild(liTag);
    });
}

/*Clear Scores*/

function clearScores() {
    window.localStorage.removeItem("scores");
    window.location.reload();
}
document.getElementById("clear").onclick = clearScores;

printScores();