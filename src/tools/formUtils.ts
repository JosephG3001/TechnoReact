import TransactionError from "../classes/transaction-error";

function setServerSideFormErrors(
  form: any,
  errors: Array<TransactionError>,
  propertyPrefix?: string
): void {
  const prefix = propertyPrefix ? `${propertyPrefix}.` : "";
  if (errors && Array.isArray(errors)) {
    errors.forEach((x) => {
      // Bug: Backend returns an error with a single empty string
      // This can confuse the form library when there is a
      // single property error.
      if (x.errors.every((errorMsg) => !errorMsg)) {
        return;
      }

      form.setError(prefix + x.propertyName, {
        type: "error",
        message: x.errors[0],
      });
    });
  }
}

export default setServerSideFormErrors;
