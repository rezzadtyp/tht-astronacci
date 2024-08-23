export interface User {
  id: number;
  name: string;
  email: string;
  provider: Provider;
  role: Role;
}

enum Provider {
  CREDENTIALS = 'CREDENTIALS',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

enum Role {
  USER = 'USER',
  TEACHER = 'TEACHER',
}
