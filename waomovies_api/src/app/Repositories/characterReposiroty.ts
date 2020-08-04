import {EntityRepository, Repository} from "typeorm";
import {Character} from "../Models/Character";

@EntityRepository(Character)
export class CharacterRepository extends Repository<Character> {


}