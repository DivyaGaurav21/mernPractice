import { RowDataPacket } from "mysql2";


export interface AuthBody {
  name?: unknown;
  email?: unknown;
  password?: unknown;
}

export interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
}