import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from "../../components/loader/loader";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, Loader],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
