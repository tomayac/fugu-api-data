# Project Fugu&nbsp;🐡 API Data

This repo contains raw data for Project Fugu&nbsp;🐡 APIs. The data is available in two formats: `pattern.js` and `pattern.mjs`.

## Data origin

The raw data in this repository comes from a [Google spreadsheet](https://docs.google.com/spreadsheets/d/1ndxh6sl0fSOLHFlMdSiLPqmGPMDVJqkJFYnQ0Hsmhwo/edit?usp=sharing)
that is published as a [JSON file](https://spreadsheets.google.com/feeds/cells/1ndxh6sl0fSOLHFlMdSiLPqmGPMDVJqkJFYnQ0Hsmhwo/2/public/full?alt=json).
The `index.js` script fetches this data, prettifies it, and saves it locally in a module and in a no-module variant.

## Obtaining fresh data

You can trigger the data fetch process described above by running the `start` script:

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

Each API contains an object with the following properties:

- `regEx`: A regular expression that you can use to detect the API in source code when you do static source code analysis.
- `where`: The resource type where the regular expression needs to match in order to be valid. Either `"JavaScript"` or `"Web App Manifest"`.
- `supported`: A function that returns a promise that resolves with `true`, `false`, or `undefined`, depdendent on whether the API is supported or not (`undefined` means no feature detection method exists).
- `featureDetection`: The source code of the feature detection method, so you can use it in an `eval()` for example. 

## License

Apache 2.0.
