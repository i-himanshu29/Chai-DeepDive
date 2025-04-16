# Wrapper function parameters

export -> shorthand for module exports , initially points the same object
require -> a function that imports modules
module -> represent the current module
__filename -> absolute path of current file 
__dirname -> absolute path of current directory


## To test
- to test common.js
- add "type":"commonjs" in package.json

## Run through
- common.js
- module.js(node .\module.js)

## If u want to test Live Binding 
- change the type to commonjs
-Live bindings is a concept introduced in ES modules. 
- It means that when the exporting module changes a value, the change will be visible from the importer side. 
- This is not the case for CommonJS modules. Module exports are copied in CommonJS.