import TransactionError from "./transaction-error";

class TransactionResult<T> {
  success: boolean;

  model: T;

  error: Array<TransactionError>;

  get generalError(): string | null {
    if (!this.error || !Array.isArray(this.error)) {
      return null;
    }

    const tryFindError = this.error.find(
      (x) => x.propertyName === "generalError" || x.propertyName === "error"
    )?.errors?.[0];

    return tryFindError || null;
  }
}

export default TransactionResult;
