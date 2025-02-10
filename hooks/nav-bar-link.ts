import { useEffect } from 'react';

const useNavBarLinks = () => {
  const hideActivePageLink = () => {
    const headerLinks = document.querySelectorAll('#navbar-links a');
    const pathname = window.location.pathname;
    const route = pathname.split('/').pop();

    headerLinks.forEach((link) => {
      const linkElement = link as HTMLAnchorElement;
      const href = linkElement.href.split('/').pop();
      if (href === route) {
        linkElement.style.display = 'none';
      }
    })
  };

  useEffect(() => {
    hideActivePageLink();
  }, []);
};

export default useNavBarLinks;