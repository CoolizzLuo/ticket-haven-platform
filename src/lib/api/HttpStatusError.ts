export class HttpStatusError extends Error {
  status: number;

  data: unknown;

  constructor(status: number, message: string, data: unknown) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.status = status;
    this.data = data;
  }
}
