import {Role} from "./Role";

export interface User{
  id ?: number
  firstName : string,
  lastName : string,
  email : string,
  password : string,
  phoneNumber : string,
  avatar : string,
  role : Role;
}
