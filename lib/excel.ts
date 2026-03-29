// lib/excel.ts
import { graphFetch } from "./graph";

const workbookCache = new Map<string, string>();

export async function resolveWorkbookId(token: string, path: string): Promise<string> {
  if (workbookCache.has(path)) return workbookCache.get(path)!;

  const res = await graphFetch(token, `/me/drive/root:${path}`);
  const id = res.id;

  workbookCache.set(path, id);
  return id;
}

export async function readTableRows(token: string, workbookId: string, tableName: string) {
  const res = await graphFetch(
    token,
    `/me/drive/items/${workbookId}/workbook/tables/${tableName}/rows`
  );

  return res.value; // array of rows
}

export async function addHistoryRow(token: string, workbookId: string, values: any[]) {
  return graphFetch(
    token,
    `/me/drive/items/${workbookId}/workbook/tables/tblStockHistory/rows/add`,
    {
      method: "POST",
      body: JSON.stringify({ values: [values] }),
    }
  );
}

export async function updateEquipmentRow(
  token: string,
  workbookId: string,
  rowIndex: number,
  values: any[]
) {
  return graphFetch(
    token,
    `/me/drive/items/${workbookId}/workbook/tables/tblEquipment/rows/${rowIndex}/range`,
    {
      method: "PATCH",
      body: JSON.stringify({ values: [values] }),
    }
  );
}