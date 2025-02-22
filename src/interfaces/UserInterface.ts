
export interface User {
    user_id:number,
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    profile_pic: string,
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

  export interface UserInterface {
    user: any;
    setUser: (user: any) => void;
  }
  