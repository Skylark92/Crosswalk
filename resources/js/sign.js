const sign = (function () {
  let _state = false;

  const img = document.createElement('img');
  img.height = 85;

  const wrapper = document.querySelector('.msg-wrapper');
  const msg = document.querySelector('.msg-box');
  const signal = document.getElementById('sign');

  function addImage() {
    if (!img.parentNode) {
      wrapper.prepend(img);
    }
  }

  function removeImage() {
    if (img.parentNode) {
      img.remove();
    }
  }

  function updateMsg(time) {
    if (!time) return;

    const total = Math.floor(time / 10);
    const min = Math.floor(total / 60);
    const sec = total % 60;

    msg.innerText = `${min}분 ${sec}초`;
  }

  return {
    // get state() { return _state; },
    // set state(state) {
    //   _state = state;
    // },
    on: (time) => {
      img.src = 'resources/images/sign_walk.svg';
      img.width = 50;
      msg.classList.add('on');
      msg.classList.remove('off');
      signal.classList.add('on');
      signal.classList.remove('off');
      addImage();
      updateMsg(time);
    },
    off: (time) => {
      img.src = 'resources/images/sign_stand.svg';
      img.width = 36;
      msg.classList.add('off');
      msg.classList.remove('on');
      signal.classList.add('off');
      signal.classList.remove('on');
      addImage();
      updateMsg(time);
    },
    wrong: () => removeImage(),
  }
})();

export { sign };