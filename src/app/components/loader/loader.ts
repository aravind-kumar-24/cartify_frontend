import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/Loader/loader-service';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loader',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './loader.html',
    styleUrl: './loader.css',
})
export class Loader implements OnInit {

    loading$ !: Observable<boolean>;

    constructor(
        private loaderService: LoaderService
    ) {

    }

    ngOnInit(): void {
        this.loading$ = this.loaderService.loading$;
    }
}
