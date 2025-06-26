import React from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0, 
  threshold = 0.1,
  className = '' 
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  const animationClasses = {
    fadeInUp: 'animate-fadeInUp',
    fadeInLeft: 'animate-fadeInLeft',
    fadeInRight: 'animate-fadeInRight',
  };

  return (
    <div
      ref={ref}
      className={`${className} opacity-0 translate-y-8 ${
        inView ? animationClasses[animation] : ''
      }`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;