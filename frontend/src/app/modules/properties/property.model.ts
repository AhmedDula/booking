export interface Property {
  _id: string;
  title: string; 
  description: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  pricePerNight?: number;
  propertyType: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  amenities: string[];
  isDeleted: boolean;
  createdAt: string; 
  updatedAt: string;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
}


// export interface Property {
//   _id: string;
//   title: string;
//   description: string;
//   location: {
//     country: string;
//     city: string;
//     address: string;
//   };
//   pricePerNight?: number;
//   propertyType: string;
//   rating: number;
//   reviewsCount: number;
//   images: string[];
//   amenities: string[];
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface APIResponse<T> {
//   data: T;
//   success: boolean;
// }
