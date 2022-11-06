export {
    DomainError,
    FormatError,
    NotFoundError,
    DuplicateError,
    IdFormatError,
    InternalServerError,
    FailedDependencyError
} from './domain-error';

export {
    ErrorCode
} from './error-code.enum';


export const testLib = () => {console.log("---->testLib is OK!");}