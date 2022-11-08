import React from 'react';
import styled from 'styled-components';

export const TextArea = styled.textarea`
  margin: 0;
  padding: 10px 0;
  height: 100%;
  border-radius: 0;
  resize: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  outline: none;
  border: none;
  box-sizing: border-box;
  scrollbar-gutter: stable;
  overflow-y: auto;
  cursor: auto;
`;

export const ContentTextArea = styled(TextArea)<{ isError: boolean }>`
  color: #0e0e0f;
  width: 100%;
  resize: none;
  min-width: 378px;
  ::selection {
    background-color: ${({ isError }: { isError: boolean }) =>
      isError ? '#f9dddb' : 'highlight'};
  }
  overflow: auto;
`;

export const LineNumbers = React.memo(styled(TextArea)<{ height: number }>`
  font-family: lucida console, courier new, courier, monospace;
  font-weight: 400;
  color: #c7c9cc;
  display: flex;
  overflow-y: hidden;
  height: ${({ height }: { height: number } = { height: 300 }) => `${height}px`};
  text-align: right;
  padding-left: 10px;
`);

export const Wrapper = styled.div<{ height?: number }>`
  position: relative;
  display: flex;
  border: 1px solid #93969a;
  border-radius: 4px;
  overflow: hidden;
  ${(props: { height?: number }) =>
    !Number.isNaN(props?.height) && `height: ${props.height}px`};
`;
