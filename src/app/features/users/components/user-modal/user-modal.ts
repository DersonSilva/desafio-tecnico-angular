import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User, PhoneType } from '../../store/user.model';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './user-modal.html',
})
export class UserModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UserModalComponent>);
  private destroyRef = inject(DestroyRef);
  protected data = inject<{ user?: User }>(MAT_DIALOG_DATA);

  // 🔥 FORM CORRIGIDO (sem erro de this)
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
    phoneType: ['CELULAR' as PhoneType],
  });

  ngOnInit(): void {
    if (this.data?.user) {
      this.userForm.patchValue(this.data.user);
    }

    this.setupMasks();
  }

  // 🔥 MÁSCARAS
  private setupMasks() {
    // CPF
    this.userForm
      .get('cpf')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const formatted = this.formatCPF(value);
        if (value !== formatted) {
          this.userForm.get('cpf')?.setValue(formatted, { emitEvent: false });
        }
      });

    // TELEFONE
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

    // ALTERA TIPO
    this.userForm
      .get('phoneType')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const phone = this.userForm.get('phone')?.value;
        const type = this.userForm.get('phoneType')?.value;
        const formatted = this.formatPhone(phone, type);
        this.userForm.get('phone')?.setValue(formatted, { emitEvent: false });
      });
  }

  // ✅ FORMAT CPF
  private formatCPF(value: string): string {
    if (!value) return '';

    const numbers = value.replace(/\D/g, '').slice(0, 11);

    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  // ✅ VALIDAR CPF REAL
  private isValidCPF(cpf: string): boolean {
    if (!cpf) return false;

    const cleaned = cpf.replace(/\D/g, '');

    if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder >= 10) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder >= 10) remainder = 0;

    return remainder === parseInt(cleaned.substring(10, 11));
  }

  // ✅ TELEFONE DINÂMICO
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

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
