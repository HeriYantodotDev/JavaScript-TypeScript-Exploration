/* eslint-disable no-console */
const object1 = {
  name: 'Jenny',
  age: 39,
};

const object2 = object1;

const object3 = {
  name: 'Jenny',
  age: 39,
};

//checking whether they are the same objects or not

console.log(object1 === object2); //true
console.log(object1 === object3); //false
console.log(object2 === object3); //false

//Now let's change the value in the `object3`

object2.name = 'Andy';

console.log(object1.name); // 'Andy'
console.log(object2.name); // 'Andy'