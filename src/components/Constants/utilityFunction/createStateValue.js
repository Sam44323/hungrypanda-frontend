exports.getTextField = (name, dbName, type, message, isValid, value = '') => {
  return {
    name,
    dbName,
    type,
    value: value,
    touched: false,
    isValid,
    message,
  };
};

exports.getImageField = (name, dbName) => {
  return {
    name,
    dbName,
    type: 'file',
    value: null,
  };
};

exports.timeValue = (name, value, isValid) => {
  return {
    name,
    value,
    isValid,
  };
};

exports.ingObjectCreator = (value = []) => ({
  ing:
    value.length === 0
      ? value
      : value.map((item) => ({
          id: Math.random().toString(),
          value: item,
        })),
  isValid: true,
});

exports.userInputDetailState = (
  name,
  isValid,
  message,
  value = '',
  touched = false
) => ({
  name,
  value,
  touched,
  isValid,
  message,
});

exports.socialMediaObjectCreator = (name, value = '', hasValue = false) => ({
  name,
  value,
  hasValue,
});
