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
  TYPE_A = 'TYPE_A',
  TYPE_B = 'TYPE_B',
  TYPE_C = 'TYPE_C',
  TEACHER = 'TEACHER',
}
