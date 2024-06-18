import { Factory } from "@mikro-orm/seeder";
import { Productions, Status } from "../db/entity/Productions";
import { faker } from "@faker-js/faker";

export class ProductionsFactory extends Factory<Productions> {
    model = Productions;

    definition(): Partial<Productions> {
        return {
            title: faker.string.numeric({ length: { min: 0, max: 5 } }),
            isReady: faker.datatype.boolean(),
            status: Status.Pasteurization,
        };
    }
}