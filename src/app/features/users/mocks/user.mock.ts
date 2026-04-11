import { User } from '../store/user.model';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Bruno Souza',
    email: 'brunosouza@gmail.com',
    cpf: '648.430.230-86',
    phone: '(61) 992478156',
    phoneType: 'CELULAR',
  },
  {
    id: '2',
    name: 'Maria Souza',
    email: 'mariasouza@gmail.com',
    cpf: '759.018.920-03',
    phone: '(61) 3591-3698',
    phoneType: 'FIXO',
  },
  {
    id: '3',
    name: 'João Pereira',
    email: 'joaopereira55@gmail.com',
    cpf: '260.251.490-03',
    phone: '(61) 99215-8745',
    phoneType: 'CELULAR',
  },
];
