export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string | null;
  password: string;
  createdAt: Date;
  professional?: Professional | null;
  userRoles?: UserRole[];
  reviewsGiven?: Review[];
}

export interface UserRole {
  id: number;
  userId: number;
  roleId: number;
  user: User;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
  userRoles: UserRole[];
}

export interface Professional {
  id: number;
  userId: number;
  description: string | null;
  profileImage: string | null;
  isVerified: boolean;
  rating: number | null;
  location: string;
  latitude: number | null;
  longitude: number | null;
  serviceRadius: number | null;
  contactWhatsApp: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  createdAt: Date;
  services?: ProfessionalService[];
  images?: ProfessionalImage[];
  reviews?: Review[];
  areas?: ProfessionalArea[];
}

export interface ProfessionalService {
  id: number;
  professionalId: number;
  serviceId: number;
  professional: Professional;
  service: Service;
}

export interface ProfessionalImage {
  id: number;
  professionalId: number;
  url: string;
  createdAt: Date;
  professional: Professional;
}

export interface ProfessionalArea {
  id: number;
  professionalId: number;
  areaId: number;
  professional: Professional;
  area: Area;
}

export interface Service {
  id: number;
  categoryId: number;
  name: string;
  description: string | null;
  category: Category;
  professionals: ProfessionalService[];
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  services: Service[];
}

export interface Area {
  id: number;
  nombre: string;
  comuna: number | null;
  perimetro: number | null;
  area: number | null;
  type: string;
  professionals: ProfessionalArea[];
}

export interface Review {
  id: number;
  reviewerId: number;
  professionalId: number;
  rating: number;
  comment: string | null;
  createdAt: Date;
  reviewer: User;
  professional: Professional;
} 