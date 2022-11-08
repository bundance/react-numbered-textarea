import React from 'react';

const SCROLL_EVENT = 'scroll';

export const useScrollSync = (textArea1: React.RefObject<HTMLTextAreaElement>, textArea2: React.RefObject<HTMLTextAreaElement>): void => {
  React.useEffect(() => {
    // Capture the refs that we'll be applying to our event listeners. We need to do this, as the refs will be
    // null when the component unmounts, so we won't be able to remove the event listeners on unmount.
    const textArea1Instance = textArea1?.current;
    const textArea2Instance = textArea2?.current;

    textArea1Instance?.addEventListener(SCROLL_EVENT, handleScroll(textArea1, textArea2));
    textArea2Instance?.addEventListener(SCROLL_EVENT, handleScroll(textArea1, textArea2));

    if (textArea2Instance) {
      return () => {
        textArea1Instance?.removeEventListener(SCROLL_EVENT, handleScroll(textArea1, textArea2));
        textArea2Instance?.removeEventListener(SCROLL_EVENT, handleScroll(textArea1, textArea2));
      };
    }
  }, []);
}

function handleScroll(textArea1: React.RefObject<HTMLTextAreaElement>, textArea2: React.RefObject<HTMLTextAreaElement>) {
  return function() {
      if (!textArea1?.current || !textArea2?.current) {
        return;
      }
      textArea1.current.style.transform = `translateY(-${
        textArea2?.current?.scrollTop ?? 0
      }px)`;
    }
  }