import { Entity } from '../../../../domain/model/entity';
import { IMarshable } from '../../../../domain/model/marshable.interface';
import { IValidatable } from '../../../../domain/model/validatable.interface';
import { IBusiness } from './business.interface';

/**
 * Category domain object
 * 
 * Note: The 'domain object' represents core domain model or domain entities. It can have state and business behaviour.
 * The domain object does not have any dependency on the other components except those of other atomic domain components part of model.
 * This Domain Object is persistence-ignorant objects, is a class which doesn't depend on any framework-specific base class. 
 * If you want to make a simple domain object class, you can design domain object without any behavioral methods and 
 * create use cases for each behavior of the domain object, it is up to you.
 */
export class Business extends Entity implements IValidatable, IMarshable<Business> {

    key: string;
    meta: any;

    public constructor();
    public constructor(unmarshalled: any);
    public constructor(id: string, key: string, meta: string);
    public constructor(...argumentsArray: any[]) {
        if (argumentsArray.length > 3) {
            throw new Error('Number of constructor arguments exceeded');
        }
        if (argumentsArray.length === 0) {
            super();
        }
        if (argumentsArray.length === 1) {
            const id: string = argumentsArray[0]._id ? argumentsArray[0]._id.toString() : argumentsArray[0].id;
            super(id);
            this.setFromAny(argumentsArray[0]);
        }
        if (argumentsArray.length > 1) {
            super(argumentsArray[0]); //id
            this.key = argumentsArray[1];
            this.meta = argumentsArray[2];
        }
    };

    private setFromAny(unmarshalled: any) {
        this.key = unmarshalled.key;
        this.meta = unmarshalled.meta;
    };

    createFromAny(unmarshalled: any): Business {
        return new Business(unmarshalled);
    };

    /**
     * Unmarshal: convert class object to unmarshalled any
     */
    public convertToAny(): any {
        const unmarshalled: IBusiness = {
            id: this.id,
            key: this.key,
            meta: this.meta
        };
        return unmarshalled;
    };

    public validateFormat(): void {
        throw new Error('Method not implemented.');
    };

    public getKey(): string {
        return this.key;
    };

    public getMeta(): any {
        return this.meta;
    };

    public setKey(value: string) {
        if (value === undefined || (typeof value !== 'string')) //required
            throw new Error('Field key in category has invalid format because is undefined or is not string!');
        if (value.trim() === '') throw new Error('Field key has invalid because is empty string. A product must have a name!');
        this.key = value;
    };

    public setMeta(value: string) {
        this.meta = value;
    };

};