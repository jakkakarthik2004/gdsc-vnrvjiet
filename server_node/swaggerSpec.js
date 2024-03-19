const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My MongoDB API",
      version: "1.0.0",
      description: "API to interact with MongoDB collections",
    },
  },
  apis: [path.join(__dirname, "APIs", "*.js")],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
