const loader = document.getElementById('loader');

function onLoad(isActive, minDelay = 100) {
  isActive
  ? loader.classList.add('active_loader')
  : setTimeout(() => loader.classList.remove('active_loader'), minDelay);
}

export default onLoad;
