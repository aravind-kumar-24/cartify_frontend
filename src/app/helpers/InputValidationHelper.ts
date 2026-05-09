import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class InputValidationHelper {
    static passwordMissmatchValidator(form: AbstractControl) : ValidationErrors | null{
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirm_password')?.value;
        return password === confirmPassword ? null : {passwordMismatch : true}
    }

    static blockSpace(event: KeyboardEvent, field: string): void {
        const fields = ['first_name', 'last_name', 'business_address', 'business_name'];

        if (event.key !== ' ') return;

        if (fields.includes(field)) {
            const input = event.target as HTMLInputElement;
            const cursorPos = input.selectionStart ?? 0;
            const value = input.value;
            if (cursorPos === 0 || value[cursorPos - 1] === ' ') {
                event.preventDefault();
            }
        } else {
            event.preventDefault();
        }
    }

    static restrictionsOnInput(value: string, field: string): string {
        if (field === 'first_name' || field === 'last_name' || field === 'business_address' || field === 'business_name') {
            value = value.replace(/^\s+/, '');
            value = value.replace(/\s{2,}/g, ' ');
        } else if (
            field === 'email_id' ||
            field === 'password' ||
            field === 'confirm_password'
        ) {
            value = value.replace(/\s/g, '');
        } else if (field === 'mobile_number' || field === 'pincode') {
            value = value.replace(/\s/g, '');
            value = value.replace(/[^0-9]/g, '');
        }
        return value;
    }
}