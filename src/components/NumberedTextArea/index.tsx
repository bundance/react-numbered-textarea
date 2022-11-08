import React from 'react';
import * as S from './NumberedTextArea.styles';
import { NumberedTextAreaProps } from './numberedTextArea.types';
import { useLineNumbers } from './useLineNumbers';

const DEFAULT_TEXTAREA_HEIGHT = 368;

const NumberedTextArea = (props: NumberedTextAreaProps): JSX.Element => {
  const lineNumberTextArea = React.useRef<HTMLTextAreaElement>(null);
  const contentTextArea = React.useRef<HTMLTextAreaElement>(null);

  const [isPasted, setIsPasted] = React.useState<boolean>(false);

  const [lineNumberTextAreaProps, setLineNumberTextAreaProps] = useLineNumbers(
    lineNumberTextArea,
    contentTextArea,
    props.value,
    props.rows
  );

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (['Enter', 'Delete', 'Backspace', 'Undo', 'Redo'].includes(e.key)) {
      setLineNumberTextAreaProps(
        props.value,
        contentTextArea?.current?.scrollHeight
      );
    }
    props.onKeyUp?.(e);
  };

  const handlePaste = (e: any) => {
    // A paste event has been triggered, but we can't get the updated value 
    // in the textarea yet,as it's not available until the onChange event is
    // triggered.
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
      ['historyUndo', 'historyRedo'].includes(e.nativeEvent.inputType)
    ) {
      setLineNumberTextAreaProps(
        contentTextArea?.current?.value,
        contentTextArea?.current?.scrollHeight
      );
      setIsPasted(false);
    }
    props.onChange?.(e);
  };

  return (
    <S.Wrapper height={props.height || DEFAULT_TEXTAREA_HEIGHT}>
      <S.LineNumbers
        {...lineNumberTextAreaProps}
        ref={lineNumberTextArea}
        wrap="off"
        readOnly
        data-testid={`${props['data-testid']}-lineNumberTextAreaProps`}
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
