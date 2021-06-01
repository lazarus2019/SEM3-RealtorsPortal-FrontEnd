import { AbstractControl, ValidatorFn } from '@angular/forms';

export function max(value: Number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const input = control.value, isValid = input > value;
        if (isValid) {
            return { 'max': { value } }
        }
        else {
            return { 'max': null };
        }
    };
}