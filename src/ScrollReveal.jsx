import { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
  children,
  baseOpacity = 0,
  enableBlur = true,
  baseRotation = 3,
  blurStrength = 8,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If it comes into view, show it. If it leaves view, hide it so it can animate again!
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      // Triggers when 10% of the card is visible on screen
      { threshold: 0.1 } 
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => { if (elementRef.current) observer.unobserve(elementRef.current); };
  }, []);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : baseOpacity,
        filter: enableBlur ? (isVisible ? 'blur(0px)' : `blur(${blurStrength}px)`) : 'none',
        transform: isVisible ? 'translateY(0px) rotate(0deg)' : `translateY(50px) rotate(${baseRotation}deg)`,
        /* Faster transition so it feels responsive when scrolling fast */
        transition: 'opacity 0.6s ease-out, filter 0.6s ease-out, transform 0.6s cubic-bezier(0.17, 0.88, 0.32, 1.27)',
        willChange: 'opacity, filter, transform',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;