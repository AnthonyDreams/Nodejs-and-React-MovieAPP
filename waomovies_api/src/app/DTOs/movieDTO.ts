import {IsString, IsEnum, Length, IsOptional,ValidateNested, IsISO8601, IsBase64 } from "class-validator";
import {MovieGenre} from "../Models/enums/movieGenre"
import {CharacterDTO} from "./CharacterDTO"

export class MovieDTO {
    
    @IsBase64()
    image: string

    @Length(2, 230)
    title: string

    @IsISO8601()
    release_date : Date

    @IsEnum(MovieGenre)
    genre : MovieGenre

    @IsOptional()
    @ValidateNested()
    characters: CharacterDTO[]

}