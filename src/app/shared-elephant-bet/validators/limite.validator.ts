import { AbstractControl } from '@angular/forms';

export function ValidateLimite(control: AbstractControl) {
	if (control.value < 50000) {
		return { invalidLimite: true };
	}
	return null;
}
