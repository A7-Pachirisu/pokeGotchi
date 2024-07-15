const TopBtn = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
  const mainContent = document.getElementById('main-content');

  if (mainContent && mainContent.scrollTop !== 0) {
    mainContent.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

export default TopBtn;
