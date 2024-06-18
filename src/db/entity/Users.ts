import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity()
export class Users {
    @PrimaryKey()
    id!: number;

    @Property({
        unique: true,
        nullable: false,
    })
    login: string;

    @Property({
        unique: false,
        nullable: false,
    })
    password: string;


    @Property({
        unique: false,
        nullable: true,
    })
    fullname: string;

    @Property({
        unique: false,
        nullable: true,
    })
    post: string;

    @Property({
        unique: false,
        nullable: false,
    })
    payment: number;

    @Property({
        unique: false,
        nullable: false,
        default: 0
    })
    hoursOfWeek: number = 0;

    constructor({
        post,
        login,
        password,
        fullname,
        payment,
        hoursOfWeek,
    }: Omit<Users, "id">) {
        this.fullname = fullname;
        this.login = login;
        this.password = password;
        this.post = post;
        this.payment = payment;
        this.hoursOfWeek = hoursOfWeek;
    };

}