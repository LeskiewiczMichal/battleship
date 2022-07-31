import { Player } from '../functions/player';

test('Player return an object', () => {
    const player = Player();
    expect(player).toMatchObject(expect.any(Object))
})

