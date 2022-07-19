const userConditions = {
  conditionsAll: (displayName, email, password) => ({
    displayNameC: displayName && displayName.length < 8,
    emailC: email.includes('@'),
    passwordC: password.length < 6,
  }),

  conditionDisplayName: (displayName) => ({
    displayNameC: displayName && displayName.length < 8,
  }),

  conditionEmail: (email) => ({
    emailC: email.includes('@'),
  }),

  conditionPassword: (password) => ({
    passwordC: password.length < 6,
  }),
};

module.exports = userConditions;
