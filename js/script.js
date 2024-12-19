// Données des chapitres
const chapters = [
    {
        title: "Chapitre 1",
        content: "Vous vous r\u00E9veillez dans une for\u00EAt sombre. Que faites-vous ?", 
        choices: [
            { text: "Explorer la for\u00EAt", nextChapter: 1 }, 
            { text: "Chercher de l'aide", nextChapter: 2 },
        ],
    },
    {
        title: "Chapitre 2",
        content: "Vous trouvez un chemin menant \u00E0 un village. Que faites-vous ?", 
        choices: [
            { text: "Entrer dans le village", nextChapter: 3 },
            { text: "Revenir sur vos pas", nextChapter: 0 },
        ],
    },
    {
        title: "Chapitre 3",
        content: "Vous rencontrez un marchand myst\u00E9rieux. Que faites-vous ?",
        choices: [
            { text: "Acheter une potion", nextChapter: 4 },
            { text: "Continuer votre chemin", nextChapter: 1 },
        ],
    },
    {
        title: "Chapitre 4",
        content: "La potion r\u00E9v\u00E8le un chemin cach\u00E9 vers une grotte. L'aventure continue !", 
        choices: [
            { text: "Retourner au village", nextChapter: 2 },
            { text: "Finir l'aventure et jouer au mini-jeu", nextChapter: -1, action: startMiniGame },
        ],
    },
];

// Variables globales
let currentChapterIndex = 0;
let playerName = '';
let playerAge = '';
let score = 0;
let timer;

// Éléments du DOM
const introScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const miniGameScreen = document.getElementById("mini-game-screen");
const chapterTitle = document.getElementById("chapter-title");
const chapterContent = document.getElementById("chapter-content");
const choicesContainer = document.getElementById("choices");
const clickBtn = document.getElementById("click-btn");
const scoreDisplay = document.getElementById("score");

// Masquer l'écran du mini-jeu au début
miniGameScreen.style.display = "none";

// Fonction pour afficher un chapitre
function displayChapter(index) {
    const chapter = chapters[index];

    // Personnalisation du contenu avec le nom du joueur
    chapterTitle.textContent = chapter.title;
    chapterContent.textContent = `Bonjour ${playerName}, ${chapter.content}`;

    // Efface les anciens choix
    choicesContainer.innerHTML = "";

    // Affiche les nouveaux choix
    chapter.choices.forEach((choice) => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.className = "choice-btn";

        // Si l'option mène à la fin, appel du mini-jeu
        button.addEventListener("click", () => {
            if (choice.action) {
                choice.action();
            } else {
                currentChapterIndex = choice.nextChapter;
                if (currentChapterIndex === -1) {
                    // Lancement du mini-jeu à la fin de l'histoire
                    displayEndMessage();
                } else {
                    displayChapter(currentChapterIndex);
                }
            }
        });

        choicesContainer.appendChild(button);
    });
}

// Fonction pour démarrer le jeu après que le joueur ait rempli le formulaire
function startGame(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre de manière classique

    playerName = document.getElementById("name-input").value;
    playerAge = document.getElementById("age-input").value;

    if (!playerName || !playerAge) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Masque l'écran de formulaire et affiche l'écran de jeu
    introScreen.style.display = "none";
    gameScreen.style.display = "block";

    // Initialise le jeu au premier chapitre
    displayChapter(currentChapterIndex);
}



// Mini-jeu : Cliquez vite
function startMiniGame() {
    score = 0;
    scoreDisplay.textContent = score;

    // Affiche le mini-jeu et masque l'écran principal
    miniGameScreen.style.display = "block";
    gameScreen.style.display = "none";

    // Commence le jeu
    timer = setTimeout(endMiniGame, 5000);

    clickBtn.addEventListener("click", incrementScore);
}

// Incrémente le score
function incrementScore() {
    score++;
    scoreDisplay.textContent = score;
}

// Fonction pour terminer le mini-jeu
function endMiniGame() {
    clearTimeout(timer);
    alert(`Mini-jeu termin\u00E9 ! Votre score est de ${score}.`);

    // Retourne au jeu principal
    miniGameScreen.style.display = "none";
    gameScreen.style.display = "block";
}

// Gère l'événement du formulaire
document.getElementById("player-form").addEventListener("submit", startGame);