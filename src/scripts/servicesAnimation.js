import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function animateServices() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.service-card').forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      x: card.classList.contains('reverse') ? -60 : 60,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
}
