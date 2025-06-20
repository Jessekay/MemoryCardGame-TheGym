const images = [
  "img/apple.png", "img/apple.png",
  "img/banana.png", "img/banana.png",
  "img/grape.png", "img/grape.png",
  "img/orange.png", "img/orange.png",
  "img/cherry.png", "img/cherry.png",
  "img/kiwi.png", "img/kiwi.png",
  "img/pear.png", "img/pear.png",
  "img/pineapple.png", "img/pineapple.png"
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const shuffledImages = shuffle([...images]);

for (let i = 0; i < shuffledImages.length; i++) {
  let box = document.createElement('div');
  box.className = 'item';

  box.innerHTML = `
    <div class="front"></div>
    <div class="back">
      <img src="${shuffledImages[i]}" class="back-img" />
    </div>
  `;

  box.onclick = function () {
    this.classList.toggle('boxOpen');

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
  };

  document.querySelector('.game').appendChild(box);
}

document.querySelector('.restart').onclick = function () {
  window.location.reload();
};