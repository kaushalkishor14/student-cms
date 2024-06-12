

export const generatePassword2 = (passwordLength) => {
  let charset = "";
  let newPassword = "";

  if (true) charset += "@#$*";
  if (true) charset += "0123456789";
  if (true) charset += "abcdefghijklmnopqrstuvwxyz";
  if (true) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // setPassword(newPassword);
  return newPassword;
};
// export default PasswordGenerator;