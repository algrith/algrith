import { useEffect } from 'react';

const useScrollToElement = () => {
	const scrollToElement = (e: Event) => {
		const target = e.target as HTMLElement;
		const targetId = target.dataset.scrollTo;

		if (targetId) {
			e.preventDefault();

			const targetElement = document.querySelector(`#${targetId}`) as HTMLElement;
			let offsetTop = 0;
			
			if (!targetElement) return;

			offsetTop = targetElement.offsetTop;

			scroll({ behavior: 'smooth', top: offsetTop });
		}
	};

  useEffect(() => {
		document.addEventListener('click', scrollToElement);

		return () => {
			document.removeEventListener('click', scrollToElement);
		};
	}, []);
};

export default useScrollToElement;