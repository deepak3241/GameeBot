/* GAME DATABASE */
const games = [];
const categories = ["action", "racing", "puzzle"];

// ADD YOUR EMBED URLs HERE - Array of embed URLs for each game (index 0 = Game 1, index 1 = Game 2, etc.)
const embedUrls = [
    "https://plugplay.games/embed/aae25d4cf623e6da948e59855238b6a4053e5846",  // Game 1 embed
    "https://plugplay.games/embed/1c61b71c9b4302faf505bd65ab92291a1ec7655c",  // Game 2 embed
    "https://html5games.com/Game/Bubble-Shooter/",  // Game 3 embed
    // Add more embed URLs here for Game 4, 5, etc.
];

for (let i = 1; i <= 20; i++) {
    let embed = embedUrls[i - 1] || "https://html5games.com/Game/Bubble-Shooter/";  // Fallback embed
    games.push({
        title: "Game " + i,
        image: "https://picsum.photos/500/400?random=" + i,
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        category: categories[i % 3],
        embed: embed  // <-- EMBED URL IS SET HERE FROM THE embedUrls ARRAY
    });
}

/* SHOW GAMES */
function showGames(list) {
    const grid = document.getElementById("gameGrid");
    grid.innerHTML = "";

    list.forEach(game => {
        let sizes = ["small", "medium", "big"];
        let randomSize = sizes[Math.floor(Math.random() * sizes.length)];

        let card = document.createElement("div");
        card.className = "card " + randomSize;

        card.innerHTML = `
            <img loading="lazy" src="${game.image}" alt="${game.title}">
            <video muted loop preload="none">
                <source src="${game.video}" type="video/mp4">
            </video>
            <h3>${game.title}</h3>
        `;

        card.onclick = () => playGame(game);
        grid.appendChild(card);
    });
}

showGames(games);

/* SEARCH */
document.getElementById("search").addEventListener("input", function() {
    let value = this.value.toLowerCase();
    let filtered = games.filter(g => g.title.toLowerCase().includes(value));
    showGames(filtered);
});

/* CATEGORY FILTER */
document.getElementById("categoryFilter").addEventListener("change", function() {
    let cat = this.value;
    if (cat === "all") {
        showGames(games);
    } else {
        let filtered = games.filter(g => g.category === cat);
        showGames(filtered);
    }
});

/* PLAY GAME */
function playGame(game) {
    document.getElementById("home").style.display = "none";
    document.getElementById("player").style.display = "block";
    document.getElementById("gameTitle").innerText = game.title;
    document.getElementById("gameFrame").src = game.embed;
    showRecommended(game);
}

/* BACK HOME */
function goHome() {
    document.getElementById("player").style.display = "none";
    document.getElementById("home").style.display = "block";
    document.getElementById("gameFrame").src = ""; // Clear iframe to stop loading
}

/* FULLSCREEN */
function fullscreenGame() {
    const iframe = document.getElementById("gameFrame");
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

/* RECOMMENDED */
function showRecommended(current) {
    const container = document.getElementById("recommended");
    container.innerHTML = "";

    let related = games.filter(g => g.category === current.category);
    related.slice(0, 6).forEach(game => {
        let card = document.createElement("div");
        card.className = "card small";

        card.innerHTML = `
            <img loading="lazy" src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
        `;

        card.onclick = () => playGame(game);
        container.appendChild(card);
    });
}