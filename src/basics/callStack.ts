/* eslint-disable no-console */
function multiply(a: number, b: number): number {
  console.log('This is multiply');
  return a * b;
}

function square(n: number): number {
  console.log('This is square');
  return multiply(n, n);
}

function printSquare(x: number): number{
  console.log('This is printSquare');
  return square(x);
}

console.log(printSquare(5));

/*
This is printSquare
This is square
This is multiply
25
*/