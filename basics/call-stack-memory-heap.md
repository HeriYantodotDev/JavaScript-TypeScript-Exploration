# Call Stack and Memory Heap in JavaScript

In JavaScript, the call stack and memory heap are two essential components of the runtime environment. They work together to manage the execution of code and store data during program execution.

# Memory Heap

Whenever we create a variable in JavaScript, it allocates memory for a certain value. 

You may often hear that a variable is like a cup that contains a value. In JavaScript, that's not the case. In JavaScript, we can imagine a variable like a wire that is connected to a specific value.

In JavaScript, variables are not assigned values directly; instead, they reference values stored in memory. When you set a value to a variable, you create a reference to the memory location where the value is stored.

This concept becomes more evident when dealing with objects and complex data types. When you assign an object to a variable, the variable references the memory location where the object's data is stored. Multiple variables can point to the same object, creating numerous references to the same underlying data.

That's quite abstract, but let me give an example. Please take a look at the variable declarations below: 

```
const object1 = {
  name: 'Jenny',
  age: 39,
};

const object2 = object1;

const object3 = {
  name: 'Jenny',
  age: 39,
}
```

As you can see above, all objects literally contain the same value, which is an object with two properties: `name` and `age`, and all have the same value. 

However, `object1` and `object2` are the same, but `object3` is different. 

Take a look at the graph below: 

```
Memory Heap:

         ┌────────────────────┐
obj1 --> │   Object: {        │
         │     name: 'Jenny', │
         │     age: 39        │
         │   }                │
         └────────────────────┘
                ▲
                │
                │
obj2 ───────────┘
                
                
         ┌────────────────────┐
obj3 --> │   Object: {        │
         │     name: 'Jenny', │
         │     age: 39        │
         │   }                │
         └────────────────────┘
```
If you found that this is not very clear the best way to understand is through the code: 

( You can run the code and see how it works here: [memoryHeap.ts](../sampleCode/src/basics/memoryHeap.ts) )

```
const object1 = {
  name: 'Jenny',
  age: 39,
};

const object2 = object1;

const object3 = {
  name: 'Jenny',
  age: 39,
}

//checking whether they are the same objects or not

console.log(object1 === object2); //true
console.log(object1 === object3); //false
console.log(object2 === object3); //false
```

Now let's see how this is in action. Let's change the value in `object2`, and let's see what happens: 

```
object2.name = 'Andy';

console.log(object1.name); // 'Andy'
console.log(object2.name); // 'Andy'
```

As you can see above that the value in the variable `object1` has also changed. This happens because both variable `object1` and `object2` refers to the same object.

# Call Stack

In JavaScript, the call stack is a data structure that keeps track of the execution context of a program. It operates on the Last-In-First-Out (LIFO) principle, meaning that the last function pushed onto the stack is the first one to be popped off.

The call stack is used to manage the flow of execution in a program. Whenever a function is called, a new frame representing that function's execution context is created and pushed onto the call stack. This frame contains information such as function arguments, local variables, and the return address, which determines where the program should continue after the function completes.

Let's consider an example to illustrate the call stack in JavaScript:
[callStack.ts](../sampleCode/src/basics/callStack.ts)

```
function multiply(a: number, b: number): number {
  console.log('This is multiply');
  return a * b
}

function square(n: number): number {
  console.log('This is square');
  return multiply(n, n);
}

function printSquare(x: number): number{
  console.log('This is printSquare')
  return square(x);
}

console.log(printSquare(5));

/* Result:
This is printSquare
This is square
This is multiply
25
*/
```

the above example, we have three functions: multiply(), square(), and printSquare(). The printSquare() function calls square(), which in turn calls multiply().

As the program executes, the call stack will look like this:

```
┌─────────────────┐
│   printSquare   │
├─────────────────┤
│     square      │
├─────────────────┤
│    multiply     │
├─────────────────┤
│     global      │
└─────────────────┘
```

or like this : 

```
printSquare()
  └── square()
       └── multiply()
           └── global
```

Note: global refers to **Global Execution Context** which is the bottom function on the call stack. This is the function that was created when the JavaScript engine started executing the code.

Now let's break it down, however I'm going to draw it upside-down so it's really look like a stack: 

- Initially, the `printSquare()` function is pushed onto the call stack. 
  ```
  ┌─────────────────┐
  │   printSquare   │
  ┤_________________|
  ```
