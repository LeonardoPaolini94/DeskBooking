import {Room} from "./Room";
import {User} from "./User";

export interface Booking {
  id ?: number,
  bookDate ?: Date,
  room ?: Room,
  user ?: User
}
