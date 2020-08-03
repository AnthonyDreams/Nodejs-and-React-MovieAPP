import { CreateDateColumn, UpdateDateColumn} from "typeorm";

export class Dates {

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}