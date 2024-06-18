import { PrimaryKey, Entity, Property, Collection, ManyToOne, OneToMany } from "@mikro-orm/core";

import { Providers } from "./Providers";
import { Materials } from "./Materials";

@Entity()
export class Delivery {
    @PrimaryKey()
    id!: number;

    @Property({
        unique: false,
        nullable: false,
    })
    date: Date;

    @Property({
        unique: false,
        nullable: false,
    })
    deliveryId: string;

    @OneToMany(() => Materials, material => material.delivery)
    materials = new Collection<Materials>(this);

    @ManyToOne(() => Providers, {
        nullable: true,
    })
    providerId!: Providers;

    constructor({
        date,
        deliveryId, 
    }: Pick<Delivery, 'date' | 'deliveryId'>) {
        this.date = date;
        this.deliveryId = deliveryId;
    }
}