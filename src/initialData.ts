import { IList } from "@/types";

// : IList[]と書くことtypes.tsで定義したIListのinterfaceと異なるとエラーを出してくれる
export function createInitialLists(): IList[] {
  return [
    {
      id: 1,
      name: 'リスト1',
      cards: [
        {
          id: 1,
          text: "タスク1"
        },
        {
          id: 2,
          text: "タスク2"
        }
      ]
    },
    {
      id: 2,
      name: "リスト2",
      cards: [
        {
          id: 3,
          text: "タスク3"
        },
        {
          id: 4,
          text: "タスク4"
        }
      ]
    }
  ];
}