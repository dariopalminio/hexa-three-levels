/**
 * An object is Validatable when it has a method that validates format-specific details.
 */
export interface IValidatable {

    validateFormat(): void;

};