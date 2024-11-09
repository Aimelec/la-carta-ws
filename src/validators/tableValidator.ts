import { Validator } from "./validator";

class TableValidator extends Validator {
  validateParam( params: any ) {
    return {
      tableId: Number( params.tableId ),
    };
  }
}

const tableValidator = new TableValidator();

export { tableValidator };