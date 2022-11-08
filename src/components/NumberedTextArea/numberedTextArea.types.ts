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

export interface LineNumberDetails {
  value: string;
  height: number;
  cols: number;
}