// lib/types.ts

export interface Equipment {
  EquipID: string;
  Name: string;
  Category: string;
  SerialNo?: string;
  Location: string;
  TotalQty: number;
  AvailableQty: number;
  BorrowedQty: number;
  Status: string;
  ImageUrl?: string;
  UpdatedAt: string;
}