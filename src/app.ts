import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application route
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

// not found
app.use(notFound);

// error handler middleware
app.use(globalErrorHandler);

export default app;
