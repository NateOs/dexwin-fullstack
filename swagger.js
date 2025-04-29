// filepath: c:\Users\sodja\OneDrive\Documents\GitHub\dexwin-fullstack\swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API documentation for the Todo application",
    },
    servers: [
      {
        url: "http://localhost:5000", // Update with your server URL
      },
    ],
  },
  apis: ["./models/Todo.js", "./routes/*.js"], // Adjust paths as needed
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;