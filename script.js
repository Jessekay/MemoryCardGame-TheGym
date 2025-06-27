const images = [
  "./images/Argentina.png", "./images/Argentina.png",
  "./images/canada.png", "./images/canada.png",
  "./images/GreenLand.png", "./images/GreenLand.png",
  "./images/Rwanda.png", "./images/Rwanda.png",
  "./images/india.png", "./images/india.png",
  "./images/spain.png", "./images/spain.png",
  "./images/Morroco.png", "./images/Morroco.png",
  "./images/usa.png", "./images/usa.png"
];

// Game state variables
let selectedLevel = 'easy';
let attempts = 0;
let unmatchedAttempts = 0;
let maxUnmatched = Infinity;
let totalAttemptsLimit = Infinity;

const attemptsSpan = document.getElementById('attempts');
const levelGuide = document.getElementById('levelGuidance');
const gameContainer = document.querySelector('.game');
const restartBtn = document.querySelector('.restart');

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Set level
function setLevel(level) {
  selectedLevel = level;
  if (level === 'easy') {
    maxUnmatched = Infinity;
    totalAttemptsLimit = Infinity;
    levelGuide.textContent = 'Easy: Unlimited tries, enjoy learning!';
  } else if (level === 'medium') {
    maxUnmatched = 5;
    totalAttemptsLimit = 22;
    levelGuide.textContent = 'Medium: Max 5 missed tries in a row, and 22 total.';
  } else if (level === 'hard') {
    maxUnmatched = 3;
    totalAttemptsLimit = 16;
    levelGuide.textContent = 'Hard: Max 3 missed tries in a row, and 16 total.';
  }

  // Reset game
  attempts = 0;
  unmatchedAttempts = 0;
  attemptsSpan.textContent = attempts;
  gameContainer.innerHTML = '';
  generateGame();
}

// Create game
function generateGame() {
  const shuffledImages = shuffle([...images]);

  shuffledImages.forEach(src => {
    const box = document.createElement('div');
    box.className = 'item';

    box.innerHTML = `
      <div class="front"></div>
      <div class="back">
        <img src="${src}" class="back-img" />
      </div>
    `;

    box.addEventListener('click', function () {
      if (box.classList.contains('boxOpen') || box.classList.contains('boxMatch')) return;

      box.classList.add('boxOpen');

      setTimeout(() => {
        const openBoxes = document.querySelectorAll('.boxOpen');
        if (openBoxes.length === 2) {
          const img1 = openBoxes[0].querySelector('img').src;
          const img2 = openBoxes[1].querySelector('img').src;

          attempts++;
          attemptsSpan.textContent = attempts;

          if (img1 === img2) {
            openBoxes[0].classList.add('boxMatch');
            openBoxes[1].classList.add('boxMatch');
            unmatchedAttempts = 0;
          } else {
            unmatchedAttempts++;
            openBoxes[0].classList.remove('boxOpen');
            openBoxes[1].classList.remove('boxOpen');
          }

          // Game over conditions
          if (unmatchedAttempts > maxUnmatched || attempts >= totalAttemptsLimit) {
            alert("💥 Game Over! You've reached your limit.");
            restartGame();
            return;
          }

          // Win condition
          const matchedCount = document.querySelectorAll('.boxMatch').length;
          if (matchedCount === images.length) {
            alert(`🎉 Congratulations, you win! with ${attempts} attempts`);
            restartGame();
          }
        }
      }, 500);
    });

    gameContainer.appendChild(box);
  });
}

// Restart game
function restartGame() {
  attempts = 0;
  unmatchedAttempts = 0;
  attemptsSpan.textContent = attempts;
  gameContainer.innerHTML = '';
  generateGame();
}

// Restart button listener
restartBtn.addEventListener('click', () => {
  restartGame();
});

// Level buttons
const levelButtons = document.querySelectorAll('.level-buttons button');

levelButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    levelButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (btn.id === 'easyBtn') setLevel('easy');
    else if (btn.id === 'mediumBtn') setLevel('medium');
    else if (btn.id === 'hardBtn') setLevel('hard');
  })
})


// Load game with default level
window.addEventListener('DOMContentLoaded', () => {
  setLevel(selectedLevel);
});
