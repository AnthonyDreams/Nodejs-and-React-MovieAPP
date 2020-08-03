import {IsString, IsEnum, Length, IsOptional, IsArray,ValidateNested, IsISO8601 } from "class-validator";
import {MovieGenre} from "../Models/enums/movieGenre"
import {ActorDTO} from "./actorDTO"
import {MovieDTO} from "./movieDTO"


export class CharacterDTO {
    
    @IsString()
    name: string

    @ValidateNested()
    actors: ActorDTO

    @ValidateNested()
    movie: MovieDTO

}