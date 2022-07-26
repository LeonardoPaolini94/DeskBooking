import {Room} from "./Room";
import {User} from "./User";

export interface Management {
  id ?: number
  capacity ?: number
  startDate ?: Date
  endDate ?: Date
  roomResponseDTO ?: Room
  userResponseDTO ?: User
}
