import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OTP API Documentation",
      version: "1.0.0",
      description: "API documentation for OTP endpoints",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const serveSwaggerUI = swaggerUi.serve;
export const setupSwaggerUI = swaggerUi.setup(swaggerSpec);
