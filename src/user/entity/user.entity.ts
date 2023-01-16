import {Column, Entity, PrimaryGeneratedColumn, TableInheritance} from "typeorm";

@Entity("user")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class UserEntity{


    @PrimaryGeneratedColumn()
    id : number

    @Column()
    username : string

    @Column()
    email : string

    @Column()
    password : string

    @Column()
    salt : string

    @Column()
    phoneNumber : string

    @Column()
    image : string



}
