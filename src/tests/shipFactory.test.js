import { Ship } from '../functions/shipFactory';


test('getHealth', () => {
    const obj = Ship(2);
    const result = obj.getHealth();
    expect(result).toBe(2)
});

test('hit', () => {
    const obj = Ship(2);
    expect(obj.getHealth()).toBe(2);
    obj.hit();
    expect(obj.getHealth()).toBe(1)
})

test('isSunk', () => {
    const obj = Ship(1);
    expect(obj.getSunkStatus()).toBe(false);
    obj.hit();
    expect(obj.getSunkStatus()).toBe(true)
})