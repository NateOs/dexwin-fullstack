require("dotenv").config();
require("express-async-errors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
// express

const express = require("express");
const app = express();
// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./db/connect");

//  routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const todoRouter = require("./routes/todoRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  }),
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Todo API");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
      console.log(
        "Swagger docs available at http://localhost:" + port + "/api-docs",
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
