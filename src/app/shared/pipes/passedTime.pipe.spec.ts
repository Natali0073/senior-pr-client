import { PassedTimePipe } from "./passedTime.pipe";

describe('PassedTimePipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new PassedTimePipe();

  it('transforms current date to "Just now"', () => {
    const currentdate = new Date();
    const datetime = `${currentdate.getFullYear()}-${(currentdate.getMonth() + 1)}-${currentdate.getDate()} ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    expect(pipe.transform(datetime)).toBe('Just now');
  });

  it('transforms current date to "60m"', () => {
    const currentdate = new Date();
    const datetime = `${currentdate.getFullYear()}-${(currentdate.getMonth() + 1)}-${currentdate.getDate()} ${currentdate.getHours() - 1}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    expect(pipe.transform(datetime)).toBe('60m');
  });

  it('transforms current date to "2h"', () => {
    const currentdate = new Date();
    const datetime = `${currentdate.getFullYear()}-${(currentdate.getMonth() + 1)}-${currentdate.getDate()} ${currentdate.getHours() - 2}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    expect(pipe.transform(datetime)).toBe('2h');
  });

  it('transforms current date to "24h"', () => {
    const currentdate = new Date();
    const datetime = `${currentdate.getFullYear()}-${(currentdate.getMonth() + 1)}-${currentdate.getDate() - 1} ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    expect(pipe.transform(datetime)).toBe('24h');
  });

});