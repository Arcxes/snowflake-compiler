# SnowflakeCompiler
An HTML5 compiler to compile your HTML5 applications to native platforms

# Installation

```sh
# for use in npm scripts
npm install --save-dev snowflake-compiler

# for use from cli
npm install -g snowflake-compiler

```

# Usage
To handle the most common Squirrel.Windows events add the following to the top of your projects `main.js`.

```js
const {app} = require("electron");

if(require("snowflake-compiler")){
	app.quit();
}
```

## Compiling for Windows

```sh
snowflake compile --platform windows
```

## Compiling for MacOS

```sh
snowflake compile --platform macos
```

## Compiling for Linux

```sh
snowflake compile --platform linux
```

# Having Trouble With Our Compiler?
Contact us on our [discord](https://discord.gg/pR5tx2T) server or create a new [issue](https://github.com/Arcxes/Crest2D/issues)
