import { render, screen } from '@testing-library/angular';
import { describe, it, expect, vi } from 'vitest';
import { UserCardComponent } from './user-card';
import '../../../../../setup-tests';

describe('UserCardComponent', () => {
  // ✅ 1. Testa renderização
  it('should render user data', async () => {
    await render(UserCardComponent, {
      componentInputs: {
        user: {
          id: '1',
          name: 'Anderson',
          email: 'anderson@email.com',
          cpf: '12345678900',
          phone: '11999999999',
          phoneType: 'CELULAR',
        },
      },
    });

    expect(screen.getByText('Anderson')).toBeTruthy();
    expect(screen.getByText('anderson@email.com')).toBeTruthy();
  });

  // ✅ 2. Testa emissão de evento (🔥 isso que faltava)
  it('should emit edit event when button is clicked', async () => {
    const user = {
      id: '1',
      name: 'Anderson',
      email: 'anderson@email.com',
      cpf: '12345678900',
      phone: '11999999999',
      phoneType: 'CELULAR',
    };

    const { fixture } = await render(UserCardComponent, {
      componentInputs: { user },
    });

    const component = fixture.componentInstance;

    const spy = vi.spyOn(component.edit, 'emit');

    const button = fixture.nativeElement.querySelector('button');

    button.click();

    expect(spy).toHaveBeenCalledWith(user);
  });
});
