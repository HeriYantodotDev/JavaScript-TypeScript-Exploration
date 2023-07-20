# JavaScript Engine

![Engine Ilustration](../__img__/engine-icon-png-12.jpg)

You may have heard of the V8 engine, which is created by Google. It's one example of a JavaScript engine. Think of it as a powerful brain for JavaScript that Google built. The V8 engine understands and executes JavaScript code super fast, allowing websites and applications to run smoothly. 

A JavaScript engine is like a super-smart interpreter that understands and runs JavaScript code. It's like a language translator for computers. When you write JavaScript instructions, the engine reads and understands them. It tells your machine what to do step by step, like solving math problems, remembering important information, and making things happen on the screen. 

Here's a list of JavaScript engine: [link](https://en.wikipedia.org/wiki/List_of_ECMAScript_engines).

# Interpreters and Compilers

## Interpreters and Compilers Quick Definition

Imagine you have a special friend who only speaks a different language; let's call it "Computerese." This friend can understand and follow instructions only if given in Computerese. You, on the other hand, only speak English. So, how can you communicate with your computer friend?

That's where `interpreters` and `compilers` come in. They help translate your instructions in English into Computerese, so your computer friend can understand and execute them.

An **interpreter** is like having a translator who listens to you speak English and immediately translates it into Computerese, sentence by sentence, as you go. It takes your instructions line by line and carries them out step by step. If there's an error in one line, the interpreter will stop and tell you about it, but it will try to execute the rest of the code.

On the other hand, a **compiler** works differently. It's more like having a language teacher who takes your entire English instruction book and translates it all into Computerese. The result is a compiled program that your computer friend can understand and execute. Unlike an interpreter, the compiler doesn't execute the code line by line. It first checks the whole program for errors and then creates the translated version.

Once the code is translated, whether, by an interpreter or a compiler, your computer friend can finally understand and follow the instructions, performing the tasks you asked.

In summary, an interpreter translates your instructions from English to Computerese on the spot, line by line. Conversely, a compiler translates your entire instruction book into Computerese before your computer friend can understand and execute it. Both interpreters and compilers help bridge the gap between human languages, like English, and the language that computers understand, like Computerese.

## Interpreters and Compilers in JavaScript

Now let's talk about how interpreters and compilers work in Javascript with a real-world example: the V8 engine. 

The V8 engine, developed by Google, is a high-performance JavaScript engine used in popular web browsers like Google Chrome. It combines both an interpreter and a compiler to achieve optimal performance called **JIT Compiler**. Here's a simplified overview of how V8 works:

- Parsing and AST Generation:
  V8 starts by parsing the JavaScript source code, building an Abstract Syntax Tree (AST) representation. The AST represents the structure and semantics of the code.

- Ignition (Interpreter):
  V8's interpreter component, called Ignition, takes the AST and interprets the code. It converts the AST nodes into bytecode and executes them directly. The interpreter allows for fast startup and early execution of the code.

- Profiling and Optimization:
  While executing the code, V8 collects profiling information about the code's behavior, such as types of variables, frequently executed paths, and hot functions. This data is used to guide optimization decisions.

- TurboFan (Compiler):
  Based on the profiling data, V8's TurboFan compiler identifies "hot" functions that are executed frequently or take significant execution time. It then compiles these functions into highly optimized machine code.

- Inline Caching and Hidden Classes:
  To improve performance, V8 uses techniques like inline caching and hidden classes. Inline caching optimizes property access by caching the location of properties, while hidden classes minimize the cost of dynamically adding or changing properties.

- Deoptimization:
  Suppose assumptions made during optimization are invalidated (e.g., due to a change in the program flow or type). In that case, V8 performs deoptimization, which involves returning to the slower interpreter and recompiling the code.

By combining interpretation for fast startup and profiling-based compilation for optimized execution, V8 balances speed and efficiency.

It's important to note that the details of how JavaScript engines work can vary across implementations, and the example provided here is a simplified overview.

## Comparison with other languages

Here's a quick and simplified comparison within languages in terms of intrepeters and compilers: 

- JavaScript:
  - Interpreters: JavaScript code is typically executed by interpreters, which read and interpret each statement one at a time. They convert the code into machine instructions or bytecode and execute it immediately. Popular JavaScript engines like V8 also use a Just-in-Time (JIT) compiler to dynamically compile and optimize frequently executed code. However **it depends on the implementation**! Like I mentioned above V8 use both.
  - Example: V8 engine in Google Chrome.
- Python:
  - Interpreters: Python is often executed by interpreters. The interpreter reads the Python source code line by line, converts it into bytecode, and executes it. The bytecode is stored in .pyc files to speed up subsequent executions.
  - Example: CPython, the default Python interpreter.

- Java:
  - Compilers: Java code is compiled ahead of time into bytecode using a Java compiler. The bytecode is platform-independent and can be executed on any machine with a Java Virtual Machine (JVM). The JVM then interprets the bytecode or uses a Just-in-Time (JIT) compiler to optimize and compile the bytecode into machine code.
  - Example: Oracle's HotSpot JVM.
- Ruby:
  - Interpreters: Ruby code is often executed by interpreters, which read and interpret the code line by line. They convert the code into an abstract syntax tree (AST) and execute it. Some Ruby implementations also incorporate Just-in-Time (JIT) compilation for performance improvements.
  - Example: Matz's Ruby Interpreter (MRI) or Ruby MRI.

It's important to note that these are generalizations, and different implementations or versions of these languages may use a combination of techniques. For example, JavaScript engines like V8 use a mix of interpretation and compilation, and some Python implementations like PyPy incorporate a Just-in-Time (JIT) compiler.

## Tips: Writing code that is optimized for interpreters and compilers

Be careful when using these keywords: 
- `eval()`
- `arguments`
- `for...in` => use `Object.keys()`
- `with`
- `delete`

Other things that we have to consider is: 
1.  Inline Caching
    Here's the example : [inclineCaching.ts](../sampleCode/src/basics/inlineCaching.ts)
2.  Hidden Classes
    Here's the example : [hiddenClasses.ts](../sampleCode//src//basics/hiddenClasses.ts)

We should write codes that are predictable not only for humans but also optimal for the machines.
