import {EntityRepository, Repository} from "typeorm";
import {Movie} from "../Models/Movie";
import {MovieGenre} from "../Models/enums/movieGenre"

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {

    findBySearch(query){
        // const dato =  this.createQueryBuilder("actor")
        // .leftJoinAndSelect("actor.interpretations", "interpretation")
        // .where("actor.firstName ilike '%' || :searchText || '%' or actor.lastName ilike '%' || :searchText || '%'", query).orWhere("interpretation.name ilike '%' || :searchText || '%'", query).andWhere("actor.sex IN (:...sex)", query).getMany()
        const text =  "%"+query.searchText.replace(/\s/g, '%')+"%"
        const genre = query.genre ?  query.genre.split(",") : Object.values(MovieGenre)
        return this.createQueryBuilder("movie")
        .leftJoin("movie.characters", "character")
        .leftJoinAndSelect("character.actor", "actor")
        .where("movie.title ilike :text", {text})
        .andWhere("movie.genre IN (:...genre)", {genre})
        .orWhere('actor.firstName || \' \' || actor.lastName ilike  :fullName', {fullName:text})
        
        .getMany()
    }

}