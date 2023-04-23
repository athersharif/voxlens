# VoxLens

VoxLens is a JavaScript library that improves the accessibility of online data visualizations for screen-reader users. 

This library is part of an ongoing research project being conducted at the University of Washington, led by [Ather Sharif](https://athersharif.me). Citations and links to our published work can be found at the end of this document.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/athersharif/voxlens/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/voxlens.svg?style=flat)](https://www.npmjs.com/package/voxlens) [![CircleCI](https://circleci.com/gh/athersharif/voxlens/tree/main.svg?style=svg)](https://circleci.com/gh/athersharif/voxlens/?branch=main)

## Installation

```npm i voxlens --save```

## Integration

### Limitations 

Currently, VoxLens supports:

- Visualization Libraries: `D3`, `Google Charts`, and `ChartJS`. 
- Data Types: 2-D single-series and geosptial data. Sample data sets are provided under `examples/src/data`.
- Browser: Chrome

### Configuration Options

|Option|Required/Optional|Description|
|--- |--- |--- |
|x|Required|The key name(s) of the indepedent variable(s) in the dataset. Can be an array for multi-series data.|
|y|Required|The key name of the depedent variable in the dataset.|
|title|Required|The title of the visualization. Should be kept concise.|
|chartType|Required|The chart type of the visualization. Must be one of `bar`, `scatter`, `line`, `map`, `multiseries`.|
|dataModule|Required|Data module for geospatial data. Only required when chartType is `map`. Must be one of `state`, `country`.|
|xLabel|Optional|The label for x. Defaults to the value of x. Used to contruct sentences for the screen-reader users. If your dataset has key names that are not well named or reflect the data column appropriately, please consider setting this value.|
|yLabel|Optional|The label for y. Defaults to the value of y. Used to contruct sentences for the screen-reader users. If your dataset has key names that are not well named or reflect the data column appropriately, please consider setting this value.|

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
  yLabel: 'My-Y-Label,
};
```

#### **For D3:** 

Add this line to the appropriate nested element:

```
.call((d) => voxlens('d3', d, data, voxlensOptions));
```

#### **For Google Charts:**

```
voxlens('googlecharts', chart, data, voxlensOptions);
```

#### **For ChartJS:**

```
voxlens('chartjs', container, data, voxlensOptions);
```

### Examples

Examples are provided under the `example` folder. Run `npm start` from within the `example` folder. A sample React app will run on `localhost:3000`. URLs for each library are as follows:

- *ChartJS*: localhost:3000/voxlens/playground/chartjs
- *D3*: localhost:3000/voxlens/playground/d3
- *Google Charts*: localhost:3000/voxlens/playground/googlecharts

Additionally, you can interact with the examples at: [https://athersharif.github.io/voxlens/playground/#/](https://athersharif.github.io/voxlens/playground/#/)

### Interaction Modes

Modifier Keys: Ctrl + Shift (Windows) and Option (MacOS)

|Mode|Activation Key|Description|
|--- |--- |--- |
|Question-and-Answer|Modifier Keys + A/Modifier Keys + 1|Enables users to interact with the visualization through voice commands using their microphone|
|Summary|Modifier Keys + S/Modifier Keys + 2|Provides a holistic summary of the data contained in the visualization
|Sonification|Modifier Keys + M/Modifier Keys + 3|Plays a sonified version of the data using the [`sonifier`](https://www.npmjs.com/package/sonifier) library|
|Instructions|Modifier Keys + I/Modifier Keys + 4|Provides the user with instructions on how to interact with VoxLens|

### Testing VoxLens

In order to interact with the VoxLens, basic knowledge of screen reader usage is required, as well as a microphone. We understand that most people are not familiar with the screen readers, so we've also enabled console logs to show the output. When the screen reader reads the visualization, it also speaks out the instructions to interact with the graph, which is not presented visually to non-screen-reader users. For example, activating the question-and-answer mode will make a beep sound, after which a command such as "what is the maximum" or "tell me the average" can be said. The response for non-screen-reader users will appear in the console log (can be accessed via Chrome Developer Tools).

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

Licensed under MIT. Can be found [here](https://github.com/athersharif/voxlens/blob/main/LICENSE).

## Citations

Ather Sharif, Sanjana Shivani Chintalapati, Jacob O. Wobbrock, and Katharina Reinecke. 2021. Understanding Screen-Reader Users’ Experiences with Online Data Visualizations. In The 23rd International ACM SIGACCESS Conference on Computers and Accessibility (ASSETS '21). Association for Computing Machinery, New York, NY, USA, Article 14, 1–16.

[PDF](https://athersharif.me/documents/assets-2021-understanding-sru-experiences-online-data-viz.pdf) | [Presentation](https://www.youtube.com/watch?v=nOHcQYm9HKQ)

Ather Sharif, Olivia H. Wang, Alida T. Muongchan, Katharina Reinecke, and Jacob O. Wobbrock. 2022. VoxLens: Making Online Data Visualizations Accessible with an Interactive JavaScript Plug-In. In Proceedings of the 2022 CHI Conference on Human Factors in Computing Systems (CHI '22). Association for Computing Machinery, New York, NY, USA, Article 478, 1–19.

[PDF](https://athersharif.me/documents/chi-2022-voxlens.pdf) | [Presentation](https://www.youtube.com/watch?v=_ACIJafIRuU)

Ather Sharif, Andrew Mingwei Zhang, Anna Shih, Jacob O. Wobbrock, and Katharina Reinecke. 2022. Understanding and Improving Information Extraction From Online Geospatial Data Visualizations for Screen-Reader Users. In Proceedings of the 24th International ACM SIGACCESS Conference on Computers and Accessibility (ASSETS '22). Association for Computing Machinery, New York, NY, USA, Article 61, 1–5.

[PDF](https://athersharif.me/documents/assets-2022-voxlens-geospatial.pdf) | [Presentation](https://www.youtube.com/watch?v=_ACIJafIRuU)

Ather Sharif, Andrew M. Zhang, Katharina Reinecke, and Jacob O. Wobbrock. 2023. Understanding and Improving Drilled-Down Information Extraction from Online Data Visualizations for Screen-Reader Users. In 20th International Web for All Conference (W4A23). Association for Computing Machinery, New York, NY, USA, 18–31. 

[PDF](https://athersharif.me/documents/w4a-2023-voxlens-drilled-down.pdf) | [Presentation]()
