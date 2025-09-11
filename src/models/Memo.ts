export interface Memo {
  memoId: number;
  memo: string;
  date: string;
  clientId: string;
}

export interface MyMemo extends Memo {
  wineId: number;
  wineEname: string;
  wineKname: string;
  wineImage: string | null;
}
