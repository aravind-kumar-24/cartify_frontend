import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../../components/side-bar/side-bar';

@Component({
  selector: 'app-buyer-layout',
  imports: [Header, Footer, RouterOutlet, SideBar],
  templateUrl: './buyer-layout.html',
  styleUrl: './buyer-layout.css',
})
export class BuyerLayout {}
