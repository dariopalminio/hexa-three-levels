
/**
 * An object is marshable when it can become an unstructured (unmarshalled) object and vice versa.
 */
export interface IMarshable<T> {

    /**
     * Convert class object to unmarshalled object type any: T --> any
     */
    convertToAny(): any;

    /**
     * Convert unmarshalled object to class object instance of T: any --> T
     * @param unmarshalled 
     */
    createFromAny(unmarshalled: any): T;

}