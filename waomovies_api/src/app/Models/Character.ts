import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Dates} from "./embeddedFields/initDates"
import {Actor} from "./Actor"
import {Movie} from "./Movie"


@Entity()
export class Character {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    character_name: string

    @ManyToOne(type => Actor, actor => actor.interpretations)
    actor: Actor

    @ManyToOne(type => Movie, movie => movie.characters)
    movie: Movie

    @Column(type => Dates)
    date_: Dates

}