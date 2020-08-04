import { JsonController, Param, Body, Get, Post, Put, Delete, HttpCode, QueryParams } from "routing-controllers";
import {getCustomRepository} from "typeorm";
import {MovieDTO} from "../DTOs/movieDTO"
import { MovieRepository } from "../Repositories/movieRepository";
import {MovieGenre} from "../Models/enums/movieGenre"
import {Base64FileUtil} from "../utils/Base64FileUtil";
import { v4 as uuidv4 } from 'uuid';
@JsonController()
export class MovieController {

    movieRepository: MovieRepository

    constructor(){
        this.movieRepository = getCustomRepository(MovieRepository)
    }

    @Get("/movies")
    @HttpCode(201)
    getAll(@QueryParams() query: any) {
        // checking if the object query got values
        if(Object.keys(query).length > 0){
            return this.movieRepository.findBySearch(query);
        }
        return this.movieRepository.find();
    }

    @Post("/movies")
     async post(@Body() movie: MovieDTO) {
        const image = new Base64FileUtil(movie.image)
        await image.initFileFromBase64(uuidv4())
        movie.image = image.fileName
        const savedMovie = this.movieRepository.save(movie)
        savedMovie.then(async (result) => {
            image.saveFileToPath('public/uploads/images/movies/')
          })
     return savedMovie;
    }

    @Get("/movies/:id")
    getOne(@Param("id") id: string) {
       return this.movieRepository.findOne(id, { relations: ["characters", "characters.actor"] });
    }


    @Put("/movies/:id")
    update(@Param("id") id: string, @Body() movie: MovieDTO){
        return this.movieRepository.save({id, ...movie})
    }

    @Delete("/movies/:id")
    delete(@Param("id") id : string){
        return this.movieRepository.delete(id)
    }

    @Get("/utils/movies/genre")
    getGenres(){
        return Object.values(MovieGenre)
    }
    

}