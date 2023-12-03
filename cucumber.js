const config = {
  paths: ["tests/**/*.feature"],
  require: ["tests/**/*.ts"],
  requireModule: ["ts-node/register"],
  format: ["summary", "progress-bar"],
  formatOptions: { snippetInterface: "async-await" },
};

module.exports = {
  default: config,
};
