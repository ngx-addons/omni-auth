const toTitleCase = (phrase: string) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const emailToFullName = (email: string | null | undefined) => {
  if (!email) {
    return null;
  }

  const emailParts = email.split(/[@+]/g);

  if (emailParts.length < 2) {
    return null;
  }

  const result = emailParts[0].replace(/[.,]/g, ' ');

  if (!result) {
    return null;
  }

  return toTitleCase(result);
};
