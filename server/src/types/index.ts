export interface ErrorResponse {
  message: string;
  status: number;
  stack?: string;
}

export class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
