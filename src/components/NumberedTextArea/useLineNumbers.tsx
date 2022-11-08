import React from 'react';
import {
  createLineNumbers,
  initialLineNumberState,
  DEFAULT_LINE_NUMBER_COLS,
  DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT,
  convertLineNumbersToString,
} from './utils';
import { useScrollSync } from './useScrollSync';

export const useLineNumbers = (
  lineNumberTextArea: React.RefObject<HTMLTextAreaElement>,
  contentTextArea: React.RefObject<HTMLTextAreaElement>,
  initialValue: string,
  rows?: number
) => {
  const [lineNumberTextAreaProps, setLineNumberTextAreaPropsState] =
    React.useState(
      rows
        ? { ...initialLineNumberState, lineNumberHeight: rows }
        : initialLineNumberState
    );

  useScrollSync(lineNumberTextArea, contentTextArea);

  const setLineNumberTextAreaProps = (
    text?: string,
    scrollHeight: number = DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT
  ) => {
    const lineNumbers = createLineNumbers(text);
    const cols =
      lineNumbers.at(-1)?.toString().length ?? DEFAULT_LINE_NUMBER_COLS;
    const value = convertLineNumbersToString(lineNumbers);

    setLineNumberTextAreaPropsState({
      cols, 
      height: scrollHeight,
      value
    });
  };

  React.useEffect(() => {
    if (contentTextArea?.current) {
      setLineNumberTextAreaProps(
        initialValue,
        contentTextArea?.current?.scrollHeight
      );
    }
  }, []);
  return [lineNumberTextAreaProps, setLineNumberTextAreaProps] as const;
};
