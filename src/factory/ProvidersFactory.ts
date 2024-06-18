import { faker } from "@faker-js/faker";
import { Providers } from "../db/entity/Providers";
import { Factory } from "@mikro-orm/seeder";

export class ProvidersFactory extends Factory<Providers> {
    model = Providers;

    definition(): Partial<Providers> {
        return {
            name: faker.company.name(),
        };
    }
}