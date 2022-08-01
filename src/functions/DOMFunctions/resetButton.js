function resetButtonFunctionality() {
  document.querySelector('#boards').remove();
  document.querySelector('.namesDisplay').remove();
  document.querySelector('#startGame').click();
}

const bindResetButton = () => {
  document.querySelector('#resetBtn').addEventListener('click', resetButtonFunctionality);
};

export { bindResetButton };