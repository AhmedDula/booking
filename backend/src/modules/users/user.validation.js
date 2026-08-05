const validateCreate = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters.");
  }

  if (!data.email) {
    errors.push("Email is required.");
  }

  
  if (!data.password || data.password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  if (
    data.role &&
    !["guest", "admin", "concierge"].includes(data.role)
  ) {
    errors.push("Invalid role.");
  }

  return errors;
};

const validateUpdate = (data) => {
  const errors = [];

  if (data.name && data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters.");
  }

  if (data.password && data.password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  if (
    data.role &&
    !["guest", "admin", "concierge"].includes(data.role)
  ) {
    errors.push("Invalid role.");
  }

  return errors;
};

module.exports = {
  validateCreate,
  validateUpdate,
};