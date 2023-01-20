import {OrderState} from "../entity/order.entity";
import {IsNotEmpty} from "class-validator";

export class ChangeStateDto {

    @IsNotEmpty()
    state : OrderState

}