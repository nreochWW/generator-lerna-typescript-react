const Generator = require("yeoman-generator");
const _ = require("lodash");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {}
  async prompting() {
    this.log(
      yosay(
        `Welcome to the ${chalk.yellow(
          "Lerna Typescript React Package"
        )} sub generator`
      )
    );
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "package name",
        required: true
      },
      {
        type: "input",
        name: "description",
        message: "package description",
        required: true
      }
    ]);
  }
  configuring() {}
  default() {}
  writing() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath(`packages/${this.answers.name}/package.json`),
      {
        name: _.kebabCase(this.answers.name),
        description: this.answers.description
      }
    );
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath(`packages/${this.answers.name}/README.md`),
      {
        name: _.kebabCase(this.answers.name),
        description: this.answers.description
      }
    );
    this.fs.copyTpl(
      this.templatePath("__tests__/*"),
      this.destinationPath(`packages/${this.answers.name}/__tests__`),
      {
        name: this.answers.name
      }
    );
    this.fs.copyTpl(
      this.templatePath("legacy/*"),
      this.destinationPath(`packages/${this.answers.name}/legacy`),
      {
        name: this.answers.name
      }
    );
    this.fs.copyTpl(
      this.templatePath("src/*"),
      this.destinationPath(`packages/${this.answers.name}/src`),
      {
        name: this.answers.name
      }
    );
    this.fs.copyTpl(
      this.templatePath(`stories/Placeholder.stories.tsx`),
      this.destinationPath(
        `packages/${this.answers.name}/stories/${this.answers.name}.stories.tsx`
      ),
      {
        name: this.answers.name
      }
    );
    this.fs.copy(
      this.templatePath(`.npmignore`),
      this.destinationPath(`packages/${this.answers.name}/.npmignore`)
    );
    this.fs.copy(
      this.templatePath(`tsconfig.json`),
      this.destinationPath(`packages/${this.answers.name}/tsconfig.json`)
    );
  }
  conflicts() {}
  end() {}
  custom() {}
};
