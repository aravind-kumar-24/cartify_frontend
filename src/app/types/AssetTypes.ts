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
    role : string
}

export type CountResponse = {
    count : number;
    message : string;
}