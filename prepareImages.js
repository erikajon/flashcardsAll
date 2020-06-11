// this is a util to help generate
// require all file for flashcards images

const fs = require('fs');

const files = fs
  .readdirSync('./assets/images/cards')
  .filter(
    (x) => x.includes('png') && !x.includes('2x.png') && !x.includes('3x.png'),
  );

const ex =
  '{\n' +
  files
    .map((x) => `"${x.split('.png')[0]}": require("./${x}"),`)
    .join('\n') +
  '}';

const res = 'export default ' + ex;
fs.writeFileSync('./assets/images/cards/index.js', res);
