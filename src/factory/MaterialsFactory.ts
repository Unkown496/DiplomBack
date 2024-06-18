import { faker } from "@faker-js/faker";
import { Materials } from "../db/entity/Materials";
import { Factory } from "@mikro-orm/seeder";

export class MaterialsFactory extends Factory<Materials> {
    model = Materials;

    definition(): Partial<Materials> {
        return {
            kg: faker.datatype.number({ min: 1, max: 100 }),
            lit: faker.datatype.number({ min: 1, max: 100 }),
            deliveryDate: faker.date.past(),
            title: faker.commerce.product(),
        };
    }
}