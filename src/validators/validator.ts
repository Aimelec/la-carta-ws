export class Validator {
  protected requiredFields!: { key: string; type: string; }[];

  protected checkAbsenceInside( params: any ) {
    return this.requiredFields.find(
      field => !params[ field.key ] || typeof params[ field.key ] !== field.type
    );
  }

  protected absentFieldMessage( absentField: { key: string; type: string; } ) {
    return { message: `${ absentField.key } is required and must be a ${ absentField.type }` };
  }
}