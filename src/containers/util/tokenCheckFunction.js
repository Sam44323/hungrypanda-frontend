const checkValidation = () => {
  if (
    !localStorage.getItem('token') ||
    new Date(localStorage.getItem('expiresIn')) < new Date()
  ) {
    return true;
  }
  return;
};

export default checkValidation;
