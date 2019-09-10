const Generator = require("yeoman-generator");
const _ = require("lodash");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("libraryname", { type: String, required: true });
  }
  initializing() {}
  async prompting() {
    this.log(
      yosay(
        `Welcome to the ${chalk.yellow("Lerna Typescript React")} generator`
      )
    );
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "author name",
        default: "WW"
      },
      {
        type: "input",
        name: "description",
        message: "project description",
        default: "an example Monorepo React Typescript component library"
      }
    ]);
  }
  configuring() {}
  default() {}
  writing() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        libraryname: _.kebabCase(this.options.libraryname),
        author: this.answers.name,
        description: this.answers.description
      }
    );
    this.fs.copy(
      this.templatePath("yarn.lock"),
      this.destinationPath("yarn.lock")
    );
    this.fs.copy(this.templatePath(".npmrc"), this.destinationPath(".npmrc"));
    this.fs.copy(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(
      this.templatePath(".prettierrc"),
      this.destinationPath(".prettierrc")
    );
    this.fs.copy(
      this.templatePath(".stylelintrc"),
      this.destinationPath(".stylelintrc")
    );
    this.fs.copy(
      this.templatePath(".storybook/*"),
      this.destinationPath(".storybook")
    );
    this.fs.copy(
      this.templatePath("packages/*"),
      this.destinationPath("packages")
    );
    this.fs.copy(
      this.templatePath("jest.config.js"),
      this.destinationPath("jest.config.js")
    );
    this.fs.copy(
      this.templatePath("lerna.json"),
      this.destinationPath("lerna.json")
    );
    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
    this.fs.copy(
      this.templatePath("tslint.json"),
      this.destinationPath("tslint.json")
    );
  }
  conflicts() {}
  install() {
    this.yarnInstall();
  }
  end() {}
  custom() {}
};
