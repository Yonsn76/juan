import gsap from 'gsap';

export function animateServices() {
  gsap.from('.service-card', {
    opacity: 0,
    y: 50,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out'
  });
}
