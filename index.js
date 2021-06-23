const fs = require('fs/promises');
const fetch = require('node-fetch');

const SPREADHSEET_URL =
  'https://spreadsheets.google.com/feeds/cells/1ndxh6sl0fSOLHFlMdSiLPqmGPMDVJqkJFYnQ0Hsmhwo/2/public/full?alt=json';

(async () => {
  const text = await fetch(SPREADHSEET_URL)
    .then((response) => response.json())
    .then((data) => data.feed.entry[0].content.$t);
  const patterns = `const patterns = ${text}`;
  const patternsModule = `export default ${text}`;
  fs.writeFile('./patterns.js', patterns, { encoding: 'utf-8' });
  fs.writeFile('./patterns.mjs', patternsModule, { encoding: 'utf-8' });
})();
