
export interface User {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface APIResponse<T> {
    success: boolean;
    user?: T;
    message?: string;
  }
  