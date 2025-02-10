import { useEffect } from 'react';

const useScrollToElement = () => {
	const scrollToElement = () => {
		const scrollSelectors = document.querySelectorAll('[href^="#"]');

		scrollSelectors.forEach((selector) => {
			selector.addEventListener('click', (e) => {
				e.preventDefault();

				const target = e.target as HTMLElement;
				const href = target.getAttribute('href') as string;
				const targetElement = document.querySelector(href) as HTMLElement;
				let offsetTop = 0;
				
				if (!targetElement) return;

				offsetTop = targetElement.offsetTop;

				scroll({ behavior: 'smooth', top: offsetTop });
			});
		});
	};

  useEffect(() => {
		scrollToElement();
	}, []);
};

export default useScrollToElement;