import { promises as fs } from 'fs';
import { program } from 'commander';

program
  .requiredOption('-d, --directory <path>', 'directory to read')
  .parse();

const { directory } = program.opts();

const files = await fs.readdir(directory);

files.forEach((file) => {
  const variable = file.slice(0, file.lastIndexOf('.'));

  // Awesome gist that inspired most of the following:
  // https://gist.github.com/ramiabraham/ff41ba74f2b7104ecece
  const value = variable
    // Removes primary ROM codes
    .replace(/\[(a|p|b|f|T-|T+|t|h|o|J|!)\]/gi, '')
    .replace(/\((-|M\d+|U|E|UE)\)/gi, '')
    // TODO: Stripe checksums - (###)
    // Removes country codes
    .replace(/\((1|4|A|J|B|K|C|NL|E|PD|F|S|F|FC|SW|FN|U|G|UK|GR|Unk|HK|I|H|Unl)\)/gi, '')
    // Removes Nintendo Game Boy specific codes
    .replace(/\[(C|S|BF)\]/gi, '')
    // Removes Super Nintendo Entertainment System specific codes
    .replace(/\((BS|ST|NP)\)/gi, '')
    // Removes Sega Genesis specific codes
    .replace(/\((1|4|5|8)\)/gi, '')
    .replace(/\[ (\(B\) Brazil|\[c\] Checksum|\[x\] Bad Checksum|\[R-\] Countries) \]/gi, '')
    // Removes Nintendo Entertainment System specific codes
    .replace(/\[(PC10|VS)\]/gi, '');

  console.log(`${variable}=${value}`);
});
