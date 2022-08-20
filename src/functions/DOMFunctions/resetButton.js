import { initialLoad } from '../game';

// removes both gameboards and player names
// makes reset button invisible and start button visible
function resetButtonFunctionality() {
  document.querySelector('.wrapper').remove();
  initialLoad();
}

const bindResetButton = () => {
  document
    .querySelector('#resetBtn')
    .addEventListener('click', resetButtonFunctionality);
};

export { bindResetButton };
