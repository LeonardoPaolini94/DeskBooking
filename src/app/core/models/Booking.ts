import {User} from "./User";
import {RoomStatus} from "./RoomStatus";

export interface Booking {
  id ?: number,
  bookDate ?: Date,
  room ?: RoomStatus,
  user ? : User
}