- Then, wehen `printSquare()` calls `square()` , a new frame for `square` is pushed on top of the stack.  
  ```
  ┌─────────────────┐
  │   square        │
  ┤_________________|
  ┌─────────────────┐
  │   printSquare   │
  ┤_________________|
  ```
- Similarly when `square` calls `multiply()`, a frame for `multiply()` is added to the stack
  ```
  ┌─────────────────┐
  │   multiply      │
  ┤_________________|
  ┌─────────────────┐
  │   square        │
  ┤_________________|
  ┌─────────────────┐
  │   printSquare   │
  ┤_________________|
  ```
- Once `multiply()` completes its execution, its farme is popped off the stack
  ```
  ┌─────────────────┐
  │   square        │
  ┤_________________|
  ┌─────────────────┐
  │   printSquare   │
  ┤_________________|
  ```
- Next, `square()` completes and is popped off as well. 
  ```
  ┌─────────────────┐
  │   printSquare   │
  ┤_________________|
  ```
- Finally, when `printSquare()` finished executing, its frame is removed from the stack, and the call stack become empty. 
  ```
  empty
  ```


# Stack OverFlow

A stack overflow occurs when the call stack exceeds its maximum size. This can happen due to excessive function recursion or deeply nested function calls that consume more stack space than is available. When a stack overflow occurs, it means that the call stack has become too large, and the browser or JavaScript engine can't allocate more memory for the call stack, resulting in a runtime error.

Take a look at this function : 
```
function recursiveFunction() {
  recursiveFunction(); // This call to itself will cause the stack to grow indefinitely
}

recursiveFunction();

```
In the example above, the recursiveFunction calls itself without any termination condition, leading to an infinite loop of function calls. As a result, the call stack will keep growing until it reaches its maximum size, at which point a "Maximum call stack size exceeded" error, commonly known as a stack overflow error, will be thrown.

To avoid stack overflow errors, it's essential to ensure that recursive functions have proper termination conditions, limiting the number of recursive calls and avoiding deep nesting of functions whenever possible. If you encounter a stack overflow error, it usually indicates a flaw in the logic of your code, and you should review your recursive functions or function calls to identify and fix the issue.

# Garbage Collection

In JavaScript, being a "garbage collected language" means that it has an automatic memory management system that handles the allocation and deallocation of memory for objects in your code. This feature allows developers to focus on writing code without explicitly managing memory, making it easier to work with compared to languages that require manual memory management.

Being a garbage collected language provides several advantages, including:

- Ease of Use: Developers don't need to manually allocate and deallocate memory for objects, reducing the likelihood of memory-related bugs and making it easier to write code.
- Preventing Memory Leaks: The garbage collector automatically identifies and removes unreachable objects, preventing memory leaks and ensuring efficient memory usage.

However, it's essential to note that garbage collection is not entirely without overhead. The process of garbage collection itself consumes some computational resources, and there can be occasional pauses in the program's execution when the garbage collector runs. Modern JavaScript engines use sophisticated algorithms to optimize garbage collection and minimize its impact on performance.

Overall, the garbage collection mechanism in JavaScript is a significant advantage, allowing developers to focus on building applications without having to worry about low-level memory management.

# Memory Leaks

[memoryLeaks.ts](../sampleCode/src/basics/memoryLeaks.ts)

If you run this code on NodeJS: 

```
const list = [];

for (let i=1; i > 0; i ++) {
  list.push(i);
}
```

You'll get this error : 
```
#
# Fatal error in , line 0
# Fatal JavaScript invalid size error 169220804
#
#
#
#FailureMessage Object: 0x7ffe1343ea40
 1: 0xbe67b1  [node]
 2: 0x1e4d6a4 V8_Fatal(char const*, ...) [node]
 3: 0xf00158  [node]
 4: 0x10af622  [node]
 5: 0x10af8e2  [node]
 6: 0x12beb8b v8::internal::Runtime_GrowArrayElements(int, unsigned long*, v8::internal::Isolate*) [node]
 7: 0x16fb6f9  [node]
Trace/breakpoint trap
```

Basically, in the code above we fill in the memory with unlimited data and the garbage collection is not yet working since we're still using the variable. 

There are three common memory leaks: 
- Global Variables
- Event Listeners
- `setInterval` function

Remember: Memory is limited. We have to be conscious of the resources that we use. 
