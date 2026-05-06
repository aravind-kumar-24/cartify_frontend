import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

type errorTypes = 'success' | 'error' | 'info' | 'warning';

@Injectable({
    providedIn: 'root',
})
export class ToasterService {

    constructor(
        private snackBar : MatSnackBar
    ){

    }

    showToast(message: string, type: errorTypes) {
        this.snackBar.open(message, 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: [`snack-${type}`]
        });
    }

    success(message: string) {
        this.showToast(message, 'success');
    }
    
    error(message: string) {
        this.showToast(message, 'error');
    }

    info(message: string) {
        this.showToast(message, 'info');
    }

    warning(message: string) {
        this.showToast(message, 'warning');
    }
}
