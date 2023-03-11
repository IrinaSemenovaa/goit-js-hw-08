import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  const currentTime = data.seconds; // отримали поточний час

  localStorage.setItem(LOCALSTORAGE_KEY, currentTime); // зберегли час в локальне сховище
}

// встановили час загруження відео послі перезавантаження сторінки
document.addEventListener('DOMContentLoaded', function () {
  const videoTime = localStorage.getItem(LOCALSTORAGE_KEY);

  if (!videoTime) {
    return;
  }
  player.setCurrentTime(videoTime);
});
