import { Cell } from '../src/cell';

describe('Cell', () => {
  it('should render cell', () => {
    const mockCanvas = document.createElement('canvas');
    document.body.append(mockCanvas);
    console.log(document.body);
    const cell = Cell.create(mockCanvas, 1, 1, 32, 32);
    expect(cell).toBeDefined();
  });
});
