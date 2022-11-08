import { LineNumberDetails } from './NumberedTextArea.types';

export const DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT = 50;
export const DEFAULT_LINE_NUMBER_COLS = 1;
export const DEFAULT_LINE_NUMBER_VALUE = '1';

export const initialLineNumberState: LineNumberDetails = {
  value: '1',
  height: DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT,
  cols: DEFAULT_LINE_NUMBER_COLS,
};

export const createLineNumbers = (text: string = ''): number[] => {
  if (!text) {
    return [1];
  }
  const textRows: string[] = text.split('\n');
  const newLineNumbers: number[] = Array.from(Array(textRows.length).keys());
  // newLineNumbers starts from 0, whereas we want it to start from 1,
  // so shift the line lineNumbers forward 1
  newLineNumbers.shift();
  newLineNumbers.length > 0
    ? newLineNumbers.push((newLineNumbers?.at(-1) ?? 0) + 1)
    : newLineNumbers.push(1);

  return newLineNumbers;
}

export const convertLineNumbersToString = (lineNumbers: number[]): string =>
  lineNumbers
    .reduce((acc, lineNumberValue) => `${acc}\n${lineNumberValue}`, '')
    .trim();
