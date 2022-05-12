const list = document.querySelectorAll('.list')
function activeLink() {
  list.forEach((item) => item.classList.remove('active'))

  this.classList.add('active')
}

//play button

list.forEach((item) => item.addEventListener('click', activeLink))

let btn = document.getElementsByClassName('player-btn')[0],
  icon = document.getElementsByClassName('svg-play')[0];

let audio = document.getElementById('track'),
  isPlaying = false;


  btn.addEventListener('click', function (e) {
    e.target.classList.toggle('active');

    if (!icon.classList.contains('to-pause')) {
      icon.classList.add('to-pause');
      icon.classList.remove('to-play');
    } else {
      icon.classList.remove('to-pause');
      icon.classList.add('to-play');
    }

    if (isPlaying) {
      audio.pause();
      isPlaying = false;
    } else {
      audio.play();
      isPlaying = true;
    }

  });
