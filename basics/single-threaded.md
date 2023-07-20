# Single Threaded

JavaScript is often referred to as a "single-threaded" programming language because it runs in a single main thread by default. This means that JavaScript code is executed sequentially, one statement at a time, in a single continuous sequence. 

JavaScript only has one call stack.

Let's use a drive-through restaurant as an analogy to explain how JavaScript being a single-threaded language works. Imagine you are working at a drive-through restaurant where you take orders, prepare food, and serve customers. In this analogy:

- **Main Counter (Main Thread)**: You are the only person taking orders at the main counter. You can handle one order at a time, and you follow a specific sequence: take an order, process it, prepare the food, serve it, and then move on to the next order.

- **Order Queue**: As customers arrive at the drive-through, they line up at the order queue. Each car represents a task or an event in JavaScript that needs to be processed. You can only handle one car/order at a time, just like the main thread in JavaScript.

- **Asynchronous Tasks**: Some orders might take longer to prepare, such as when you need to cook a special meal or wait for fresh ingredients. Instead of making the other customers wait for that specific order to be ready, you use a little trick. You take an order, start the cooking process, and then, while the food is cooking, you can take the next order from the queue and work on it. When the food is ready, you serve it to the first customer (resolve the asynchronous task) and move on to the next one.

- **Blocking Tasks**: However, some orders might take exceptionally long to prepare, like when you run out of certain ingredients, and you have to wait for a delivery. In this case, the drive-through's main counter becomes blocked, and you can't take new orders until the blocking task is resolved. Similarly, in JavaScript, if a piece of code takes a long time to execute (e.g., a complex computation or a time-consuming I/O operation), it can block the main thread, making the application unresponsive.

- This analogy illustrates how JavaScript's single-threaded nature works with asynchronous tasks, allowing the main thread to handle multiple operations concurrently and not keep everything waiting for a long-running task to complete. As a result, user interactions in web applications can remain smooth, even while the JavaScript code is executing asynchronous operations in the background.

## JavaScript Run Time

JavaScript only has one stack and one memory heap. However, in the browser there's a JavaScript Run time and every browser has its own JavaScript RunTime. The term "non-blocking single-threaded language" is often used to describe JavaScript's concurrency model. Remember the drive-through restaurant analogy above? 

Despite being single-threaded, JavaScript is non-blocking, meaning it can handle asynchronous operations efficiently without causing the entire program to wait for them to complete. Asynchronous operations are tasks that may take some time to finish, such as making network requests or reading files. Instead of waiting for these tasks to complete before moving on to the next line of code, JavaScript can initiate the tasks and continue executing other code while waiting for the tasks to finish.

Please take a look at the graph below: 

```
         ┌───────────────────────┐
         │      Call Stack      │
         └───────────────────────┘
                │         ▲
                │         │
                │         │
                │         │
                │         │
                │         │
                │         │
                │         │
                ▼         │
     ┌───────────────────────┐
     │    Web API (e.g.,    │
     │   setTimeout(), etc. │
     └───────────────────────┘
                ▲
                │
                │
                │
                │
                │
                │
                │
                │
                │
                ▼
     ┌───────────────────────┐
     │    Callback Queue    │
     └───────────────────────┘
                ▲
                │
                │
                │
                │
                │
                │
                │
                │
                │
                ▼
     ┌───────────────────────┐
     │       Event Loop     │
     └───────────────────────┘

```

- Web API.
  - Definition: Web APIs are browser-provided interfaces that allow JavaScript code to interact with the browser's features and perform asynchronous tasks. Examples include setTimeout, fetch, XMLHttpRequest, and addEventListener.
  - How it works: When you call a Web API function, it initiates an asynchronous task (e.g., setting a timer, making an HTTP request). The Web API handles the task outside of the main JavaScript thread, preventing it from blocking other code execution.
