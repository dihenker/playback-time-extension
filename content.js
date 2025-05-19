function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

let interval = null;

function updateTimeDisplay() {
  const video = document.querySelector('video');
  const timeDisplay = document.querySelector('.ytp-time-current');
  const durationDisplay = document.querySelector('.ytp-time-duration');

  if (!video || !timeDisplay || !durationDisplay) return;

  let adjustedSpan = document.querySelector('#adjusted-time');
  const speed = video.playbackRate;

  if (speed === 1.0) {
    if (adjustedSpan) adjustedSpan.remove();
    return;
  }

  const adjustedCurrent = video.currentTime / speed;
  const adjustedDuration = video.duration / speed;
  const formatted = `[${formatTime(adjustedCurrent)} / ${formatTime(adjustedDuration)}]`;

  if (!adjustedSpan) {
    adjustedSpan = document.createElement('span');
    adjustedSpan.id = 'adjusted-time';
    adjustedSpan.style.marginLeft = '8px';
    //adjustedSpan.style.fontSize = 'smaller';
    timeDisplay.parentNode.appendChild(adjustedSpan);
  }

  adjustedSpan.textContent = formatted;
}

function startInterval() {
  if (interval) clearInterval(interval);
  interval = setInterval(updateTimeDisplay, 500);
}

function waitForPlayer() {
  const video = document.querySelector('video');
  if (video) {
    startInterval();
    video.addEventListener('ratechange', updateTimeDisplay);
  } else {
    setTimeout(waitForPlayer, 500);
  }
}

waitForPlayer();
