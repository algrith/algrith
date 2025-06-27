import { useEffect } from 'react';

const useScrollToElement = () => {
	const scrollToElement = (e: Event) => {
		const target = e.target as HTMLElement;

		const anchorTarget = target.closest('a[href^="#"]') as HTMLAnchorElement;
		const targetId = anchorTarget?.getAttribute('href') || target?.dataset?.scrollTo;

		if (!targetId) return;
		e.preventDefault();
		
		const targetElement = document.querySelector(targetId) as HTMLElement;
		if (!targetElement) return;

		scroll({
			top: targetElement.offsetTop,
			behavior: 'smooth'
		});
	};

  useEffect(() => {
		document.addEventListener('click', scrollToElement, true);

		return () => {
			document.removeEventListener('click', scrollToElement, true);
		};
	}, []);
};

export default useScrollToElement;