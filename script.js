// JavaScript
const circlePhoto = document.querySelector('.circle-photo');
const img = circlePhoto.querySelector('img');

function animateCircle() {
  img.style.transform = `rotate(${Math.random() * 360}deg)`;
  requestAnimationFrame(animateCircle);
}

animateCircle();
