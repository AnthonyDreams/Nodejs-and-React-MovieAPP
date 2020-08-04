import { JsonController, OnUndefined,OnNull, Param, Body, Get, Post, Put, Delete, HttpCode, QueryParams } from "routing-controllers";
import {getCustomRepository} from "typeorm";
import {ActorRepository} from "../Repositories/actorRepository";
import {ActorDTO} from "../DTOs/actorDTO"
import {Base64FileUtil} from "../utils/Base64FileUtil";
import { v4 as uuidv4 } from 'uuid';
@JsonController()
export class ActorController {

    actorRepository: ActorRepository

    constructor(){
        this.actorRepository = getCustomRepository(ActorRepository)
    }

    @Get("/actors")
    @HttpCode(200)
    getAll(@QueryParams() query: any) {
        // checking if the object query got values
        if(Object.keys(query).length > 0){
            return this.actorRepository.findBySearch(query);
        }
        return this.actorRepository.find();

    }

    @Get("/exclude/actors")
    @HttpCode(201)
    getAllExcept(@QueryParams() query: any) {
        
        return this.actorRepository.notInIds(query);

    }

    @Post("/actors")
      async post(@Body() actor: ActorDTO) {
      const image = new Base64FileUtil(actor.image)
      await image.initFileFromBase64(uuidv4())
      actor.image = image.fileName
      const savedActor = this.actorRepository.save(actor)
      savedActor.then(async (result) => {
        image.saveFileToPath('public/uploads/images/actor/')
      })
    
     return savedActor;
    }

    @Get("/actors/:id")
    getOne(@Param("id") id: string) {
       return this.actorRepository.findOne(id, { relations: ["interpretations", "interpretations.movie"] });
    }


    @Put("/actors/:id")
    update(@Param("id") id: string, @Body() actor: ActorDTO){
        return this.actorRepository.save( {id, ...actor})
    }

    @Delete("/actors/:id")
    delete(@Param("id") id : string){
        return this.actorRepository.delete(id)
    }
    

}