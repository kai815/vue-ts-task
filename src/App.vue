<template>
  <div id="app">
    <List
      v-for="list in lists"
      class="list"
      :key="list.id"
      :list="list"
      :listName.sync="list.name"
      @add-card="addCard"
    />
    <input type="text" @change="addList" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import List from "@/components/List.vue";
import { IList, IAddCardEvent } from "@/types";
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
