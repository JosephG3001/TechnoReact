import TransactionError from "./transaction-error";

class TransactionResult<T> {
  success: boolean;

  model: T;

  errors: Array<TransactionError>;

  get generalError(): string | null {
    if (!this.errors || !Array.isArray(this.errors)) {
      return null;
    }

    const tryFindError = this.errors.find(
      (x) => x.propertyName === "generalError" || x.propertyName === "error"
    )?.errors?.[0];

    return tryFindError || null;
  }
}

export default TransactionResult;
