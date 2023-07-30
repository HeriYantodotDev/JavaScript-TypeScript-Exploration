/* eslint-disable no-console */
function logSomething(text: string) {
  console.log(text);
}

logSomething('1');

setTimeout( () => {
  logSomething('2'), 2000;
});

// Uncomment below to see it runs.
// logSomething('3');

/* Result: 
1
3
2
*/