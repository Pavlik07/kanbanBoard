import { getTimeSinceCreation } from '../../utils/dateUtils';

describe('getTimeSinceCreation', () => {
  it('should return the correct time since creation', () => {
    const createdAt = '2023-01-01T00:00:00Z';
    const result = getTimeSinceCreation(createdAt);
    expect(result).toMatch(/\d+ days ago/);
  });
});