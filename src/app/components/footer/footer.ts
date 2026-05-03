import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-footer',
    imports: [MatToolbar, MatIconModule, MatButtonModule],
    templateUrl: './footer.html',
    styleUrl: './footer.css',
})
export class Footer implements OnInit{

    currentYear !: number;

    ngOnInit(): void {
        this.currentYear = new Date().getFullYear();
    }
}
