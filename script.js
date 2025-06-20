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