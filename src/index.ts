import { Elysia } from "elysia";

import { decorators } from "elysia-decorators";
import { bearer } from '@elysiajs/bearer'
import { cors } from '@elysiajs/cors'
import { jwt } from '@elysiajs/jwt'
import { logger } from '@grotto/logysia';

import { Api } from "./controllers/api";
import { Auth } from "./controllers/auth";


const app = new Elysia();

app.use(logger());
app.use(jwt({
  name: "jwt",
  secret: "secret",
}));
app.use(bearer());
app.use(cors({
  origin: "*",
  allowedHeaders: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

app.use(decorators({
  controllers: [Api, Auth],
}));

app.listen(3000, () => console.log("Listening on port 3000"))