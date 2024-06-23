const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight'];
export const onKeyDownOnlyNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (!allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
};