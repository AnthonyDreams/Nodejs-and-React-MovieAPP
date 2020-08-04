import { JsonController, OnUndefined,OnNull, Param, Body, Get, Post, Put, Delete, HttpCode, QueryParams } from "routing-controllers";
import {getCustomRepository} from "typeorm";
import {CharacterRepository} from "../Repositories/characterReposiroty";
import {CharacterDTO} from "../DTOs/CharacterDTO"
@JsonController()
export class CharacterController {

    characterRepository: CharacterRepository

    constructor(){
        this.characterRepository = getCustomRepository(CharacterRepository)
    }

    @Get("/characters")
    @HttpCode(201)
    getAll(@QueryParams() query: any) {
        // checking if the object query got values
   
        return this.characterRepository.find();
        
    }

    @Post("/characters")
    post(@Body() character: CharacterDTO) {
      const savedCharacter = this.characterRepository.save(character)
        console.log('estoyyyyyyyyyyyyyyyyyy')
    
      return savedCharacter;
    }

    @Get("/characters/:id")
    getOne(@Param("id") id: string) {
       return this.characterRepository.findOne(id);
    }


    @Put("/characters/:id")
    update(@Param("id") id: string, @Body() character: CharacterDTO){
        return this.characterRepository.save( {id, ...character})
    }

    @Delete("/characters/:id")
    delete(@Param("id") id : string){
        return this.characterRepository.delete(id)
    }
    

}