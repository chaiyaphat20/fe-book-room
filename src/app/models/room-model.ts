export interface RoomResponse {
  _id: string
  name: string;
  limit: number;
  users: User[];
  reservedSeats: number,
  remainingSeats: number
}

export interface User {
  firstName: string;
  lastName: string;
  phone: string;
}
