import Dexie, { Table } from "dexie";

export interface User {
  id?: number;
  name: string;
  role: "master" | "apprentice";
  shop_name: string;
  language_preference: "en" | "lg";
}

export interface Customer {
  id?: number;
  name: string;
  phone: string;
  photo_url?: string;
  is_loyal: boolean;
  created_at: number;
}

export interface Order {
  id?: number;
  customer_id: number;
  outfit_type: string;
  specifications: string;
  fabric_photo_url?: string;
  due_date: number;
  deposit_paid: number;
  balance: number;
  status: "Measuring" | "In Progress" | "Ready" | "Collected";
  created_by: number;
}

export interface Measurement {
  id?: number;
  customer_id: number;
  order_id?: number;
  unit: "in" | "cm";
  values: Record<string, number>;
  recorded_at: number;
  recorded_by: number;
}

export interface NotificationLog {
  id?: number;
  customer_id: number;
  order_id: number;
  channel: "SMS" | "WhatsApp";
  message: string;
  sent_at: number;
  status: "sent" | "failed";
}

export class TailorBookDB extends Dexie {
  users!: Table<User>;
  customers!: Table<Customer>;
  orders!: Table<Order>;
  measurements!: Table<Measurement>;
  notification_logs!: Table<NotificationLog>;

  constructor() {
    super("TailorBookDB");
    this.version(1).stores({
      users: "++id, role",
      customers: "++id, name, phone, is_loyal",
      orders: "++id, customer_id, status, due_date",
      measurements: "++id, customer_id, order_id, recorded_at",
      notification_logs: "++id, customer_id, order_id, status",
    });
  }
}

export const db = new TailorBookDB();
