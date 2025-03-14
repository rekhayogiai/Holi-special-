// Language Change
const translations = {
  en: {
    greetings: "Greetings",
    welcome: "Welcome to the Festival of Colors!",
  },
  hi: {
    greetings: "बधाई",
    welcome: "रंगों के त्योहार में आपका स्वागत है!",
  },
  hinglish: {
    greetings: "Badhaiyan",
    welcome: "Rango ke tyohaar mein aapka swagat hai!",
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach(el => {
    el.innerText = translations[lang][el.getAttribute("data-lang")];
  });
}

// Shayari Collection
const holiWishes = {
  hindi: [
    "रंगों की बौछार हो, खुशियों की बहार हो!",
    "गुलाल का रंग, गुजियों की मिठास, होली का एहसास!",
    "पिचकारी की धार, गुलाल की बौछार, आपको मिले खुशियों की बहार!",
    "होली के रंग आपके जीवन में नई खुशियां लाएं, सदा मुस्कुराते रहें!"
  ],
  english: [
    "Let the colors of Holi brighten your life with joy and happiness!",
    "Splash colors of happiness, love, and prosperity this Holi!",
    "Holi is the time to express love with colors. Happy Holi!",
    "May your Holi be filled with colors of joy, happiness, and success!"
  ],
  hinglish: [
    "Gulal ki baat ho, Gujiya ki mithaas ho, Rangon ke saath Holi ka ehsaas ho!",
    "Aaj har rang kuch keh raha hai, Aapki khushi ke geet gaa raha hai!",
    "Holi ke rang aapki life ko aur bhi colorful banaye!",
    "Happy Holi! Mazedaar Gujiya khayein aur masti karein!"
  ]
};

// Generate Random Shayari
function generateGreeting() {
  let name = document.getElementById("userName").value;
  let lang = document.getElementById("language").value;
  
  if (name.trim() === "") {
    alert("कृपया अपना नाम लिखें!");
    return;
  }
  
  let wishes = holiWishes[lang];
  let randomWish = wishes[Math.floor(Math.random() * wishes.length)];
  let greetingText = `प्रिय ${name},\n\n${randomWish}`;
  
  document.getElementById("greetingText").innerText = greetingText;
  document.getElementById("greetingCard").style.display = "block";
}

// Copy Shayari Function
function copyShayari() {
  let shayariText = document.getElementById("greetingText").innerText;
  
  navigator.clipboard.writeText(shayariText).then(() => {
    alert("Shayari copied to clipboard! 🎉");
  }).catch(err => {
    console.log("Copy failed:", err);
  });
}

// Back Function
function goBack() {
  document.getElementById("greetingCard").style.display = "none";
}
let score = 0;
let gameRunning = false;
let gameInterval;

const balloonContainer = document.getElementById("balloon-container");
const scoreText = document.getElementById("score");
const gameOverText = document.getElementById("game-over");
const startButton = document.getElementById("start-game");
const endButton = document.getElementById("end-game");

function startGame() {
  score = 0;
  scoreText.innerText = score;
  gameOverText.classList.add("hidden");
  startButton.classList.add("hidden");
  endButton.classList.remove("hidden");
  gameRunning = true;
  
  balloonContainer.innerHTML = ""; // पहले के गुब्बारों को हटा दें
  
  gameInterval = setInterval(() => {
    if (!gameRunning) return;
    
    let balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.backgroundColor = ["red", "blue", "yellow", "green", "pink", "purple"][Math.floor(Math.random() * 6)];
    balloon.style.left = Math.random() * 90 + "vw";
    balloon.style.bottom = "-70px";
    
    // गुब्बारा क्लिक होते ही फूटे और हट जाए
    balloon.addEventListener("click", function popBalloon() {
      if (!gameRunning) return;
      score++;
      scoreText.innerText = score;
      balloon.remove();
    });
    
    balloonContainer.appendChild(balloon);
    
    let speed = Math.random() * 3 + 2;
    let moveUp = setInterval(() => {
      if (!gameRunning) {
        clearInterval(moveUp);
        balloon.remove();
        return;
      }
      let currentBottom = parseInt(balloon.style.bottom) || 0;
      if (currentBottom > window.innerHeight) {
        balloon.remove();
        clearInterval(moveUp);
      } else {
        balloon.style.bottom = currentBottom + speed + "px";
      }
    }, 20);
  }, 700);
  
  setTimeout(() => endGame(), 30000); // 30 सेकंड बाद गेम खत्म होगा
}

function endGame() {
  clearInterval(gameInterval);
  gameRunning = false;
  gameOverText.classList.remove("hidden");
  startButton.classList.remove("hidden");
  endButton.classList.add("hidden");
  balloonContainer.innerHTML = ""; // सारे गुब्बारे हटा दें
}

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);