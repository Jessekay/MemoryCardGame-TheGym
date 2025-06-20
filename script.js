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

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledImages = shuffle([...images]);

// Create card elements
for (let i = 0; i < shuffledImages.length; i++) {
  const box = document.createElement('div');
  box.className = 'item';

  box.innerHTML = `
    <div class="front"></div>
    <div class="back">
      <img src="${shuffledImages[i]}" class="back-img" />
    </div>
  `;

  box.addEventListener('click', function () {
    if (box.classList.contains('boxOpen') || box.classList.contains('boxMatch')) return;

    box.classList.add('boxOpen');

    setTimeout(function () {
      const openBoxes = document.querySelectorAll('.boxOpen');

      if (openBoxes.length === 2) {
        const img1 = openBoxes[0].querySelector('img').src;
        const img2 = openBoxes[1].querySelector('img').src;

        if (img1 === img2) {
          openBoxes[0].classList.add('boxMatch');
          openBoxes[1].classList.add('boxMatch');
        }

        openBoxes[0].classList.remove('boxOpen');
        openBoxes[1].classList.remove('boxOpen');
      }

      if (document.querySelectorAll('.boxMatch').length === images.length) {
        alert('🎉 Congratulations, you win!');
      }
    }, 500);
  });

  document.querySelector('.game').appendChild(box);
}

// Restart button
document.querySelector('.restart').addEventListener('click', function () {
  window.location.reload();
});
