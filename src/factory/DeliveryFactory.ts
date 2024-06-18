import { Factory } from "@mikro-orm/seeder";
import { faker } from '@faker-js/faker';
import { Delivery } from "../db/entity/Delivery";

export class DeliveryFactory extends Factory<Delivery> {

    model = Delivery;

    definition(): Partial<Delivery> {
        return {
            date: faker.date.anytime(),
            deliveryId: faker.string.numeric({ length: { min: 0, max: 5 } }),
        };
    }
};