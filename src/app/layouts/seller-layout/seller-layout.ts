import { Component } from '@angular/core';
import { SideBar } from '../../components/side-bar/side-bar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-seller-layout',
  imports: [SideBar, RouterOutlet, Header, Footer],
  templateUrl: './seller-layout.html',
  styleUrl: './seller-layout.css',
})
export class SellerLayout {}
