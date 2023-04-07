export {};

declare global {
  namespace Express {
    interface Request {
      uuid: string;
    }
  }
  interface Response {
    uuid: string;
  }
}

interface authRequest extends Express.Request {
  userName: string;
}
