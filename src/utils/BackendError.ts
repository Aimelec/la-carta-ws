export default class BackendError extends Error {
  code: number;

  constructor( code: number, message: string ) {
    super( message );
    this.code = code;
  }
}