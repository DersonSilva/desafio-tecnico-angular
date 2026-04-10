import { User } from '../store/user.model';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Anderson Silva',
    email: 'anderson@example.com',
    cpf: '123.456.789-00',
    phone: '11999999999',
    phoneType: 'CELULAR',
  },
  {
    id: '2',
    name: 'Maria Souza',
    email: 'maria@example.com',
    cpf: '987.654.321-00',
    phone: '1133333333',
    phoneType: 'FIXO',
  },
  {
    id: '3',
    name: 'João Pereira',
    email: 'joao@example.com',
    cpf: '456.789.123-00',
    phone: '11988888888',
    phoneType: 'CELULAR',
  },
];
