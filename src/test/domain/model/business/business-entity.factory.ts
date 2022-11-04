import { IEntityFactory } from "../../../../domain/model/entity-factory.interface";
import { Business } from "./business";


export class BusinessEntityFactory implements IEntityFactory<Business> {
    createInstance(unmarshalled: any): Business {
        return new Business(unmarshalled);
    }
}