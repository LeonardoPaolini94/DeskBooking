import {RoleResponseDTO} from "./RoleResponseDTO";

export interface User{
  id ?: number
  firstName : string,
  lastName : string,
  email : string,
  password : string,
  phoneNumber : string,
  avatar : string,
  roleResponseDTO : RoleResponseDTO;
}
