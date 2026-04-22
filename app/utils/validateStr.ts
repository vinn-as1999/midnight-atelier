export function validateString(str: string) {
  const trimmed = str.trim();
  const min = 1;
  const max = 50;

  return new RegExp(`^[\\s\\S]{${min},${max}}$`).test(trimmed);
};

export function validateEmail(email: string) {
  const trimmed = email.trim();

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
};
  
