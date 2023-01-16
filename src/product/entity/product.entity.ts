import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import {AdminEntity} from "../../user/entity/admin.entity";

@Entity("product")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column(
        {
            type : "float"
        }
    )
    price: number

    @Column()
    image : string

    @ManyToOne(
        type => AdminEntity
    )
    admin : AdminEntity

}
