# generator-lerna-typescript-react

#### [Yeoman] Generator for scaffolding a repository **([lerna-typescript-react])** and individual packages for building re-usable component libraries with React and Typescript. We use [Lerna] which is a deployment tool for serverless monorepos that optimize the workflow around multi-package repositories with Git and NPM.

[yeoman]: https://yeoman.io/
[lerna-typescript-react]: https://github.com/nreochWW/lerna-typescript-react
[lerna]: https://github.com/lerna/lerna

# Instructions for generating the parent repository

These instructions start after the repo has been cloned and linked.\
_Note: In the future this will be installed from a private NPM registry_

Install yeoman

```sh
$ yarn global add yo
```

Create the directory for your project and cd into it

```sh
$ mkdir monorepo-test-example
$ cd monorepo-test-example
```

Generate your project with yoeman using generator-lerna-typescript-react\
Provide a name that is the camel case version of your directory name

```sh
$ yo lerna-typescript-react monorepoTestExample
```

Optionally you can provide your library name and description\
Or you can leave the default values

```sh
$ ? author name (WW)
$ ? project description (an example Monorepo React Typescript component library)
```

Yeoman will then scaffold out the project files and directories and install the dependencies.
Below is the file and directory structure you will see in your newly created repo

```
monorepo-test-example/
  .storybook/
    config.js
    tsconfig.json
    webpack.config.js
  .jest/
    setupTests.ts
  node_modules/
  packages/
    README.md
  .gitignore
  .npmrc
  .prettierrc
  .stylelintrc
  index.html
  jest.config.js
  lerna.json
  package.json
  README.md
  tsconfig.json
  tslint.json
  yarn.lock
```

The packages directory is where your different components will be generated

Create a local and remote Git repository to push your changes too commit

```sh
$ git init
$ git add .
$ git commit -m "initial commit"
$ git remote add origin git@github.com:nreochWW/monorepo-test-example.git
$ git push origin master
```

# Instructions for generating packages

Generate your individual packages with Yeoman using the generator-lerna-typescript-react:package sub generator\
You will need to provide a name and description for you package

```sh
$ yo lerna-typescript-react:package
$ ? package name TestExampleOne
$ ? package description This is the first package I have created
```

Yeoman will then scaffold out the package files and directories
Below is the file and directory structure you will see in your newly created package

```
monorepo-test-example/
  ...
  packages/
    TestExampleOne/
      __tests__/
      legacy/
        index.tsx
        tsconfig.json
        webpack.config.js
      src/
        index.tsx
      stories/
        TestExampleOne.stories.tsx
      .npmignore
      package.json
      README.md
      tsconfig.json
    README.md
```

The main component code will be located in **src/index.tsx**\
This is a simple Hello World React and Typescript component to start building with

```
import * as React from "react";
import styled from "styled-components";

export interface TestExampleOneProps {
  compiler: string;
  framework: string;
}

const Wrapper = styled.div`
  border: 1px solid blue;
  padding: 10px;
`;

const TestExampleOne = (props: TestExampleOneProps) => (
  <Wrapper>
    <h1>
      Hello World from {props.compiler} and {props.framework}!
    </h1>
  </Wrapper>
);

export default TestExampleOne;
```

# Run formatter, tests and linting

These commands will run on all the packages you have created\
We need to run prettier first to format the code so the linter does not fail

```sh
$ yarn prettier
$ yarn lint
$ yarn test
```

There is a simple snapshot test in the \***\*tests\*\*** directory\
Note: Remember to run _yarn test -u_ to update snapshots

```
import * as React from "react";
import { shallow } from "enzyme";
import TestExampleOne from "../src/index";

describe("TestExampleOne package tests", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(
      <TestExampleOne compiler="TypeScript" framework="React" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
```

# Instructions for WORKFLOW 1 - Build and publish to a private NPM registry

Run the typescript compiler on your packages

```sh
$ yarn tsc
```

This will look through all your packages and run typescript on the tsc files\
Build files will be placed into the lib directory ready for publishing to NPM

Push your new package to Github locally and remotely

```sh
$ git add .
$ git commit -m "Generated TestExampleOne package"
$ git push origin master
```

Publish your package to your NPM registry\
Note: you will need to set the registry url for your NPM config

```sh
$ lerna publish
```

This will start up the Lerna publish CLI and provide you with options for publishing

# Instructions for WORKFLOW 2 - Build for legacy external applications

We need a legacy workflow as there is a requirement to be able to build
and load components into legacy applications that are not React based on the client

```sh
$ yarn legacy
```

This command will go through all the different packages and build and compile
the code using webpack and outputting Javascript suitable for legacy applications not using React.
The output of this command will create a package.js file in the **legacy/dist** directory

# Instructions to Share Packages with other Packages

With lerna you can share different components very easily which is a powerful feature\
We can extend different features and build on them by sharing components

Create a second package

```sh
$ yo lerna-typescript-react:package
$ ? package name TestExampleTwo
$ ? package description This is the second package I have created
```

You will now have a directory TestExampleTwo sitting along side TestExampleOne

Go into the package.json file of TestExampleTwo and add your TestExampleOne package as a dependency\
this is how your package.json should now look

```
{
  "name": "test-example-two",
  "description": "This is the second package I have created",
  "version": "0.0.0",
  "main": "lib/index.js",
  "license": "MIT",
  "scripts": {
    "tsc": "tsc",
    "legacy": "webpack --config legacy/webpack.config.js"
  },
  "dependencies": {
    "test-example-one": "^0.0.1"
  }
}
```

Go into src/index.tsc in TestExampleTwo directory and import and display TestExampleOne

```
import styled from "styled-components";
import TestExampleOne from "test-example-one";

export interface TestExampleTwoProps {
  compiler: string;
  framework: string;
}

const Wrapper = styled.div`
  border: 1px solid blue;
  padding: 10px;
`;

const TestExampleTwo = (props: TestExampleTwoProps) => (
  <Wrapper>
    <h1>
      Hello World from {props.compiler} and {props.framework}!
    </h1>
    <TestExampleOne compiler="TypeScript" framework="React" />
  </Wrapper>
);

export default TestExampleTwo;
```

Lerna can bootstrap our packages which means they will symlink the packages for us behind the scenes

```sh
$ yarn bootstrap
```

Run the typescript compiler

```sh
$ yarn tsc
```

Commit your new changes to your remote github

```sh
$ git add .
$ git commit -m "Created TestExampleTwo package and linked with TestExampleOne"
$ git push origin master
```

Publish your packages to NPM registry

```sh
lerna publish
```

This will start up the Lerna publish CLI and provide you with options for publishing\
Now your component TestExampleTwo will also pull in TestExampleOne as a dependency

# Develop your components in Storybook

```sh
$ yarn storybook
```

This will open up a page in your browser showing your TestExampleOne component

If you have shared packages with other packages you will need to add an alias\
to the storybook webpack configuration

```
config.resolve.alias = {
  "test-example-one": path.resolve(__dirname, "../packages/TestExampleOne/src/index")
};
```

This way storybook will pull your component from the **src/index.tsx** instead of node_modules\
which do not get bundled by webpack.

# TODO

Continuous Integration Setup with CircleCI\
Need to pubish this Generator to a private NPM registry
