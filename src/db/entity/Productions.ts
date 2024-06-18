import { PrimaryKey, Entity, Property, Enum, OneToMany, Collection } from "@mikro-orm/core";
import { Materials } from "./Materials";

@Entity()
export class Productions {
    @PrimaryKey()
    id!: number;

    @Property({
        unique: false,
        nullable: true,
        default: false,
        type: "boolean",
    }) 
    isReady: boolean = false; 


    @Enum(() => Status)
    status!: Status;

    @Property({
        nullable: false,
        unique: false,
    })
    title: string;

    @OneToMany(() => Materials, (materials) => materials.production)
    materials = new Collection<Materials>(this);

    constructor({
        isReady,
        title,
        status
    }: Productions) {
        this.title = title;
        this.isReady = isReady; 
        this.status = status;
    }
};

export enum Status {
    Pasteurization = "Pasteurization",
    Cooling = "Cooling",
    AddingStarterCultures = "Adding Starter Cultures",
    RipeningTheMixture = "Ripening The Mixture",
    CurdCutting = "Curd Cutting",
    WheyingOff = "Wheying Off",
    Pressing = "Pressing",
    Salting = "Salting",
    Aging = "Aging",
}