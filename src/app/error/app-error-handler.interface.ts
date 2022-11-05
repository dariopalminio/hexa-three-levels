import { DomainError } from "src/domain/error/domain-error";

export interface IAppErrorHandler<E> {

    createHttpException(e: Error | DomainError): E;

}