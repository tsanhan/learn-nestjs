import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    // @Exclude() // exclude password from response object 
    password: string;


    @AfterInsert()
    logInsert() {
        console.log(`User with id ${this.id} has been created`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`User with id ${this.id} has been removed`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`User with id ${this.id} has been updated`);
    }

}