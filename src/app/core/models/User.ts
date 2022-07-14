import {Role} from "./Role";

export interface User{
  id : number
  name : string,
  lastname : string,
  phone : string,
  email : string,
  password : string,
  avatar : string,
  role : Role;
}
