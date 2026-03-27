export function generateUserNameFromEmail(email: string) {
  return email.split("@")[0];
}

export function formatName(fullName: string) {
  const salutations = ["Mr.", "Mrs.", "Ms.", "Dr.", "MD."];

  const splitedName = fullName.split(" ");

  if (splitedName.length === 2) {
    return {
      firstName: splitedName[0],
      lastName: splitedName[splitedName.length - 1],
    };
  }

  for (let s of salutations) {
    if (fullName.startsWith(s)) {
      return {
        firstName: splitedName[1],
        lastName: splitedName[splitedName.length - 1],
      };
    }
  }

  throw fullName;
}
