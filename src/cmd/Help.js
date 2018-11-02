const menus = {
    main: `
        snowflake [command] <options>
        
        compile ...... compile the application
        version ...... show the package version
        help ......... show help menu for a command`,

    compile: `
        snowflake compile <options>
        
        options:
        
        --platform, -p ...... the platform to compile for`,
}

module.exports = function(args){
    const subCmd = args._[0] === "help" ? args._[1] : args._[0];

    console.log(menus[subCmd] || menus.main);
}