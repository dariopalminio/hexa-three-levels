import { IPersistentAggregateService } from 'src/domain/service/interface/persistent.aggregate.interface';

/**
 * Category Service Interface
 * 
 * This is a Domain Service Interface that works with an Entity Root and its collection.
 * 
 * Note: This interface works as input port. 
 * An input port (driving port) lets the application core (Domain layer) to expose the functionality to the outside of the world (app layer).
 * Application layer controllers use services only through these interfaces (input port).
 */
export interface IBusinessService<T> extends IPersistentAggregateService<T>{

    getHello(): string;

};

