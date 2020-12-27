/***
 Thank you https://www.cssanimation.rocks/clocks 
 ***/

const init = () => {
  const date = new Date;
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const secondsAngle = (seconds * 6);

  document.querySelector('.hours').style.transform   = `rotateZ(${(hours * 30) + (minutes / 2)}deg)`;
  document.querySelector('.minutes').style.transform = `rotateZ(${minutes * 6}deg)`;
  document.querySelector('.seconds').style.transform = `rotateZ(${secondsAngle}deg)`;
  document.querySelector('.minutes-container').setAttribute('data-second-angle', secondsAngle);
}

const setupSecondHand = () => {
  const secondsContainer = document.querySelector('.seconds-container');
  const randomOffset = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

  secondsContainer.style.transitionDelay = '0.0' + randomOffset + 's';

  setInterval(moveSecondHand, 1000);
}

const moveSecondHand = () => {
  const secondsContainer = document.querySelector('.seconds-container');

  if (secondsContainer.angle === undefined) {
    secondsContainer.angle = 6;
  } else {
    secondsContainer.angle += 6;
  }

  secondsContainer.style.webkitTransform = `rotateZ(${secondsContainer.angle}deg)`;
  secondsContainer.style.transform = `rotateZ(${secondsContainer.angle}deg)`;
}

const setupMinuteHand = () => {
  const minutesContainer = document.querySelector('.minutes-container');
  const secondAngle = minutesContainer.getAttribute('data-second-angle');
  const delay = (((360 - secondAngle) / 6) + 0.1) * 1000;

  if (secondAngle <= 0) { return }

  setTimeout(moveMinuteHand, delay);
}

const moveMinuteHand = () => {
  const minutesContainer = document.querySelector('.minutes-container');

  minutesContainer.style.webkitTransform = 'rotateZ(6deg)';
  minutesContainer.style.transform = 'rotateZ(6deg)';

  setInterval(function() {
    if (minutesContainer.angle === undefined) {
      minutesContainer.angle = 12;
    } else {
      minutesContainer.angle += 6;
    }

    minutesContainer.style.webkitTransform = `rotateZ(${minutesContainer.angle}deg)`;
    minutesContainer.style.transform = `rotateZ(${minutesContainer.angle}deg)`;
  }, 60000);
}

init();
setupSecondHand();
setupMinuteHand();
