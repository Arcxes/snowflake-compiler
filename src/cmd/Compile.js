const packager = require("electron-packager");
const readline = require("readline-sync");
const fs = require("fs");
const path = require("path");

const pkg = getPackage();

const supported = {
    "windows": "0",
    "macos": "1",
    "linux": "2"
}

function getPackage(){
    try{
        const pkg = require(path.join(process.cwd(),"package.json"));
        return pkg;
    }catch(error){
        return "";
    }
}

function runPackager(settings,platform){
    packager(settings).then(function(appPaths,error){
        if(error != null){
            console.error(error);
        }else{
            console.log(`Application was packaged successfully to "${appPaths}"`);
            packageAsInstaller(settings,platform);
        }
    });
}

function packageAsInstaller(settings,platform){
    switch(platform){
        case "windows":
            require("./installers/WindowsInstaller")(settings);
            break;
        case "macos":
            require("./installers/MacOSInstaller")(settings);
            break;
        default:
            console.log(`${platform} does not have installer support!`);
            break;
    }
}

function generateCompilerSettings(data,platform){
    if(supported[platform] == undefined){
        console.error(`"${platform}" is not supported!`);
        process.exit();
    }
    console.log(" ");
    console.log(`Compiler Settings: ${platform}`);
    data[platform] = {};
    data[platform].dir = readline.question("Path to Main: ");
    data[platform].name = readline.question("Application Name: ");
    data[platform].installerName =  readline.question("Installer Name: ");
    data[platform].icon = readline.question("Path To Application Icon: ");
    data[platform].out = readline.question("Output Directory: ");

    switch(platform){
        case "windows":
            data[platform].platform = "win32";
            data[platform].arch = "ia32";
            data[platform].win32metadata = {};
            data[platform].win32metadata.CompanyName = pkg.author;
            data[platform].win32metadata.FileDescription = pkg.description;
            break;
        case "macos":
            data[platform].platform = "darwin";
            data[platform].arch = "x64";
            data[platform].appBundleId = readline.question("App-Bundle-Id: ");
            data[platform].appCategoryType = readline.question("App-Catagory-Type: ");
            let sign = readline.question("Do you want to sign the app? (y/n)");
            if(sign == "yes" || sign == "y"){
                data[platform].osxSign =  true;
            }else{
                data[platform].osxSign = false;
            }
            break;
        case "linux":
            data[platform].platform = "linux";
            data[platform].arch = "all";
            break;
        default:
            console.error(`"${platform}" is not supported!`);
            break;
    }
    createCompilerSettings(data,platform);
}

function createCompilerSettings(data,platform){
    console.log(`Creating Compiler Settings for ${platform}`);
    let json = JSON.stringify(data);
    fs.writeFileSync("compiler-settings.json",json);
    console.log(`Finished Creating Compiler Settings for ${platform}`);
    compile(data,platform);
}

function compile(data,platform){
    let compilerOptions = {};
    compilerOptions.dir = data[platform].dir;
    compilerOptions.name = data[platform].name;
    compilerOptions.installerName = data[platform].installerName;
    compilerOptions.out = data[platform].out;
    compilerOptions.platform = data[platform].platform;
    compilerOptions.arch = data[platform].arch;
    compilerOptions.icon = data[platform].icon;
    compilerOptions.overwrite = true;
    compilerOptions.prune = true;
    compilerOptions.asar = true;

    switch(platform){
        case "windows":
            compilerOptions.win32metadata = data[platform].win32metadata;
            break;
        case "macos":
            compilerOptions.appBundleId = data[platform].appBundleId;
            compilerOptions.appCategoryType = data[platform].appCategoryType;
            compilerOptions.osxSign = data[platform].osxSign;
            break;
        case "linux":
            break;
        default:
            console.error(`"${platform}" is not supported!`);
            break;
    }
    runPackager(compilerOptions,platform);
}

module.exports = function(args){
    try{
        const platform = args.platform || args.p || args.platforms;

        if(supported[platform] == undefined){
            console.error(platform + " is not supported!");
            process.exit();
        }

        var data;
        try{
            let rawData = fs.readFileSync("compiler-settings.json");
            data = JSON.parse(rawData);
            if(data[platform] != null){
                compile(data,platform);
            }else{
                generateCompilerSettings(data,platform);
            }
        }catch(error){
            data = {};
            generateCompilerSettings(data,platform);
        }
    }catch(error){
        console.error(error);
    }
}