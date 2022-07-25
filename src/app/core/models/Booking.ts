import {User} from "./User";
import {Room} from "./Room";

export interface Booking {
  id ?: number,
  bookDate ?: Date,
  roomResponseDTO ?: Room,
  userResponseDTO ? : User
}
