const Generator = require("yeoman-generator");
const yosay = require("yosay");
const chalk = require("chalk");

module.exports = class extends Generator {
    initialzing(){
        this.composeWith(require.resolve("generator-npm-init/app"), {
            license: "MIT",
            author: "Marino",
            main: "src/app.js",
            "skip-test": true,
            "skip-repo": true,
            "skip-keywords": true,
            scripts: {
                start: "node .",
                dev: "nodemon ."
            }
        });

        this.composeWith(require.resolve("generator-git-init"));
    }

    prompting(){
        this.log(yosay(
            `Welcome to ${chalk.blueBright("Marino's Generator")} - we'll guide you through a prompt on setting up a working ${chalk.yellowBright("express")} app!`
        ));

        let prompts = [
            {
                type: "confirm",
                name: "viewEngine",
                message: "Would you like to use EJS as a view engine?",
                default: false
            }
        ];

        return this.prompt(prompts).then((props) => {
            this.props = props;
        });
    }

    writing(){
        if(this.props.viewEngine === true){
            this.fs.copy(
                this.templatePath("ejs/**"),
                this.destinationRoot(),
                {
                    globOptions: {
                        dot: true
                    }
                }
            )
        }else {
            this.fs.copy(
                this.templatePath("static/**"),
                this.destinationRoot(),
                {
                    globOptions: {
                        dot: true
                    }
                }
            )
        }
    }

    install(){
        if(this.props.viewEngine === true){
            this.npmInstall([
                "express",
                "node-fetch",
                "dotenv",
                "chalk",
                "cors",
                "ejs"
            ]);

            this.installDependencies({
                bower: false
            });
        }else {
            this.npmInstall([
                "express",
                "node-fetch",
                "dotenv",
                "chalk",
                "cors"
            ]);

            this.installDependencies({
                bower: false
            });
        }
    }
};