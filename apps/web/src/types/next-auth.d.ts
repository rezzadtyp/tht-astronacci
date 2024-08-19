import { User } from './user.type';

interface Payload extends User {
  token: string;
}

declare module 'next-auth' {
  interface Session {
    user: Payload;
  }
}
