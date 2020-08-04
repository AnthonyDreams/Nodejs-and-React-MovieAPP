import {EntityRepository, Repository} from "typeorm";
import {Actor} from "../Models/Actor";
import {BasicSex} from "../Models/enums/basicSex"

@EntityRepository(Actor)
export class ActorRepository extends Repository<Actor> {

    findByName(firstName: string, lastName: string) {
        return this.findOne({ firstName, lastName });
    }

    findBySearch(query){
        // const dato =  this.createQueryBuilder("actor")
        // .leftJoinAndSelect("actor.interpretations", "interpretation")
        // .where("actor.firstName ilike '%' || :searchText || '%' or actor.lastName ilike '%' || :searchText || '%'", query).orWhere("interpretation.name ilike '%' || :searchText || '%'", query).andWhere("actor.sex IN (:...sex)", query).getMany()
        const fullName =  "%"+query.searchText.replace(/\s/g, '%')+"%"
        const sex = query.sex ? query.sex.split(",") : Object.values(BasicSex)
        return this.createQueryBuilder("actor")
        .leftJoin("actor.interpretations", "character")
        .leftJoinAndSelect("character.movie", "movie")
        .where('actor.firstName || \' \' || actor.lastName ilike  :fullName', {fullName})
        .andWhere("actor.sex IN (:...sex)", {sex})
        .orWhere("movie.title ilike :text", {text:fullName})
        .getMany()
    }

    notInIds(query){
        return this.createQueryBuilder("actor").where("actor.id NOT IN (:...ids)", {ids:query.ids.split(',')}).getMany();
    }

    

}