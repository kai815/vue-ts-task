export interface IList {
  readonly id: number; //idは途中で変更しないのでreadonly。
  name: string; // 文字列なのでstring型
  cards: ICard[]; // 配列を定義するには 要素[] とする
}

export interface ICard {
  readonly id: number; //idは途中で変更しないのでreadonly。
  text: string; // 文字列なのでstring型
}

export interface IAddCardEvent {
  listId: number;
  text: string;
}