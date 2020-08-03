import {IsString, IsEnum, Length, IsISO8601, IsOptional, ValidateNested, IsBase64} from "class-validator";
import {BasicSex} from "../Models/enums/basicSex"
import { CharacterDTO } from "./CharacterDTO";

export class ActorDTO{


    @IsBase64()
    image: string

    @Length(2, 80)
    firstName: string;

    @Length(2, 80)
    lastName: string;
    
    @IsISO8601()
    birthDate : Date
    
    @IsEnum(BasicSex)
    sex : BasicSex

    @IsOptional()
    @ValidateNested()
    movies: CharacterDTO[]
    

}