
import { sellerOptionsType, buyerOptionsType } from "../types/AssetTypes"

export const sellerOptions : sellerOptionsType[] = [
    { id : 1, label : 'Dashboard', icon : 'dashboard', route : '/seller/seller-dashboard' },
    { id : 2, label : 'Products', icon : 'inventory_2', route : '' },
    { id : 3, label : 'Orders', icon : 'receipt_long', route : '' },
    { id : 4, label : 'Store Settings', icon : 'store', route : '' },
    { id : 5, label : 'Profile', icon : 'manage_accounts', route : '/seller/seller-profile' },
]

export const buyerOptions : buyerOptionsType[] = [
    {id : 1, label : 'Home', icon : 'home', route : ''},
    {id : 2, label : 'Shop', icon : 'storefront', route : ''},
    {id : 3, label : 'My Orders', icon : 'receipt_long', route : ''},
    {id : 4, label : 'Wishlist', icon : 'favorite', route : ''},
    {id : 5, label : 'Profile', icon : 'manage_accounts', route : ''},
]