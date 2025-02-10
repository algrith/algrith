const useToggleNavbar = () => {
  const getSelectors = () => {
    const overlay = document.querySelector('#overlay') as HTMLElement;
    const navbar = document.querySelector('#nav-menu') as HTMLElement;
    return { overlay, navbar };
  };

  const openNavbar = () => {
    const { overlay, navbar } = getSelectors();

    if (navbar.className.includes('closed')) {
      overlay.classList.remove('closed');
      navbar.classList.remove('closed');
      overlay.classList.add('open');
      navbar.classList.add('open');
    }
  };
  
  const closeNavbar = () => {
    const { overlay, navbar } = getSelectors();
    if (navbar.className.includes('open')) {
      overlay.classList.remove('open');
      overlay.classList.add('closed');
      navbar.classList.remove('open');
      navbar.classList.add('closed');
    }
  };

  return { closeNavbar, openNavbar };
};

export default useToggleNavbar;