import React from 'react';
import {
  createLineNumbers,
  initialLineNumberState,
  DEFAULT_LINE_NUMBER_COLS,
  DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT,
  convertLineNumbersToString,
} from './utils';
import { useScrollSync } from '../../hooks/useScrollSync';

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

    React.useEffect(() => {
    if (contentTextArea?.current) {
      setLineNumberTextAreaProps(
        initialValue,
        contentTextArea?.current?.scrollHeight
      );
    }
  }, []);

  // Sync the scrolling of the content line number textarea and content textarea
  useScrollSync(lineNumberTextArea, contentTextArea);

  // Calculate new line numbers and line number textarea height and width (in cols)
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


  return [lineNumberTextAreaProps, setLineNumberTextAreaProps] as const;
};
