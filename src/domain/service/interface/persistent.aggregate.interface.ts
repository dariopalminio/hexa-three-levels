import { PaginatedResult } from "../../model/paginated-result";

/**
 * Persistent-Aggregate-Service Interface
 * 
 * This interface is used to abstract the common behavior of those services that behave as persistence aggregates.
 * Services that use a repository and implement its methods should use this interface.
 * 
 * Note: Services interfaces are fachade of 'use cases' that are the abstract definition of what the user would like to do in your application.  
 * All the business/domain logic, validations are happening in the use of case classes such as services. This interface works as input port. 
 * An input port (driving port) lets the application core (Domain layer) to expose the functionality to the outside of the world (app layer).
 * Application layer controllers use services only through these interfaces (input port).
 */
export interface IPersistentAggregateService<T> {

  //read and update operations
  getAll(page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<Array<T>>;
  find(query: any, page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<Array<T>>;
  findExcludingFields(query: any, fieldsToExclude: any, page?: number, limit?: number, orderByField?: string, isAscending?: boolean): Promise<Array<any>>;
  getById(id: string): Promise<T>;
  getByQuery(query: any): Promise<T>;
  hasById(id: string): Promise<boolean>;
  hasByQuery(query: any): Promise<boolean>;
  search(queryFilter: any, page: number, limit: number, orderByField: string, isAscending: boolean): Promise<PaginatedResult<T>>;
  searchExcludingFields(queryFilter: any, fieldsToExclude: any, page: number, limit: number, orderByField: string, isAscending: boolean): Promise<PaginatedResult<any>>;

  //update operations
  create<R>(entityInterface: R): Promise<T>;
  updateById<R>(id: string, doc: R | T): Promise<boolean>;
  update(query: any, valuesToSet: any): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  
};

