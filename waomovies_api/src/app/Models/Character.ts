import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique} from "typeorm";
import {Dates} from "./embeddedFields/initDates"
import {Actor} from "./Actor"
import {Movie} from "./Movie"


@Entity()
@Unique("CHARACTERCONSTRAINT", ["actor", "movie"])
export class Character {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    character_name: string

    @ManyToOne(type => Actor, actor => actor.interpretations, { onDelete: 'CASCADE', nullable: false  })
    actor: Actor

    @ManyToOne(type => Movie, movie => movie.characters, { onDelete: 'CASCADE', nullable: false  })
    movie: Movie

    @Column(type => Dates)
    date_: Dates

}