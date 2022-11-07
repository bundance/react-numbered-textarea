import React from 'react';
import * as S from './NumberedTextArea.styles';

const DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT = 50;
const DEFAULT_LINE_NUMBER_COLS = 1;

export interface NumberedTextAreaProps {
  ['data-testid']?: string;
  id?: string;
  name: string;
  height?: number;
  rows?: number;
  placeholder?: string;
  value: string;
  isError?: boolean;
  onKeyDown?: (e: any) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: any) => void;
}

interface LineNumberDetails {
  lineNumbers: string;
  lineNumberHeight: number;
  lineNumberCols: number;
}

const initialLineNumberState: LineNumberDetails = {
  lineNumbers: '1',
  lineNumberHeight: DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT,
  lineNumberCols: DEFAULT_LINE_NUMBER_COLS,
};

const calculateLineNumberDetails = (
  newText: string,
  contentTextAreaScrollHeight: number
): LineNumberDetails => {
  console.log({ newText });
  if (!newText || contentTextAreaScrollHeight === 0) {
    return initialLineNumberState;
  }
  const textRows: string[] = newText.split('\n');
  const newLineNumbers: number[] = Array.from(Array(textRows.length).keys());
  // newLineNumbers starts from 0, whereas we want it to start from 1, 
  // so shift the line lineNumbers forward 1
  newLineNumbers.shift();
  newLineNumbers.length > 0
    ? newLineNumbers.push((newLineNumbers?.at(-1) ?? 0) + 1)
    : newLineNumbers.push(1);

  const lineNumbers = newLineNumbers
    .reduce((acc, lineNumberValue) => `${acc}\n${lineNumberValue}`, '')
    .trim();
  const lineNumberCols =
    newLineNumbers?.at(-1)?.toString().length ?? DEFAULT_LINE_NUMBER_COLS;
  const lineNumberHeight =
    contentTextAreaScrollHeight || DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT;
  return { lineNumbers, lineNumberHeight, lineNumberCols };
};

const NumberedTextArea = (props: NumberedTextAreaProps): JSX.Element => {
  const lineNumberTextArea = React.useRef<HTMLTextAreaElement>(null);
  const contentTextArea = React.useRef<HTMLTextAreaElement>(null);

  const [lineNumberDetails, setLineNumberDetail] =
    React.useState<LineNumberDetails>(
      props.rows
        ? { ...initialLineNumberState, lineNumberHeight: props.rows }
        : initialLineNumberState
    );
  const [isPasted, setIsPasted] = React.useState<boolean>(false);

  React.useEffect(() => {
    function handleScroll() {
      if (!lineNumberTextArea?.current || !contentTextArea?.current) {
        return;
      }
      lineNumberTextArea.current.style.transform = `translateY(-${
        contentTextArea?.current?.scrollTop ?? 0
      }px)`;
    }

    // Capture the refs that we'll be applying to our event listeners. We need to do this, as the refs will be
    // null when the component unmounts, so we won't be able to remove the event listeners on unmount.
    const contentInstance = contentTextArea.current;
    const lineNumberInstance = lineNumberTextArea.current;

    contentInstance?.addEventListener('scroll', handleScroll);
    lineNumberInstance?.addEventListener('scroll', handleScroll);

    if (contentInstance) {
      setLineNumberDetail(
        calculateLineNumberDetails(props.value, contentInstance.scrollHeight)
      );
      return () => {
        contentInstance?.removeEventListener('scroll', handleScroll);
        lineNumberInstance?.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (['Enter', 'Delete', 'Backspace', 'Undo', 'Redo'].includes(e.key)) {
      setLineNumberDetail(
        calculateLineNumberDetails(
          props.value,
          contentTextArea?.current?.scrollHeight || 0
        )
      );
    }
    props.onKeyUp?.(e);
  };

  const handlePaste = (e: any) => {
    // A paste event has been triggered, but we can't get the updated value in the textarea yet, as it's not available
    // until the onChange event is triggered.
    setIsPasted(true);
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ): void => {
    if (!(e.nativeEvent instanceof InputEvent)) {
      return;
    }
    if (
      isPasted ||
      e.nativeEvent.inputType === 'historyUndo' ||
      e.nativeEvent.inputType === 'historyRedo'
    ) {
      setLineNumberDetail(
        calculateLineNumberDetails(
          contentTextArea?.current?.value || '',
          contentTextArea?.current?.scrollHeight ?? 0
        )
      );
      setIsPasted(false);
    }
    props.onChange?.(e);
  };

  return (
    <S.Wrapper height={props.height || 368}>
      <S.LineNumbers
        height={lineNumberDetails.lineNumberHeight}
        ref={lineNumberTextArea}
        value={lineNumberDetails.lineNumbers}
        wrap="off"
        readOnly
        cols={lineNumberDetails.lineNumberCols}
        data-testid={`${props['data-testid']}-lineNumberDetails`}
      />
      <S.ContentTextArea
        {...props}
        isError={props.isError || false}
        ref={contentTextArea}
        wrap="off"
        onKeyUp={handleKeyUp}
        onPaste={handlePaste}
        onChange={handleChange}
      />
    </S.Wrapper>
  );
};
export default NumberedTextArea;
