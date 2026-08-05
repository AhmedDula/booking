export interface Room{
    _id: string;
    property: string;
    name: string;
    description: string;
    price: number;
    maxGuests: number;
    beds: number;
    bathrooms: number;
    roomSize: number;
    images: string[];
    amenities: string[];
    available: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface APIResponse<T> {
    data: T;
    message: string;
    
}