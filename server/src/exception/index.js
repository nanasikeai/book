class ComError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
    this.name = "comError";
  }
};

module.exports = ComError;