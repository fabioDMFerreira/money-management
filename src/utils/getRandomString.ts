export default (charactersNumber = 8) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < charactersNumber; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

  return text;
};
