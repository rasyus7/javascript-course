import {formatCurrency} from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => { /* TEST1 */
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');/* TEST2 */
  });

  it('rounds up to the nearest cent', () => {/* TEST3 */
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});