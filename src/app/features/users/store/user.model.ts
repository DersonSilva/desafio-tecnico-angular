export type PhoneType = 'CELULAR' | 'FIXO';

export interface User {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  phoneType: PhoneType;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  filter: string;
}
