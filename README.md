# generator-lerna-typescript-react

#### [Yeoman] Generator for scaffolding a repository **([lerna-typescript-react])** and individual packages for building re-usable component libraries with React and Typescript. We use [Lerna] which is a deployment tool for serverless monorepos that optimizes the workflow around multi-package repositories with Git and NPM.

[yeoman]: https://yeoman.io/
[lerna-typescript-react]: https://github.com/nreochWW/lerna-typescript-react
[lerna]: https://github.com/lerna/lerna

# Instructions for creating the parent repository

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

The packages directory is where you differe components will be generated\
We will go through the rest of the files and there purpose later
