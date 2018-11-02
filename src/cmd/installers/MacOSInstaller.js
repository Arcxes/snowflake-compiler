const createDMG = require("electron-installer-dmg");
const path = require("path");

var outputDirectory;

function generateInstaller(settings){
    console.log("Creating MacOS Installer");
    const rootPath = path.join("./");
    const outPath = path.join(rootPath,settings.out);
    const packageDirectory = path.join(outpath, (settings.name + "-darwin-x64/"));
    outputDirectory = path.join(outPath, "installers/macos");

    createDMG({
        appPath: packageDirectory,
        out: outputDirectory,
        name: settings.name,
        icon: settings.icon,
        overwrite: true,
    },function done(error){
        if(error){
            console.error(error);
        }else{
            console.log(`Application was compiled successfully to "${outputDirectory}"`);
        }
    });
}

module.exports = function(args){
    try{
        generateInstaller(args);
    }catch(error){
        console.error(error);
    }
}