#!/usr/bin/env node

const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

let cmd = args._[0] || "help";

if(args.version || args.v){
    cmd = "version";
}

if(args.help || args.h){
    cmd = "help";
}
switch(cmd){
    case "compile":
        require("./cmd/Compile")(args);
        break;
    case "version":
        require("./cmd/Version")(args);
        break;
    case "help":
        require("./cmd/Help")(args);
        break;
    default:
        console.error(`"${cmd}" is not a valid command!`);
        break;
}