import http from "http";
import express from "express";
import config from "./config/config";
import routes from "./routes/routes";

const app = () => {
  const app = express();
  const router = express.Router();
  const server = http.createServer(app);

  config.middleware.forEach((middleware) => {
    app.use(middleware);
  });

  app.use("/", routes);

  const link = `http://localhost:${config.port}`;
  server.listen(config.port, () => {
    console.log(`Your server available at ${link}`);
  });
};

export default app;
