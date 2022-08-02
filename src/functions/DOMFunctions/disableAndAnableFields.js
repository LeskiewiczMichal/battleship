// makes fields unclickable by adding fade class in css witch has pointer-events: none;
const disableFields = (player) => {
  const buttons = document.querySelector(
    `[data-belongs-to="${player}"]`
  ).childNodes;
  buttons.forEach((field) => {
    field.classList.add('fade');
  });
};

// makes fields clickable by removing fade class in css witch has pointer-events: none;
const enableFields = (player) => {
  const buttons = document.querySelector(
    `[data-belongs-to="${player}"]`
  ).childNodes;
  buttons.forEach((field) => {
    field.classList.remove('fade');
  });
};

export { disableFields, enableFields };
