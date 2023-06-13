function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  const success = document.execCommand('copy');
  document.body.removeChild(textArea);

  return success;
}
export const copyTextToClipboard = async (text: string) => {
  if (!navigator.clipboard) {
    return fallbackCopyTextToClipboard(text);
  }
  await navigator.clipboard.writeText(text);
  return true;
};
