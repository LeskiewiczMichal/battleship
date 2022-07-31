const Ship = (coordinates) => {
  
  let health = coordinates.length;
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

  const getCoordinates = () => coordinates
  const getHealth = () => health;
  const getSunkStatus = () => shipSunked;

  return {
    hit,
    getHealth,
    getSunkStatus,
    getCoordinates,
  };
};

export { Ship };
