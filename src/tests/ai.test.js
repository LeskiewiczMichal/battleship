import * as AI from '../functions/AI';
import * as game from '../functions/game';
import { Player } from '../functions/player';
import { shipPlacementHelpers } from '../functions/AIHelpers';
import {
  mockRandomForEach,
  mockRandom,
  resetMockRandom,
} from 'jest-mock-random';

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe('randomShipPlacement', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('placing ships randomly mocked horizontal', () => {
    const computerPlayer = Player('computer');
    jest.spyOn(shipPlacementHelpers, 'randomizeShipPosition').mockReturnValue('horizontal');
    jest
      .spyOn(shipPlacementHelpers, 'getRandomCoords')
      .mockReturnValueOnce([0, 1, 2, 3])
      .mockReturnValueOnce([10, 11, 12])
      .mockReturnValueOnce([20, 21, 22])
      .mockReturnValueOnce([30, 31])
      .mockReturnValueOnce([40, 41])
      .mockReturnValueOnce([50, 51])
      .mockReturnValueOnce([60])
      .mockReturnValueOnce([70])
      .mockReturnValueOnce([80])
      .mockReturnValueOnce([90]);
    AI.randomShipPlacement(computerPlayer.gameboard);
    const expectedArray = [
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
    ];

    expect(computerPlayer.gameboard.getGameboard()).toEqual(expectedArray);
  });

  test('placing ships randomly mocked vertical', () => {
    const computerPlayer = Player('computer');
    jest.spyOn(shipPlacementHelpers, 'randomizeShipPosition').mockReturnValue('vertical');
    jest
      .spyOn(shipPlacementHelpers, 'getRandomCoords')
      .mockReturnValueOnce([0, 10, 20, 30])
      .mockReturnValueOnce([35, 45, 55])
      .mockReturnValueOnce([49, 59, 69])
      .mockReturnValueOnce([65, 75])
      .mockReturnValueOnce([79, 89])
      .mockReturnValueOnce([4, 14])
      .mockReturnValueOnce([92])
      .mockReturnValueOnce([73])
      .mockReturnValueOnce([82])
      .mockReturnValueOnce([99]);
    AI.randomShipPlacement(computerPlayer.gameboard);
    const expectedArray = [
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: false, isShot: false, shipSunk: false },
      { hasShip: true, isShot: false, shipSunk: false },
    ];
    expect(computerPlayer.gameboard.getGameboard()).toEqual(expectedArray);
  });
});

describe('helpers', () => {
  test('checkifcoordshaveship return expected value horizontal', () => {
    game.gameInit();
    const computerGameboard = game.getComputer().gameboard;
    computerGameboard.placeNewShip([3, 4]);
    const shipLength = 3;
    const firstCoord = 1;
    const shipPosition = 'horizontal';
    expect(shipPlacementHelpers.checkIfCoordsHaveShip(firstCoord, computerGameboard, shipLength, shipPosition)).toEqual(true);
  });

  test('checkifcoordshaveship return expected value vertical', () => {
    game.gameInit();
    const computerGameboard = game.getComputer().gameboard;
    computerGameboard.placeNewShip([30, 40]);
    const shipLength = 4;
    const firstCoord = 20;
    const shipPosition = 'vertical';
    expect(shipPlacementHelpers.checkIfCoordsHaveShip(firstCoord, computerGameboard, shipLength, shipPosition)).toEqual(true);
  });
});
