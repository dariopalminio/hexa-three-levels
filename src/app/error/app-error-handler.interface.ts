import { DomainError } from "../../domain/error/domain-error";

export interface IAppErrorHandler<E> {

    createHttpException(e: Error | DomainError): E;

}