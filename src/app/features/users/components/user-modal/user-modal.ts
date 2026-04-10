import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User, PhoneType } from '../../store/user.model';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatIcon],
  templateUrl: './user-modal.html',
})
export class UserModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UserModalComponent>);
  private destroyRef = inject(DestroyRef);
  protected data = inject<{ user?: User }>(MAT_DIALOG_DATA);
  private snackBar = inject(MatSnackBar);

  formSubmitted = false;

  userForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: [
      '',
      [
        Validators.required,
        (control: any) => (this.isValidCPF(control.value) ? null : { invalidCpf: true }),
      ],
    ],
    phone: ['', [Validators.required]],
    phoneType: ['CELULAR' as PhoneType, [Validators.required]],
  });

  ngOnInit(): void {
    if (this.data?.user) {
      this.userForm.patchValue(this.data.user);
    }

    this.setupMasks();
  }

  handleSubmit(): void {
    this.formSubmitted = true;

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (!this.userForm.dirty) {
      this.showNoChangesMessage();
      return;
    }

    this.dialogRef.close(this.userForm.value);
  }

  private showNoChangesMessage() {
    this.snackBar.open('Nenhuma alteração foi feita', 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['warning-snackbar'],
    });
  }

  private setupMasks() {
    this.userForm
      .get('cpf')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const formatted = this.formatCPF(value);
        if (value !== formatted) {
          this.userForm.get('cpf')?.setValue(formatted, { emitEvent: false });
        }
      });

    this.userForm
      .get('phone')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const type = this.userForm.get('phoneType')?.value;
        const formatted = this.formatPhone(value, type);
        if (value !== formatted) {
          this.userForm.get('phone')?.setValue(formatted, { emitEvent: false });
        }
      });
  }

  private formatCPF(value: string): string {
    if (!value) return '';
    const numbers = value.replace(/\D/g, '').slice(0, 11);
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  private isValidCPF(cpf: string): boolean {
    if (!cpf) return false;

    const cleaned = cpf.replace(/\D/g, '');

    if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) return false;

    let sum = 0;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleaned[i - 1]) * (11 - i);
    }

    let remainder = (sum * 10) % 11;
    if (remainder >= 10) remainder = 0;
    if (remainder !== parseInt(cleaned[9])) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleaned[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder >= 10) remainder = 0;

    return remainder === parseInt(cleaned[10]);
  }

  private formatPhone(value: string, type: PhoneType): string {
    if (!value) return '';

    const numbers = value.replace(/\D/g, '');

    if (type === 'CELULAR') {
      return numbers
        .slice(0, 11)
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    }

    return numbers
      .slice(0, 10)
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
