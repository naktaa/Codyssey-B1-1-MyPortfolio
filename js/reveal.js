const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

// 제목과 카드 단위로 관찰해 작은 화면에서도 기준 비율에 도달하도록 합니다.
const REVEAL_THRESHOLD = 0.2;

export const initScrollReveal = () => {
  // 기본 상태는 표시이며, 애니메이션을 사용할 때만 숨김 상태로 준비합니다.
  if (reducedMotionMedia.matches || !('IntersectionObserver' in window)) return;

  const revealElements = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= REVEAL_THRESHOLD) {
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: REVEAL_THRESHOLD });

  revealElements.forEach((element) => {
    element.classList.add('reveal-pending');
    observer.observe(element);
  });
};
