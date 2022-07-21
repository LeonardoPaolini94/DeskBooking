import { BookingNumberPipe } from './booking-number.pipe';

describe('BookingNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new BookingNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
