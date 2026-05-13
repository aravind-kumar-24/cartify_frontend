import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { features, categories, banners, cards } from '../../helpers/homePageHelper';
import { featuresType, categoriesType, bannerType, cardType } from '../../types/AssetTypes';

@Component({
    selector: 'app-home',
    imports: [Header, Footer, CommonModule, MatIconModule, RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home implements OnInit {

    features: featuresType[] = [];
    categories: categoriesType[] = [];
    banners: bannerType[] = [];
    cards: cardType[] = [];

    ngOnInit(): void {
        this.features = features;
        this.categories = categories;
        this.banners = banners;
        this.cards = cards;
    }

}
