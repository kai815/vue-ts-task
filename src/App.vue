<template>
  <div id="app">
    <List
      v-for="list in lists"
      class="list"
      :key="list.id"
      :list="list"
      :listName.sync="list.name"
      @add-card="addCard"
      @remove-list="removeList"
      @remove-card="removeCard"
    />
    <input type="text" @change="addList" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import List from "@/components/List.vue";
import { IList, IAddCardEvent, IRemoveCardEvent } from "@/types";
import { createInitialLists } from "@/initialData";

@Component({
  components: {
    List
  }
})
export default class App extends Vue {
  lists: IList[] = createInitialLists();
  listCreateCount = 2;
  cardCreatedCount = 4;
  // Event型に{ currentTarget: HTMLInputElement }を追加
  addList(event: Event & { currentTarget: HTMLInputElement }): void {
    const newList = {
      id: this.listCreateCount + 1,
      name: event.currentTarget.value,
      cards: []
    };
    this.lists.push(newList);
    // listsに追加されたので、listCreateCountを増やす
    ++this.listCreateCount;
    // フォームの値をリセット
    event.currentTarget.value = "";
  }

  // @emitで実行したaddCardからの戻り値を受け取る
  addCard({ listId, text }: IAddCardEvent): void {
    const list = this.lists.find(list => list.id === listId);
    /*
    findは見つからなかった場合undefinedを返す可能性があるので、その場合は早期リターンする
    （ここではlist: IList | undefined）
    */
    if (list === undefined) return;
    const newCard = {
      id: this.cardCreatedCount + 1,
      text
    };
    // ここではlist: IList
    list.cards.push(newCard);

    ++this.cardCreatedCount;
  }

  // @emitで実行したremoveListからの戻り値を受け取っている
  removeList(listId: number): void {
    const listIndex = this.lists.findIndex(list => list.id === listId);
    // findIndexで見つからない場合は-1を返すのでその場合は早期リターン
    if (listIndex === -1) return;
    this.lists.splice(listIndex, 1);
  }

  removeCard({ listId, cardId }: IRemoveCardEvent): void {
    const list = this.lists.find(list => list.id === listId);
    if (list === undefined) return;
    const cardIndex = list.cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) return;
    list.cards.splice(cardIndex, 1);
  }
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  > .list {
    margin: 1px;
  }
}
</style>
