export type BusinessType = {
    id: number,
    business_type_name: string
};

export type BusinessTypeResponse = {
    business_types: BusinessType[]
}

export type States = {
    id: number,
    state_name: string
}

export type StatesResponse = {
    states: States[]
}

export type Cities = {
    id: number,
    city_name: string
}

export type CitiesResponse = {
    cities: Cities[]
}

export type userTypes = 'Buyer' | 'Seller';

export type AuthenticatedResponse = {
    access_token: string,
    message: string,
    token_type: string,
    role : string,
    encrypted_role : string,
}

export type CountResponse = {
    count : number;
    message : string;
}

export type featuresType = {
    id : number,
    icon : string,
    title : string,
    subTitle : string
}

export type categoriesType = {
    id : number;
    icon : string,
    category : string,
    hot : boolean
}

export type bannerType = {
    id : number;
    icon : string,
    bannerEyebrow : string,
    bannerHeading : string,
    bannerSubject : string,
    bannerLinkSubject : string,
    bannerRoute : string,
    type : string
}

export type cardType = {
    id : number,
    icon : string,
    cardLabel : string,
    cardHeading : string,
    cardSubject : string,
    cardButton : string,
    cardRoute : string,
    cardType : string
}

export type sellerOptionsType = {
    id : number,
    label : string,
    icon : string,
    route : string
};

export type buyerOptionsType = {
    id : number,
    label : string,
    icon : string,
    route : string
};

export type UserDetailsResponse = {
    message: string,
    user_data : any[]
}