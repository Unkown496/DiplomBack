import { PrimaryKey, Entity, Property, ManyToOne, Ref } from "@mikro-orm/core";
import { Delivery } from "./Delivery";
import { Productions } from "./Productions";

@Entity()
export class Materials {
    @PrimaryKey()
    id!: number;

    @Property({
        unique: false,
        nullable: true,
    })
    kg: number;

    @Property({
        unique: false,
        nullable: true,
    })
    lit: number;

    @ManyToOne(() => Delivery, {
        nullable: true,
    })
    delivery?: Ref<Delivery>;

    @ManyToOne(() => Productions, {
        nullable: true,
    })
    production?: Ref<Productions>;

    @Property({ 
        unique: false,
        nullable: true,
    })
    deliveryDate: Date;

    @Property({
        unique: false,
        nullable: false,
    })
    title: string; 

    constructor({   
        kg,
        lit,    

        delivery,

        deliveryDate,
        title,
    }: Pick<Materials, 'deliveryDate' | 'kg' | 'lit' | 'title'> & Partial<Pick<Materials, 'delivery'>>) {
        this.deliveryDate = deliveryDate;
        this.kg = kg;
        this.lit = lit;
        this.title = title;
        this.delivery = delivery;
    }
}