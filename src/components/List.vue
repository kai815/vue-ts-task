<template>
  <div class="list">
    <div
      :contenteditable="contenteditable"
      @dbclick="onDoubleClick"
      @keypress.enter="onKeyPressEnter"
      @blur="onBlur"
    >
      <Cross @click="removeList" />
      {{ list.name }}
    </div>
    <Card
      v-for="card in list.cards"
      :key="card.id"
      :listId="list.id"
      :card="card"
      :cardText.sync="card.text"
      @remove-card="removeCard"
    />
    <input type="text" @change="addCard" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, PropSync } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import Cross from "@/components/Cross.vue";
import { IList, IAddCardEvent, IRemoveCardEvent } from "@/types";

@Component({
  components: {
    Card,
    Cross
  }
})
export default class List extends Vue {
  @Prop({ type: Object, required: true })
  // 「!」はNon-null assertion operator
  list!: IList;

  contenteditable = false;

  // computed（算出プロパティ）のgetterとsetterのようになる
  @PropSync("listName", { type: String, required: true })
  syncedListName!: IList["name"];

  @Emit()
  addCard(event: Event & { currentTarget: HTMLInputElement }): IAddCardEvent {
    // 次の処理でリセットしてしまうので変数に格納
    const text = event.currentTarget.value;
    // フォームの値をリセット
    event.currentTarget.value = "";
    // 返す内容が複数あるのでオブジェクトで返す
    return {
      listId: this.list.id,
      text
    };
  }

  @Emit()
  removeList(): number {
    return this.list.id;
  }
  @Emit()
  removeCard(event: IRemoveCardEvent): IRemoveCardEvent {
    return event;
  }

  onDoubleClick(event: MouseEvent & { currentTarget: HTMLDivElement }): void {
    // 要素のテキストを編集可能にする
    this.contenteditable = true;
    //フォーカスを当てる
    event.currentTarget.focus();
  }

  onKeyPressEnter(
    event: KeyboardEvent & { currentTarget: HTMLDivElement }
  ): void {
    // フォーカスを外す
    event.currentTarget.blur();
  }

  onBlur(event: FocusEvent & { currentTarget: HTMLDivElement }): void {
    this.syncedListName = event.currentTarget.innerText;
    // 要素のテキストを編集不可にする
    this.contenteditable = false;
  }
}
</script>

<style lang="scss" scoped>
.list {
  border: 1px solid #000000;
  > .card {
    margin: 1px;
  }
}
</style>
