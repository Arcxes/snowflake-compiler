const winstaller = require("electron-winstaller");
const path = require("path");

var outputDirectory;
function getInstallerConfig(settings){
    console.log("Creating Windows Installer");
    const rootPath = path.join("./");
    const outPath = path.join(rootPath, settings.out);
    const packageDirectory = path.join(outPath, (settings.name + "-win32-ia32/"));
    outputDirectory = path.join(outPath, "installers/windows");

    return winstaller.createWindowsInstaller({
        appDirectory: packageDirectory,
        outputDirectory: outputDirectory,
        exe: (settings.name + ".exe"),
        name: settings.name,
        setupExe: (settings.installerName + ".exe"),
        setupIcon: settings.icon,
        noMsi: true

    });
}

module.exports = function(args){
    try{
        getInstallerConfig(args).then(function(){
            console.log(`Application was compiled successfully to "${outputDirectory}"`);
        },function(error){
            console.error(error);
        });
    }catch(error){
        console.error(error);
    }
}