import { Component, OnInit } from '@angular/core';
import { sellerOptionsType, buyerOptionsType } from '../../types/AssetTypes';
import { sellerOptions, buyerOptions } from '../../helpers/sideBarHelper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [MatIconModule, MatTooltipModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar implements OnInit{

  navbarOptions : sellerOptionsType[] | buyerOptionsType[] = [];
  isCollapsed : boolean = false;

  ngOnInit(): void {
    const role = localStorage.getItem('role');

    this.navbarOptions = role === 'Buyer' ? buyerOptions : sellerOptions;
  }

  toggleSideBar(){
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    
  }
}
