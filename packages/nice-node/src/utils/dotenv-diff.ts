import { readFileSync } from 'fs';
import glob from 'glob';
import { parse } from 'dotenv';
import Table from 'cli-table-fix';
import chalk from 'chalk';

export default () => {
  const globOptions = { absolute: true };
  const profiles = ['local', 'beta', 'prod'];
  const head = ['', ...profiles];
  const allConfig = {};
  profiles.forEach((profile) => {
    allConfig[profile] = {};
    glob.sync(`profiles/${profile}/**/*.env`, globOptions).forEach((file) => {
      const text = readFileSync(file, 'utf-8');
      const config = parse(text);
      Object.keys(config).forEach((key) => {
        if (!(key in allConfig[profile])) {
          allConfig[profile][key] = config[key];
        }
      });
    });
  });

  const colWidths = [20, 20, 20, 20];
  const style = { 'padding-left': 1, head: ['cyan', 'bold'], compact: true };
  const table = new Table({ head, colWidths, style });
  const rows = {};
  Object.keys(allConfig).forEach((profile, index) => {
    Object.keys(allConfig[profile]).forEach((key) => {
      if (!(key in rows)) {
        rows[key] = new Array(Object.keys(allConfig).length).fill('-');
      }
      rows[key][index] = allConfig[profile][key];
    });
  });

  Object.keys(rows).forEach((key) => {
    const row: string[] = rows[key];
    const rowCopy = [...row];
    for (let i = 0; i < rowCopy.length; i++) {
      const diffCells = rowCopy.filter((cell) => cell !== rowCopy[i]);
      if (diffCells.length === 1) {
        row[i] = chalk.yellow(rowCopy[i]);
      } else if (diffCells.length === 2) {
        row[i] = chalk.red(rowCopy[i]);
      }
    }

    table.push({ [key]: row });
  });

  // table.push.apply(table, rows);
  // table.push(
  //   { 'Left Header 1': ['Value Row 1 Col 1', 'Value Row 1 Col 2'] },
  //   { 'Left Header 2': ['Value Row 2 Col 1', 'Value Row 2 Col 2'] }
  // );

  return table.toString();
};
