/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { explosion } from '../assets';

export const playAudio = (clip: any): any => {
  const audio = new Audio();
  audio.src = clip;

  return audio.play();
};

const prefixes = ['webkit', 'moz', 'ms', ''] as const;

function prefixedEvent(
  element: any,
  type: string,
  callback: EventListener
): void {
  for (let p = 0; p < prefixes.length; p++) {
    const eventType = prefixes[p] ? prefixes[p] + type : type.toLowerCase();
    element.addEventListener(eventType, callback, false);
  }
}

function transform(
  $e: any,
  xValue: number = 0,
  yValue: number = 0,
  scaleValue: number = 1,
  rotationValue: number = 0,
  percent: boolean = false
): void {
  const unit = percent ? '%' : 'px';
  const transfromString = `translate(${xValue}${unit}, ${yValue}${unit}) ` +
    `scale(${scaleValue}) ` +
    `rotate(${rotationValue}deg)`;

  $e.style.webkitTransform = transfromString;
  $e.style.transform = transfromString;
}

function createParticle(x: number, y: number, scale: number): any {
  const $particle = document.createElement('i');
  const $sparcle = document.createElement('i');

  $particle.className = 'particle';
  $sparcle.className = 'sparcle';

  transform($particle, x, y, scale);
  $particle.appendChild($sparcle);

  return $particle;
}

function explode($container: any): any {
  const particles: HTMLElement[] = [];

  particles.push(createParticle(0, 0, 1));
  particles.push(createParticle(50, -15, 0.4));
  particles.push(createParticle(50, -105, 0.2));
  particles.push(createParticle(-10, -60, 0.8));
  particles.push(createParticle(-10, 60, 0.4));
  particles.push(createParticle(-50, -60, 0.2));
  particles.push(createParticle(-50, -15, 0.75));
  particles.push(createParticle(-100, -15, 0.4));
  particles.push(createParticle(-100, -15, 0.2));
  particles.push(createParticle(-100, -115, 0.2));
  particles.push(createParticle(80, -15, 0.1));

  particles.forEach((particle) => {
    $container.appendChild(particle);
    prefixedEvent(particle, 'AnimationEnd', () => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          $container.removeChild(particle);
        });
      }, 100);
    });
  
    document.querySelectorAll('.container').forEach((el) => el.remove());
  });
}

function explodeGroup(x: number, y: number, trans: any): any {
  const $container = document.createElement('div');

  $container.className = 'container';
  $container.style.top = `${y}px`;
  $container.style.left = `${x}px`;

  transform($container, trans.x, trans.y, trans.scale, trans.r, true);

  explode($container);
  return $container;
}

export function sparcle(event: any): any {
  const explosions: HTMLElement[] = [];

  explosions.push(
    explodeGroup(event.pageX, event.pageY, { scale: 1, x: -50, y: -50, r: 0 }),
  );
  
  explosions.push(
    explodeGroup(event.pageX, event.pageY, {
      scale: 0.5,
      x: -30,
      y: -50,
      r: 180,
    }),
  );
  explosions.push(
    explodeGroup(event.pageX, event.pageY, {
      scale: 0.5,
      x: -50,
      y: -20,
      r: -90,
    }),
  );

  requestAnimationFrame(() => {
    playAudio(explosion);
    explosions.forEach((boum, i) => {
      setTimeout(() => {
        document.body.appendChild(boum);
      }, i * 100);
    });
  });
}
