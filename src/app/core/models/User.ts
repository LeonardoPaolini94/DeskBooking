import {Role} from "./Role";

export interface User{
  name : string,
  lastname : string,
  phone : string,
  email : string,
  password : string,
  avatar? : string,
  role? : Role;
}
