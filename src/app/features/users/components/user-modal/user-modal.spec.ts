import { render } from '@testing-library/angular';
import { describe, it, expect, vi } from 'vitest';
import { UserModalComponent } from './user-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import '../../../../../setup-tests';

describe('UserModalComponent', () => {
  let component: UserModalComponent;

  async function setup(data: any = {}) {
    const mockDialogRef = {
      close: vi.fn(),
    };

    const mockSnackBar = {
      open: vi.fn(),
    };

    const result = await render(UserModalComponent, {
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    });

    component = result.fixture.componentInstance;

    return {
      component,
      dialogRef: mockDialogRef,
      snackBar: mockSnackBar,
    };
  }

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should start with invalid form', async () => {
    const { component } = await setup();
    expect(component.userForm.invalid).toBe(true);
  });

  it('should validate email correctly', async () => {
    const { component } = await setup();

    const email = component.userForm.get('email');

    email?.setValue('email-invalido');
    expect(email?.invalid).toBe(true);

    email?.setValue('teste@teste.com');
    expect(email?.valid).toBe(true);
  });

  it('should not submit when form is invalid', async () => {
    const { component, dialogRef } = await setup();

    component.handleSubmit();

    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should submit when form is valid', async () => {
    const { component, dialogRef } = await setup();

    component.userForm.setValue({
      id: null,
      name: 'Anderson',
      email: 'anderson@email.com',
      cpf: '12345678909',
      phone: '11999999999',
      phoneType: 'CELULAR',
    });

    component.userForm.markAsDirty();

    component.handleSubmit();

    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should not submit if form is pristine', async () => {
    const { component, dialogRef } = await setup();

    component.userForm.setValue({
      id: null,
      name: 'Anderson',
      email: 'anderson@email.com',
      cpf: '12345678909',
      phone: '11999999999',
      phoneType: 'CELULAR',
    });

    component.userForm.markAsPristine();

    component.handleSubmit();

    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should keep form invalid with invalid CPF', async () => {
    const { component } = await setup();

    component.userForm.setValue({
      id: null,
      name: 'Anderson',
      email: 'anderson@email.com',
      cpf: '11111111111',
      phone: '11999999999',
      phoneType: 'CELULAR',
    });

    expect(component.userForm.invalid).toBe(true);
  });
});
