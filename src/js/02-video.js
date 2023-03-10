import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  const currentTime = data.seconds; // отримали поточний час

  localStorage.setItem('videoTime', currentTime); // зберегли час в локальне сховище
}

// встановили час загруження відео послі перезавантаження сторінки
window.onload = function () {
  const videoTime = localStorage.getItem('videoTime');

  if (!localStorage.getItem('videoTime')) {
    return;
  }
  player.setCurrentTime(videoTime);
};
