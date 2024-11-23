<script setup lang="ts">
import ModalBase from "@/components/Modal/ModalBase.vue";

import { computed, provide, ref } from "vue";
import { list, type Folder } from "./mocks/list";

const isShow = ref<boolean>(false);
const currentFolderId = ref<number | null>();

provide("toggle-modal", showModal);
provide("isShow", isShow);

// Открытие/закрытие модалки
const showModal = () => {
  if (!isShow.value) {
    currentFolderId.value = null
  }
  isShow.value = !isShow.value;
};

// Передача id выбранной папки
const changeFolder = (id: number | null): void => {
  currentFolderId.value = id
}

// Поиск папки в массиве по id
const findFolderById = (folders: Folder[], id: number | undefined): Folder | undefined => {
  for (const folder of folders) {
    if (folder.id === id) {
      return folder;
    }
    if (folder.children) {
      const found = findFolderById(folder.children, id);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};

// Вывод выбранной папки
const currentFolder = computed((): Folder |undefined | null => {
  if (currentFolderId.value === null) return null;
  return findFolderById(list, currentFolderId.value);
})
</script>

<template>
  <main class="main">
    <button class="btn" @click="showModal">Открыть список</button>

    <p v-if="currentFolderId">Вы выбрали " {{ currentFolder?.name }} "</p>
  </main>

  <ModalBase title="Список папок" @update-folder="changeFolder"></ModalBase>
</template>

<style scoped></style>
