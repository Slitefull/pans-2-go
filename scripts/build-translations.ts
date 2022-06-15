// @ts-ignore
const { promises: fs } = require('fs');
const path = require('path');
const { exec } = require('child_process');
const _ = require('lodash');


const ROOT_DIR = './src';
const REQUESTED_FILE = 'translation.csv';

async function searchFiles(dir: string, seekingFile: string): Promise<Array<string>> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all<Array<string> | string | null>(dirents.map((dirent: any) => {
    if (dirent.isDirectory()) {
      const res = path.resolve(dir, dirent.name);
      return searchFiles(res, seekingFile);
    } if (dirent.name === seekingFile) {
      return path.resolve(dir, dirent.name);
    }
    return null;
  }));

  return _.flattenDeep(files).filter((filePath: string | null) => filePath !== null);
}

const main = async () => {
  new Array(10).fill(null).forEach((_) => {
    console.log('======================== BUILDING TRANSLATIONS ========================');
  });

  new Array(2).fill(null).forEach((_) => {
    console.log(' ');
  });

  const translationsFiles = await searchFiles(ROOT_DIR, REQUESTED_FILE);
  const commandToExecute = `i18ncsv2json ${translationsFiles.join(' ')} -p ./public/locales --merge`;

  console.log('EXECUTING COMMAND =>', commandToExecute);

  const process = exec(commandToExecute);
  process.stdout?.on('data', (data: any) => {
    console.log(`stdout: ${ data.toString()}`);
  });

  process.stderr?.on('data', (data: any) => {
    console.log(`stderr: ${ data.toString()}`);
  });

  process.on('exit', (code: any) => {
    console.log(`child process exited with code ${ code?.toString()}`);
    new Array(2).fill(null).forEach((_) => {
      console.log(' ');
    });
    new Array(10).fill(null).forEach((_) => {
      console.log('+++++++++++++++++++++++++++++ TRANSLATIONS BUILT +++++++++++++++++++++++++++++');
    });
  });
};

main();
