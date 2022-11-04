/**
 * Abstract Factory Object Creational
 * */
 export interface IEntityFactory<T> {

    /**
     * Create instance of specific T type from any unmarshalled data
     * @param unmarshalled 
     */
    createInstance(unmarshalled: any): T;

};
