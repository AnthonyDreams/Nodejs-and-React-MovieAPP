import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Index, OneToMany} from "typeorm";
import {Dates} from "./embeddedFields/initDates"
import {MovieGenre} from "./enums/movieGenre"
import {Character} from "./Character"


@Entity()
export class Movie {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    image: string

    @Column()
    @Index({ unique: true })
    title: string

    @Column(type => Dates)
    date_: Dates

    @Column({type:"date"})
    release_date : Date

    @Column({type: "enum", enum: MovieGenre})
    genre : MovieGenre

    @OneToMany(type => Character, character => character.movie)
    characters: Character[];
    

}