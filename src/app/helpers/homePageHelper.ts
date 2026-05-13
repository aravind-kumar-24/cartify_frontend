

import { featuresType, categoriesType, bannerType, cardType } from "../types/AssetTypes"

export const features : featuresType[] = [
    {
        id : 1,
        icon : 'bolt',
        title : 'Fast delivery',
        subTitle : 'Same-day across TN'
    },
    {
        id : 2,
        icon : 'lock',
        title : 'Secure pay',
        subTitle : 'Razorpay powered'
    },
    {
        id : 3,
        icon : 'inventory_2',
        title : 'Track orders',
        subTitle : 'Real-time updates'
    },
    {
        id : 4,
        icon : 'local_offer',
        title : 'Member deals',
        subTitle : 'Exclusive pricing'
    },

]

export const categories : categoriesType[] = [
    {
        id : 1,
        icon: 'devices',
        category : 'Electronics',
        hot: false
    },
    {
        id : 2,
        icon: 'checkroom',
        category : 'Fashion',
        hot: false
    },
    {
        id : 3,
        icon: 'chair',
        category : 'Home & Living',
        hot: false
    },
    {
        id : 4,
        icon: 'auto_awesome',
        category : 'New Arrivals',
        hot: false
    },
    {
        id : 5,
        icon: 'local_fire_department',
        category : 'Deals',
        hot: true
    },
]

export const banners : bannerType[] = [
    {
        id: 1,
        icon : 'local_fire_department',
        bannerEyebrow : 'Flash deals — today only',
        bannerHeading : 'Up to 60% off across all categories',
        bannerSubject : 'Login to unlock exclusive member pricing',
        bannerLinkSubject : 'Login to shop',
        bannerRoute : "/auth/login",
        type:'login'
    },
    {
        id: 2,
        icon : 'auto_awesome',
        bannerEyebrow : 'Just dropped',
        bannerHeading : 'New arrivals this week',
        bannerSubject : 'Fresh picks from sellers across Tamil Nadu',
        bannerLinkSubject : 'View new arrivals',
        bannerRoute : "",
        type:'new_arrivals'
    },
]

export const cards : cardType[] = [
    {
        id : 1,
        icon : 'devices',
        cardLabel : 'Electronics',
        cardHeading : 'Top gadgets & devices',
        cardSubject : 'Phones, laptops, audio, and more from verified Tamil Nadu sellers.',
        cardButton : 'Browse electronics',
        cardRoute : '',
        cardType : 'electronics'
    },
    {
        id : 2,
        icon : 'checkroom',
        cardLabel : 'Fashion',
        cardHeading : 'Style for every season',
        cardSubject : 'Kurtas, casuals, formals — curated from local boutiques.',
        cardButton : 'Browse fashion',
        cardRoute : '',
        cardType : 'fashion'
    },
    {
        id : 3,
        icon : 'chair',
        cardLabel : 'Home & Living<',
        cardHeading : 'Furnish your space',
        cardSubject : 'Decor, kitchen, storage, and lifestyle essentials.',
        cardButton : 'Browse home & living',
        cardRoute : '',
        cardType : 'home'
    },
    {
        id : 4,
        icon : 'storefront',
        cardLabel : 'Become a seller',
        cardHeading : 'Start selling today',
        cardSubject : 'Zero commission for 3 months. Razorpay instant payouts. Reach buyers across Tamil Nadu.',
        cardButton : 'Register as seller',
        cardRoute : '/auth/register-seller',
        cardType : 'seller'
    },
]