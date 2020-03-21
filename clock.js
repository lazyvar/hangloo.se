/***
 Thanks https://www.cssanimation.rocks/clocks 
 ***/

const initLocalClocks = () => {
  const date = new Date;
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  const hands = [{
      hand: 'hours',
      angle: (hours * 30) + (minutes / 2)
    },
    {
      hand: 'minutes',
      angle: (minutes * 6)
    },
    {
      hand: 'seconds',
      angle: (seconds * 6)
    }
  ];

  for (let j = 0; j < hands.length; j++) {
    const elements = document.querySelectorAll('.clock-container .' + hands[j].hand);

    for (let k = 0; k < elements.length; k++) {
      elements[k].style.transform = 'rotateZ(' + hands[j].angle + 'deg)';

      if (hands[j].hand === 'minutes') {
        elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
      }
    }
  }
}

const moveSecondHands = () => {
  const containers = document.querySelectorAll('.seconds-container');

  setInterval(function() {
    for (let i = 0; i < containers.length; i++) {
      if (containers[i].angle === undefined) {
        containers[i].angle = 6;
      } else {
        containers[i].angle += 6;
      }

      containers[i].style.webkitTransform = 'rotateZ(' + containers[i].angle + 'deg)';
      containers[i].style.transform = 'rotateZ(' + containers[i].angle + 'deg)';
    }
  }, 1000);

  for (let i = 0; i < containers.length; i++) {
    const randomOffset = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

    containers[i].style.transitionDelay = '0.0' + randomOffset + 's';
  }
}

const setUpMinuteHands = () => {
  const containers = document.querySelectorAll('.minutes-container');
  const secondAngle = containers[containers.length - 1].getAttribute('data-second-angle');

  if (secondAngle > 0) {
    let delay = (((360 - secondAngle) / 6) + 0.1) * 1000;

    setTimeout(function() {
      moveMinuteHands(containers);
    }, delay);
  }
}

const moveMinuteHands = (containers) => {
  for (let i = 0; i < containers.length; i++) {
    containers[i].style.webkitTransform = 'rotateZ(6deg)';
    containers[i].style.transform = 'rotateZ(6deg)';
  }

  setInterval(function() {
    for (let i = 0; i < containers.length; i++) {
      if (containers[i].angle === undefined) {
        containers[i].angle = 12;
      } else {
        containers[i].angle += 6;
      }
      containers[i].style.webkitTransform = 'rotateZ(' + containers[i].angle + 'deg)';
      containers[i].style.transform = 'rotateZ(' + containers[i].angle + 'deg)';
    }
  }, 60000);
}

initLocalClocks();
moveSecondHands();
setUpMinuteHands();

