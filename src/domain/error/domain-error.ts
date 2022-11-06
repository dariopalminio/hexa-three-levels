import { ErrorCode } from "./error-code.enum";

/**
 * Defines an superclass Error for Domain Layer type errors.
 */
export class DomainError extends Error {

  protected code: number; //the first step in handling errors is to provide a client with a proper status code.
  protected detail: string; //message more detailed of error with additional info
  protected data: any; //JSON object with more data
  //traslated?: string; //message traslated

  constructor(code: number, message: string, detail: string = '', data: any = {}) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    this.code = code;
    this.data = data;
    //this.traslated = traslated;
    this.detail = detail;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(this, this.constructor);
  };

  public getCode(): number {
    return this.code;
  };

  public getDetail(): string {
    return this.detail;
  };

  public getData(): any {
    return this.data;
  };

  public getName(): string {
    return this.name;
  };

  public getMessage(): string {
    return this.message;
  };

};

/**
 * Defines an Generic Domain Error for Format (Bad Request) type errors.
 */
export class FormatError extends DomainError {
  constructor(message: string, detail?: string, data?: any) {
      const codeErr = ErrorCode.BAD_REQUEST;
      const msg = 'Format Error: This error is caused when you attempt to enter a badly formatted attribute. ' + message;
      const detailed = detail ? detail : message;
      const dat = data ? data : {};
      super(codeErr, msg, detailed, dat);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
  }
};

/**
 * Defines an Generic Domain Error for Not Found type errors.
 */
export class NotFoundError extends DomainError {
  constructor(message: string, detail?: string, data?: any) {
      const codeErr = ErrorCode.NOT_FOUND;
      const msg = 'Entity not found: could not find the indicated entity in data collection. ' + message;
      const detailed = detail ? detail : message;
      const dat = data ? data : {};
      super(codeErr, msg, detailed, dat);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
  }
};

/**
 * Defines an Generic Domain Error for Duplicate (Conflict) type errors.
 */
export class DuplicateError extends DomainError {
  constructor(message: string, detail?: string, data?: any) {
      const codeErr = ErrorCode.NOT_FOUND;
      const msg = 'Duplicate Error: entity already exists or try to save some attribute that must be unique! ' + message;
      const detailed = detail ? detail : message;
      const dat = data ? data : {};
      super(codeErr, msg, detailed, dat);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
  }
};

/**
 * Defines an Generic Domain Error for Duplicate (Conflict) type errors.
 */
 export class IdFormatError extends DomainError {
  constructor(message: string, detail?: string, data?: any) {
      const codeErr = ErrorCode.BAD_REQUEST;
      const msg = 'Id format is wrong. The id field is undefined or its length exceeds the maximum allowed. ' + message;
      const detailed = detail ? detail : message;
      const dat = data ? data : {};
      super(codeErr, msg, detailed, dat);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
  }
};

/**
 * Defines an Generic Domain Error for Failed Dependency type errors.
 */
 export class FailedDependencyError extends DomainError {
  constructor(message: string, detail?: string, data?: any) {
      const codeErr = ErrorCode.FAILED_DEPENDENCY;
      const msg = 'Some dependency or external service has failed. ' + message;
      const detailed = detail ? detail : message;
      const dat = data ? data : {};
      super(codeErr, msg, detailed, dat);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
  }
};

/**
 * Defines an Generic Domain Error for Internal Server type errors.
 * Internal Server Error	When something goes wrong on the server, 
 * the consumer can’t do anything about it. Just let them know there’s a problem and that they should try again later or contact support.
 */
 export class InternalServerError extends DomainError {
  constructor(message: string, detail?: string, data?: any) {
      const codeErr = ErrorCode.INTERNAL_SERVER_ERROR;
      const msg = 'Something goes wrong on the server and should try again later or contact support. ' + message;
      const detailed = detail ? detail : message;
      const dat = data ? data : {};
      super(codeErr, msg, detailed, dat);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
  }
};