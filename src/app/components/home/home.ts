import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
