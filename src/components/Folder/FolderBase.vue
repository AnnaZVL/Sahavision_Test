<script setup lang="ts">
import IconArrow from "../UI/IconArrow.vue";
import FolderBase from "./FolderBase.vue";

import { ref, computed } from "vue";
import { type Folder } from "@/mocks/list.ts";

const props = defineProps<{ folder: Folder; currentId: number | null }>();

const isShow = ref<boolean>(false);

defineEmits({
  change: (id: number) => {
    return id;
  },
});

// Открытие дочерней папки
const toggleBody = (): void => {
  isShow.value = !isShow.value;
};

// Для выбора только одного чекбокса
const isChecked = computed(() => props.folder.id === props.currentId);

</script>

<template>
  <div class="folder">
    <div class="folder__top">
      <input
        type="checkbox"
        name="folder"
        id="folder"
        :checked="isChecked"
        @change="$emit('change', folder.id)"
      />
      <h4 class="folder__name">{{ folder.name }}</h4>
      <button
        class="arrow"
        :class="{ open: isShow }"
        v-if="folder.children && folder.children.length"
        @click="toggleBody"
      >
        <IconArrow />
      </button>
    </div>
    <div class="body" v-if="isShow">
      <FolderBase
        v-for="child in folder.children"
        :key="child.id"
        :folder="child"
        :current-id="currentId"
        @change="$emit('change', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.folder {
  width: 100%;
}

.folder__top {
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: background 0.3s ease-in-out;
}

.folder__top:hover {
  background: var(--color-grey);
}

.folder__name {
  margin: 0;
}

.arrow {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.arrow.open {
  transform: rotate(180deg);
}

.body {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
