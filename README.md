# Project Fugu&nbsp;🐡 API Data

This repo contains raw data for Project Fugu&nbsp;🐡 APIs. The data is available
in two formats: `pattern.js` and `pattern.mjs`.

## Data origin

The raw data in this repository comes from a
[Google spreadsheet](https://docs.google.com/spreadsheets/d/1ndxh6sl0fSOLHFlMdSiLPqmGPMDVJqkJFYnQ0Hsmhwo/edit?usp=sharing)
that is published as a
[JSON file](https://sheets.googleapis.com/v4/spreadsheets/1ndxh6sl0fSOLHFlMdSiLPqmGPMDVJqkJFYnQ0Hsmhwo/values/Sheet2?alt=json&key=AIzaSyCkROWBarEOJ9hQJggyrlUFulOFA4h6AW0).
The `index.js` script fetches this data, prettifies it, and saves it locally in
a module and in a no-module variant.

## Obtaining fresh data

You can trigger the data fetch process described above by running the `start`
script:

```bash
npm start
```

## Data usage

- For the module version:

  ```js
  import patterns from './patterns.mjs';

  console.log(patterns.WebBluetooth);
  /*
  {
    regEx: /navigator\.bluetooth\.requestDevice\s*\(/g,
    where: 'JavaScript',
    supported: (async () => 'bluetooth' in navigator)(),
    featureDetection: `(async () => 'bluetooth' in navigator)()`,
  }
  */
  ```

- For the no-module version (for example to use it in a service worker):
  ```js
  importScripts('patterns.js');
  console.log(patterns.WebBluetooth);
  /*
  {
    regEx: /navigator\.bluetooth\.requestDevice\s*\(/g,
    where: 'JavaScript',
    supported: (async () => 'bluetooth' in navigator)(),
    featureDetection: `(async () => 'bluetooth' in navigator)()`,
  }
  */
  ```

## Data format

Each API is represented as an object with the following properties:

- `regEx`: A regular expression that you can use to detect the API of interest
  in source code when you do static source code analysis.
- `where`: The resource type where the regular expression needs to match in
  order to be valid. Either `"JavaScript"` or `"Web App Manifest"`.
- `supported`: A function that returns a promise that resolves with `true`,
  `false`, or `undefined`, dependent on whether the API is supported or not
  (`undefined` means no feature detection method exists).
- `featureDetection`: The source code of the feature detection method, so you
  can use it in an `eval()` for example.

## Depending projects

This data is used in the following projects:

- The
  [Capabilities report](https://almanac.httparchive.org/en/2020/capabilities) of
  the [HTTP Almanac](https://almanac.httparchive.org/) in the file
  [`custom_metrics/fugu-apis.js`](https://github.com/HTTPArchive/legacy.httparchive.org/blob/master/custom_metrics/fugu-apis.js).
- The
  [Project Fugu&nbsp;🐡 API Detector](https://github.com/tomayac/project-fugu-api-detector)
  browser extension in the files
  [`patternsFunc.js`](https://github.com/tomayac/project-fugu-api-detector/blob/main/patternsFunc.js#:~:text=import%20patterns%20from%20'.%2Fpatterns.mjs'%3B)
  and
  [`background.js`](<https://github.com/tomayac/project-fugu-api-detector/blob/main/background.js#:~:text=importscripts(%5B'patterns.js'%5D)%3B>).

## License

Apache 2.0.
