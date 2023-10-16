export default class ResponseAxiosError extends Error {
  public readonly status: number;
  public readonly errors: {[key: string]: string[]};

  constructor(
    message: string,
    status = 400,
    errors: {[key: string]: string[]} = {},
  ) {
    super(message);
    this.name = 'ResponseAxiosError';
    this.status = status;
    this.errors = errors;
  }
}
