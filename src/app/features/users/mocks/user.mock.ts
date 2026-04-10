import { User } from '../store/user.model';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Anderson Silva',
    email: 'anderson@example.com',
    cpf: '648.430.230-86',
    phone: '11999999999',
    phoneType: 'CELULAR',
  },
  {
    id: '2',
    name: 'Maria Souza',
    email: 'maria@example.com',
    cpf: '759.018.920-03',
    phone: '1133333333',
    phoneType: 'FIXO',
  },
  {
    id: '3',
    name: 'João Pereira',
    email: 'joao@example.com',
    cpf: '260.251.490-03',
    phone: '11988888888',
    phoneType: 'CELULAR',
  },
];
