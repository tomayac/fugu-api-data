import fs from 'fs/promises';
import fetch from 'node-fetch';

const SPREADSHEET_URL =
  'https://sheets.googleapis.com/v4/spreadsheets/1ndxh6sl0fSOLHFlMdSiLPqmGPMDVJqkJFYnQ0Hsmhwo/values/Sheet2?alt=json&key=AIzaSyCkROWBarEOJ9hQJggyrlUFulOFA4h6AW0';

(async () => {
  const text = `{${await fetch(SPREADSHEET_URL)
    .then((response) => response.json())
    .then((data) => data.values.map((entry) => entry).join(''))}}`;
  const patterns = `const patterns = ${text}`;
  const patternsModule = `export default ${text}`;
  fs.writeFile('./patterns.js', patterns, { encoding: 'utf-8' });
  fs.writeFile('./patterns.mjs', patternsModule, { encoding: 'utf-8' });
})();
