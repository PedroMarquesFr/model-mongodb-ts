import express, { NextFunction, Request, Response } from "express"
import routerPost from "./routes/routerUsers";

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  console.log(`- ${req.method} ${req.path}`);
  /* Termina a operação no middleware e chama o próximo middleware ou rota */
  next();
});

app.use("/user", routerPost);

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  res.status(500).send({ error: `${err} ou algum erro interno` });
});

app.listen(3000, () => console.log("hello model"));
