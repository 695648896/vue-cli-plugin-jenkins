
module.exports = (api, opts, rootOpts) => {

    const packageJsonPath = api.resolve("package.json");
    const { dependencies, name, author } = require(packageJsonPath);
    if (!dependencies) {
        throw Error(
            `Could not find any dependencies declared in ${packageJsonPath}.`
        );
    }
    const appName = name || "appName";
    const appAuthor = author || "author";
    const company = opts.company || 'company'
    const npmName = `${company.slice(0,2)}-npm`
    const npmRegistery = `https://app.${company}.com/nexus/repository/${npmName}/`
    const namespace = appName

    api.render('./template', {
        appName,
        namespace,
        author: appAuthor,
        company,
        npmRegistery
    })
    api.afterInvoke(() => {
        const fs = require("fs");
        fs.rename(`./rancherdefault.yaml`, `./${appName}.yaml`, (err) => {
            if (err) throw err;
            console.log('Rename complete!');
        })
    })

    let scripts = {
        "deploy": "./deploy.sh ",
        "build:docker": "vue-cli-service serve --mode docker"
    }
    const os = require('os');
    if (os.type() == 'Windows_NT') {
        //windows
        scripts["deploy"] = "bash ./deploy.sh"
    } else if (os.type() == 'Darwin') {
        //mac
        scripts["deploy"] = "./deploy.sh"
    } else if (os.type() == 'Linux') {
        //Linux
        scripts["deploy"] = "./deploy.sh"
    } else {
        //不支持提示
        throw new Error("未知平台，暂不支持")
    }
    api.extendPackage({
        scripts
    });

};
