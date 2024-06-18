import { Factory } from "@mikro-orm/seeder";
import { Users } from "../db/entity/Users";
import { faker } from "@faker-js/faker";

export class UsersFactory extends Factory<Users> {
    model = Users;

    definition(): Partial<Users> {
        return {
            login: faker.internet.userName(),
            fullname: faker.name.fullName(),
            password: faker.internet.password(),
            payment: faker.number.int({ min: 0, max: 100000 }),
            post: faker.word.noun(),
            hoursOfWeek: faker.number.int({ min: 0, max: 140 }),
        };
    }   
}