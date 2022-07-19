const userConditions = {
  conditions: (displayName, email, password) => ({
    displayNameC: displayName && displayName.length < 8,
    emailC: email.includes('@'),
    passwordC: password.length < 6,
  }),
};

module.exports = userConditions;
