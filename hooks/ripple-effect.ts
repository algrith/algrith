import { MouseEvent, useEffect } from 'react';

const useRippleEffect = () => {
  const createRippleEffect = () => {
    document.querySelectorAll('.ripple-node').forEach((button) => {
      const buttonElem = button as HTMLButtonElement;
      
      buttonElem.addEventListener('mousedown', (e) => {
        const target = e.target as HTMLElement;
        
        let ripple = target.querySelector('.ripple');
        const rect = target.getBoundingClientRect();
        if (ripple) ripple.remove();
        
        ripple = document.createElement('span');
        ripple.className = 'ripple';

        const newRipple = ripple as HTMLElement;

        newRipple.style.height = newRipple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(newRipple);
        
        const left = e.pageX - rect.left - newRipple.offsetWidth / 2 - document.documentElement.scrollLeft;
        const top = e.pageY - rect.top - newRipple.offsetHeight / 2 - document.documentElement.scrollTop;
        newRipple.style.left = left + 'px';
        newRipple.style.top = top + 'px';
        return false;
      });  
    });  
  };

  useEffect(() => {
    createRippleEffect();    
  }, []);
};

export default useRippleEffect;