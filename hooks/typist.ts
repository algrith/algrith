import { useEffect } from 'react';

const useTypist = (text: string) => {
  useEffect(() => {
    const typePad = document.querySelector('.typing-pad') as HTMLElement;

    const type = (counter: number) => {
      let count: number;

      if (typePad) {
        const cursor = typePad.querySelector('.typing-pad .cursor');
        if (cursor) {
          if (counter !== text.length - 1) cursor.remove();
          if (counter == text.length - 1) {
            cursor.remove();
            return;
          }
        }

        if (counter >= text.length) {
          clearTimeout(window.typingTimeout);
          count = 0;
          return;
        } else {
          count = counter + 1;
        }

        const typePadTextColor = window.getComputedStyle(typePad).color;
        typePad.textContent = typePad.textContent + text[count];
        const cursorElement = document.createElement('span');
        cursorElement.style.borderColor = typePadTextColor;
        cursorElement.className = 'cursor';
        typePad.append(cursorElement);

        window.typingTimeout = setTimeout(() => {
          type(count);
        }, 100);
      }
    }

    if (text && typeof text === 'string') {
      clearTimeout(window.typingTimeout);
      typePad.textContent = '';
      type(-1);
    }
	}, [text]);
};

export default useTypist;