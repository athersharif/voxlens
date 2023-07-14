# VoxLens

VoxLens is a JavaScript library that improves the accessibility of online data visualizations for screen-reader users. 

This library is part of an ongoing research project being conducted at the University of Washington, led by [Ather Sharif](https://athersharif.me). Citations and links to our published work can be found at the end of this document.

[![GitHub license](https://img.shields.io/badge/license-BSD-blue.svg)](https://github.com/athersharif/voxlens/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/voxlens.svg?style=flat)](https://www.npmjs.com/package/voxlens) [![CircleCI](https://circleci.com/gh/athersharif/voxlens/tree/main.svg?style=svg)](https://circleci.com/gh/athersharif/voxlens/?branch=main)

## Installation

```npm i voxlens --save```

## Integration

### Limitations 

Currently, VoxLens supports:

- Visualization Libraries: `D3`, `Google Charts`, and `ChartJS`. 
- Data Types: 2-D, single-series and geosptial data. Multi-series line graphs are also supported. Sample data sets are provided under `examples/src/data`.
- Browser: Chrome

### Configuration Options

|Option|Required/Optional|Description|
|--- |--- |--- |
|x|Required|The key name(s) of the indepedent variable(s) in the dataset. Can be an array for multi-series data.|
|y|Required|The key name of the depedent variable in the dataset.|
|title|Required|The title of the visualization. Should be kept concise.|
|chartType|Required|The chart type of the visualization. Must be one of `bar`, `scatter`, `line`, `map`, `multiseries`. Defaults to `bar`.|
|dataModule|Required|Data module for geospatial data. Only required when chartType is `map`. Must be one of `state`, `country`.|
|xLabel|Optional|The label for x. Defaults to the value of x. Used to contruct sentences for the screen-reader users. If your dataset has key names that are not well named or reflect the data column appropriately, please consider setting this value.|
|yLabel|Optional|The label for y. Defaults to the value of y. Used to contruct sentences for the screen-reader users. If your dataset has key names that are not well named or reflect the data column appropriately, please consider setting this value.|
|vx_metadata|Optional|Metadata for relaying uncertainty in the data to the user. Possible values are specified below.|
|vx_metadata.min|Optional|The minimum value in the data series, if the data is an average value|
|vx_metadata.max|Optional|The maximum value in the data series, if the data is an average value|
|vx_metadata.stdev|Optional|The standard deviation of the data series, if the data is an average value|
|vx_metadata.isAverage|Optional|The boolean flag `true` or `false` if the data is an average value|
|debug|Optional|Debug options for developers. Could be a boolean flag or an object for granular control over debugging tools. If set to `true`, all tools are activated|
|debug.instructions|Optional|Outputs instructions to use the emulator tool. Could be a boolean flag or an object for granular control. Defaults to `true`|
|debug.instructions.onlyMain|Optional|Outputs only the main instructions (less verbose). Defaults to `false`|
|debug.hideFeedbackCollector|Optional|Hides feedback collector. Defaults to `false`|
|debug.contrastChecker|Optional|Enables or disables contrast checker. Defaults to `false`|
|debug.responses.onlyText|Optional|Enables or disables audio output from emulators. Defaults to `false`|
|feedbackCollector.scales|Optional|Range of Likert scale from 1 to _N_. Defaults to `5`|
|feedbackCollector.email|Required|Email to send the feedback to. Required if feedback collector is activated.|

### Sample Implementation

```
import voxlens from 'voxlens';

const container = document.getElementById('chart');

const data = [
  { key: 'key1', value: 'value1' },
  { key: 'key2', value: 'value2' },
  { key: 'key3', value: 'value3' }    
];

const voxlensOptions = {
  x: 'key',
  y: 'value',
  title: 'This is the title of my visualization',
  xLabel: 'My-X-Label',
  yLabel: 'My-Y-Label',
  debug: true,
};
```

#### **For D3:** 

Add this line to the appropriate nested element (see [this](https://github.com/athersharif/voxlens/blob/main/example/src/helpers/createD3.js#L72) for example):

```
.call((d) => voxlens('d3', d, data, voxlensOptions));
```

#### **For Google Charts:**

(see [this](https://github.com/athersharif/voxlens/blob/main/example/src/helpers/createGoogleCharts.js#L54) for example)

```
voxlens('googlecharts', chart, data, voxlensOptions);
```

#### **For ChartJS:**

(see [this](https://github.com/athersharif/voxlens/blob/main/example/src/helpers/createChartJS.js#L76) for example)

```
voxlens('chartjs', container, data, voxlensOptions);
```

### Examples

Examples are provided under the `example` [folder](https://github.com/athersharif/voxlens/tree/main/example). Run `npm start` from within the `example` folder. A sample React app will run on `localhost:3000`. URLs for each library are as follows:

- *ChartJS*: localhost:3000/voxlens/playground/chartjs
- *D3*: localhost:3000/voxlens/playground/d3
- *Google Charts*: localhost:3000/voxlens/playground/googlecharts

Additionally, you can interact with the examples at: [https://athersharif.github.io/voxlens/playground/#/](https://athersharif.github.io/voxlens/playground/#/)

### Interaction Modes

Modifier Keys: Ctrl + Shift (Windows) and Option (MacOS)

|Mode|Activation Key|Description|
|--- |--- |--- |
|Question-and-Answer|Modifier Keys + A or Modifier Keys + 1|Enables users to interact with the visualization through voice commands using their microphone|
|Summary|Modifier Keys + S or Modifier Keys + 2|Provides a holistic summary of the data contained in the visualization
|Sonification|Modifier Keys + M or Modifier Keys + 3|Plays a sonified version of the data using the [`sonifier`](https://www.npmjs.com/package/sonifier) library|
|Instructions|Modifier Keys + I or Modifier Keys + 4|Provides the user with instructions on how to interact with VoxLens|
|Pause|Modifier Keys + P or Modifier Keys + 5|Pauses the output from VoxLens. Also works with sonification|

### Testing VoxLens

In order to fully interact with the VoxLens, basic knowledge of screen reader usage is required. A microphone is also needed. For creators not familiar with screen readers, debugging tools are available to test their visualizations for accessibility (see configuration options above). Additionally, console logs are also in place to show the output of the commands. For example, activating the question-and-answer mode will make a beep sound, after which a command such as "what is the maximum" or "tell me the average" can be said. The response for non-screen-reader users will appear in the console log (can be accessed via Chrome Developer Tools).

## Dev Tools

### Lint

[ESLint](https://github.com/eslint/eslint) is used for linting.

Command: `make lint` / `npm run lint`

### Tests

[Mocha](https://mochajs.org/) and [Enzyme](https://airbnb.io/enzyme/) are used as testing frameworks and for coverage. Adding/modifying tests for the proposed changes and ensuring that the coverage is at 100% is crucial. To run tests in watch mode:

`npm run test`

To generate coverage report:

`npm run test:coverage`

### Docs

[JSDoc](https://github.com/jsdoc/jsdoc) is used for documentation. It's important to follow the guidelines for JSDoc to add informative and descriptive comments and documentation to the code. Documentation can be found [here](https://athersharif.github.io/voxlens/documentation/).

Command: `make docs` / `npm run docs`

### Code formatter

[Prettier](https://github.com/prettier/prettier) is used for code formatting.

Command: `make prettier` / `npm run prettier`

### Build

[Babel](https://babeljs.io/) is used for build purposes. Runs lint, tests, code formatter and docs as well.

Command: `make build` / `npm run prepublish`

## Contributing

Pull requests are welcome and appreciated. Contributing guidelines can be found [here](https://github.com/athersharif/voxlens/blob/main/CONTRIBUTING.md).

## License

Licensed under BSD. Can be found [here](https://github.com/athersharif/voxlens/blob/main/LICENSE).

## Citations

All publications and our work on the accessibility of online data visualizations can be found [here](https://athersharif.me/projects/VOX).
