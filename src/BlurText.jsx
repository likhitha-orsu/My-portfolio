import { useEffect, useState } from 'react';

const BlurText = ({ text, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <p 
      className={className}
      style={{
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
        transition: 'filter 0.8s ease, opacity 0.8s ease, transform 0.8s ease',
        willChange: 'filter, opacity, transform'
      }}
    >
      {text}
    </p>
  );
};

export default BlurText;