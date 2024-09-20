﻿# typescript_frontend

I have provided the code for the below functionality:

write a function that inputs a string containing a TypeScript type, and outputs an object literal representing the type.
Requirements: 
● must have a function called visit
● must have a function called convertToObject that calls the specified visit function Unset
● must not use CommonJS in your source files (e.g. require())
● must use the official version of https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
  ○ e.g. import * as ts from "typescript";
● we do not expect the convertToObject function to support all kinds of types, but at a bare minimum should work with the example input in the below code block (i.e. type Button…)

After writing the code in .ts file, using_ npx tsc_  to compile the TypeScript code to JavaScript before executing it. Then, using node index.js command executed the code and yielded 

o/p:

{ button: { variants: [ 'solid', 'text' ] } }

i/p:
(provided as part of code as a sample example case)

const typeString = `type Button = {
  variant: "solid" | "text";
};`;



