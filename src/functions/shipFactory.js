const Ship = (length) => {
  let health = length;
  let shipSunked = false;

  function isSunk() {
    if (health === 0) {
      shipSunked = true;
    }
  }

  const hit = () => {
    health -= 1;
    isSunk();
  };

  const getHealth = () => health;
  const getSunkStatus = () => shipSunked;

  return {
    hit,
    getHealth,
    getSunkStatus,
  };
};

export { Ship };
