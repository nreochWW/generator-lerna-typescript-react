# generator-lerna-typescript-react

#### [Yeoman] Generator for scaffolding a repository **([lerna-typescript-react])** and individual packages for building re-usable component libraries with React and Typescript. We use [Lerna] which is a deployment tool for serverless monorepos that optimizes the workflow around multi-package repositories with Git and NPM.

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

Create the directory for you project and cd into it

```sh
$ mkdir monorepo-test-example
$ cd monorepo-test-example
```

Generate your project with yoeman using generator-lerna-typescript-react\
Provide a name that is the camel case version of you directory name

```sh
$ yo lerna-typescript-react monorepoTestExample
```

Optionally you can provide you library name and description\
Or you can leave the default values

```sh
$ ? author name (WW)
$ ? project description (an example Monorepo React Typescript component library)
```

Yeoman will then scaffold out the project files and directories and install the dependencies
Below is the files and directory structure you will see in your newly created repo

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

The packages directory is where you different components will be generated\
We will go through the rest of the files and there purpose later

Initialize Git repo

```sh
$ git init
```

# Instructions for generating packages

Generate your individual packages with yoeman using the generator-lerna-typescript-react:package sub generator\
You will need to provide a name and description for you package

```sh
$ yo lerna-typescript-react:package
$ ? package name TestExampleOne
$ ? package description This is the first package I have created
```

Yeoman will then scaffold out the package files and directories
Below is the files and directory structure you will see in your newly created package

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

There will for now just be simple snapshot test in the \***\*tests\*\*** directory\
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

# WORKFLOW 1 - Build and publish to a private NPM registry

Run the typescript compiler on your packages

```sh
$ yarn tsc
```

This will look through all your packages and run typescript on the tsc files\
Build files will be placed into the lib directory ready for publishing to NPM
