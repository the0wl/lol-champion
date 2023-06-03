export const capitalized = (word: string): string => {
  const capitalizedWord = word.replace(word.charAt(0), (l) => l.toUpperCase());    
  return capitalizedWord;
};
