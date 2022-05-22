const list = document.querySelectorAll('.list');
let btn = document.querySelectorAll('.play--btn');
let icon = document.querySelectorAll('.svg-play');
let audio = document.querySelectorAll('#track');
let volume_progress_bar = document.querySelector('#volume_bar');
let music_progress_bar = document.querySelector('#music_bar');
let play_bar = document.querySelector('#play-music-bar');
let progress_music = document.querySelector('.progress-music');
let start_time = document.querySelector('.start-time');
let end_time = document.querySelector('.end-time');
let image_body = document.querySelectorAll('.img-body');
let song_body = document.querySelectorAll('.song-body');
let artist_body = document.querySelectorAll('.art-body');
let image_control = document.querySelector('.image-control');
let title_control = document.querySelector('.title-control');
let artist_control = document.querySelector('.artist-control');
// let image_control = document.querySelector('');
let song_playing;
let button_playing;
let volume_playing;
let xvolume;

function activeLink() {
  list.forEach((item) => item.classList.remove('active'))

  this.classList.add('active')
}

//play music
let x = 0;
for (let i = 0; i < btn.length; i++) {
  btn[i].onclick = () => {
    if (!icon[i].classList.contains('to-pause')) {
      for (let j = 0; j < btn.length; j++) {
        if (i !== j) {
          audio[j].pause();
          icon[j].classList.add('to-play');
          icon[j].classList.remove('to-pause');
          clearInterval(xvolume);
          xvolume = setInterval(Whilesongduration, 1000);
        } else {
          audio[i].play();
          icon[i].classList.remove('to-play');
          icon[i].classList.add('to-pause');
          play_bar.classList.remove('fa-play');
          play_bar.classList.add('fa-pause');
          volume_playing = audio[i];
          button_playing = icon[i];
          song_playing = audio[i];
          image_control.src = image_body[i].src;
          title_control.textContent = song_body[i].textContent;
          title_control.href = song_body[i].href;
          artist_control.textContent = artist_body[i].textContent;
          image_control.hidden = false;
          xvolume = setInterval(Whilesongduration, 1000);
        }
      }
    } else {
      audio[i].pause();
      icon[i].classList.add('to-play');
      icon[i].classList.remove('to-pause');
      play_bar.classList.add('fa-play');
      play_bar.classList.remove('fa-pause');
      clearInterval(xvolume);
      Whilesongduration()
    }
  }
}

//volume
volume_progress_bar.addEventListener('change', () => {
  song_playing.volume = volume_progress_bar.value;
  clearInterval(xvolume);
  Whilesongduration()
  xvolume = setInterval(Whilesongduration, 1000);
})

//music
progress_music.addEventListener('change', () => {
  song_playing.currentTime = progress_music.value;
  clearInterval(xvolume);
  Whilesongduration()
  xvolume = setInterval(Whilesongduration, 1000);
})

//control bar
play_bar.addEventListener('click', () => {
  if (song_playing.paused) {
    song_playing.play();
    button_playing.classList.remove('to-play');
    button_playing.classList.add('to-pause');
    play_bar.classList.remove('fa-play');
    play_bar.classList.add('fa-pause');
    volume_playing.volume = 0.1;
    xvolume = setInterval(Whilesongduration, 1000);
  }
  else {
    song_playing.pause();
    button_playing.classList.add('to-play');
    button_playing.classList.remove('to-pause');
    play_bar.classList.add('fa-play');
    play_bar.classList.remove('fa-pause');
    clearInterval(xvolume);
    xvolume = setInterval(Whilesongduration, 1000);
    Whilesongduration()
  }
})

//song dura
function Whilesongduration() {
  let Timeduration;
  let start = Math.floor(song_playing.duration / 60);
  let end = (Math.floor((song_playing.duration % 60) / 60 * 60));

  Timeduration = start + "." + end.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  end_time.textContent = Timeduration;
  music_progress_bar.max = song_playing.duration;

  start = Math.floor(song_playing.currentTime / 60);
  end = (Math.floor((song_playing.currentTime % 60) / 60 * 60));
  Timeduration = start + "." + end.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  start_time.textContent = Timeduration;
  music_progress_bar.value = song_playing.currentTime;
}

//show song control
