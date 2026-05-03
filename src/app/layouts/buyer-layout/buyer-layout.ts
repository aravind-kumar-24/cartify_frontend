import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-buyer-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './buyer-layout.html',
  styleUrl: './buyer-layout.css',
})
export class BuyerLayout {}
