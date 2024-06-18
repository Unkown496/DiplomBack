import { PrimaryKey, Entity, Property, OneToOne, OneToMany, Collection } from "@mikro-orm/core";
import { Delivery } from "./Delivery";


@Entity()
export class Providers {
    @PrimaryKey()
    id!: number;

    @Property()
    name: string;

    @OneToMany(() => Delivery, delivery => delivery.providerId)
    deliveries = new Collection<Delivery>(this);

    constructor({
        name,
    }: Providers) {
        this.name = name;
    }
}