<template>
  <div class="list">
    {{ list.name }}
    <Card v-for="card in list.cards" :key="card.id" :card="card" />
    <input type="text" @change="addCard" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import { IList, IAddCardEvent } from "@/types";

@Component({
  components: {
    Card
  }
})
export default class List extends Vue {
  @Prop({ type: Object, required: true })
  // 「!」はNon-null assertion operator
  list!: IList;

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
