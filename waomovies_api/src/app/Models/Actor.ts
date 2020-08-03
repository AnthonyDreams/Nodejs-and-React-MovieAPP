import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated} from "typeorm";
import {Dates} from "./embeddedFields/initDates"
import {BasicSex} from "./enums/basicSex"
import {Character} from "./Character"


@Entity()
export class Actor {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({default:"asdsa"})
    image: string

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column(type => Dates)
    date_: Dates

    @Column({type: "date"})
    birthDate : Date

    @OneToMany(type => Character, photo => photo.actor)
    interpretations: Character[];
    
    @Column({type: "enum", enum: BasicSex })
    sex : BasicSex

}