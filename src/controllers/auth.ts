import { Context } from "elysia";
import { Controller, Post } from "elysia-decorators";

import orm from "../db/index";
import { Users } from "../db/entity/Users";
import responseHelpres from "../helpers/responseHelpres";

@Controller("/auth")
export class Auth {
    @Post("/login")
    async login({ body, set }: { body: { password: string, login: string }, set: Context['set'] }) {
        const findUser = await orm.findOne(Users, {
            login: body.login,
            password: body.password,
        }, {
            exclude: ["password"]
        });

        if(!findUser) return responseHelpres.failureNotFound({ notFoundText: "Пользователь не найден", set });

        return responseHelpres.successWithData({ data: findUser, set });
    }
}