- Callback Queue. 
  - Definition: The callback queue is a data structure that holds callback functions from completed Web API tasks or other asynchronous operations.
  - How it works: Once a Web API task is completed (e.g., the timer expires, the HTTP request receives a response), its associated callback function is placed in the callback queue. The callback queue is FIFO (First-In-First-Out), meaning the first callback added to the queue will be the first one to be processed. 
- Event Loop
  - Definition: The event loop is a core mechanism in JavaScript responsible for handling asynchronous operations and ensuring that non-blocking tasks are executed efficiently.
  - How it works: The event loop continuously checks the Call Stack to see if it's empty. When the Call Stack is empty (all synchronous tasks are completed), the event loop starts processing items in the callback queue. It takes the first callback from the queue and pushes it onto the Call Stack for execution. This process repeats as long as there are items in the callback queue. The event loop ensures that the main JavaScript thread is never idle and keeps handling asynchronous tasks and callbacks in an orderly manner.

Take a look at the code below : 
[singleThreaded.ts](../sampleCode/src/basics/singleThreaded.ts)

```
function logSomething(text: string) {
  console.log(text);
}

logSomething('1');

setTimeout( () => {
  logSomething('2'), 2000;
});

logSomething('3');

/* Result: 
1
3
2
*/
```

`setTimeout` is an asycnchorous function. It's a web API, or if you run it on NodeJS, than it's a NodeJS API. The function then will be put in the callback queue. 

`Even Loop` then will check regularly in the call stack whether it's empty or not and send the callback back to the call stack. 

This is a better visualization for how it works: [Loupe](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gcHJpbnRIZWxsbygpIHsNCiAgICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBiYXonKTsNCn0NCg0KZnVuY3Rpb24gYmF6KCkgew0KICAgIHNldFRpbWVvdXQocHJpbnRIZWxsbywgMzAwMCk7DQp9DQoNCmZ1bmN0aW9uIGJhcigpIHsNCiAgICBiYXooKTsNCn0NCg0KZnVuY3Rpb24gZm9vKCkgew0KICAgIGJhcigpOw0KfQ0KDQpmb28oKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

## JavaScript Code, Engine & Run Time

To understand more about JavaScript Code, Engine, and also Run Time, Let's use the analogy of a chef preparing a recipe in a kitchen to explain the relationship between JavaScript code, the JavaScript engine, and the JavaScript runtime:

- JavaScript Code: In our analogy, the "JavaScript code" is like a recipe written on a piece of paper. It contains the instructions for the chef to follow and create a delicious dish. Similarly, JavaScript code is a set of instructions written in a text-based format that tells the JavaScript engine what tasks to perform and how to execute them.

- JavaScript Engine: The "JavaScript engine" is like the chef in the kitchen. It is responsible for interpreting and executing the JavaScript code, just as the chef reads and follows the recipe from the piece of paper. The JavaScript engine takes the JavaScript code and processes it, executing the specified operations and calculations.

- JavaScript Runtime: The "JavaScript runtime" is like the entire kitchen setup, including all the utensils, appliances, and ingredients needed to cook the dish. It provides the environment in which the JavaScript engine (chef) can operate and execute the code (recipe). The JavaScript runtime includes various components like the Call Stack, Heap, Event Loop, Web APIs (for browser environments), and Node.js APIs (for Node.js environments).

Putting it all together:

Imagine a chef (JavaScript engine) standing in a well-equipped kitchen (JavaScript runtime) with a recipe (JavaScript code) in hand. The chef starts following the instructions step by step, using the available tools (Call Stack, Heap) and resources (Web APIs in browsers or Node.js APIs in Node.js) to prepare the dish (perform calculations, handle asynchronous tasks, etc.). The chef executes the recipe, making sure each task is completed correctly and efficiently. Throughout the process, the chef interacts with the kitchen setup, using different tools and ingredients to create a delicious meal (the final output of the JavaScript code).

In this analogy, the JavaScript engine is the core processor that executes the instructions, and the JavaScript runtime provides the necessary infrastructure and environment for the engine to operate effectively, just as a chef relies on a well-equipped kitchen to cook a delightful dish.

Another example of JavaScript Run Time is `NodeJS`. 


