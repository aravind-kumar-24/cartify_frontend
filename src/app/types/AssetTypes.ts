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