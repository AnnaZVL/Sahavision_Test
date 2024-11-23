<script setup lang="ts">
import IconDelete from "@/components/UI/IconDelete.vue";
import FolderBase from "@/components/Folder/FolderBase.vue";

import { ref, inject, onMounted, onUnmounted } from "vue";
import { list } from "@/mocks/list";

defineProps<{ title: string }>();
const emit = defineEmits({
  updateFolder: (id: number) => {
    return id;
  },
});

const toggleModal = inject<() => void>("toggle-modal");

const isVisible = inject<boolean>("isShow");
const currentFolderId = ref<number | null>(null);

// Передача выбранного id в родительский компонент
const getList = (): void => {
  if (currentFolderId.value) {
    emit("updateFolder", currentFolderId.value);
  }

  if (toggleModal) {
    toggleModal();
  }
  currentFolderId.value = null
};

// Закрытие модалки без передачи выбранного id
const closeModal = (): void => {
  if (toggleModal) {
    toggleModal();
  }
  currentFolderId.value = null
}

// Передать выбранную папку, что бы был выбран только один чекбокс
const selectFolder = (id: number): void => {
  currentFolderId.value = id
}

// Добавление/снятие прокрутки страницы, когда открыта модалка
onMounted(() => {
  document.body.classList.add("scroll-stop");
});

onUnmounted(() => {
  document.body.classList.remove("scroll-stop");
});
</script>

<template>
  <Teleport to="#app">
    <transition name="modal">
      <div class="modal" v-if="isVisible">
        <div class="modal__wrapper" @click="toggleModal"></div>
        <div class="modal__body" @click.stop>
          <button class="modal__close" @click="toggleModal">
            <IconDelete />
          </button>
          <h1 class="modal__title">{{ title }}</h1>

          <div class="modal__list">
            <FolderBase
              v-for="folder in list"
              :key="folder.id"
              :folder="folder"
              :current-id="currentFolderId"
              @change="selectFolder"
            />
          </div>
          <div class="modal__actions">
            <button class="btn modal__btn" @click="getList">Ок</button>
            <button class="btn modal__btn" @click="closeModal">Закрыть</button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out,
    transform 0.3s ease-in-out;
}

.modal__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(10, 31, 56, 0.5);
}

.modal__body {
  padding: 40px;
  min-width: 20%;
  max-width: 30%;
  max-height: 60vh;
  background-color: var(--color-white);
  border-radius: 40px;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

.modal__list {
  overflow-y: auto;
}

.modal__title {
  margin: 0;
  font-size: 24px;
}

.modal__close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid transparent;
  background: var(--color-prime);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.modal__close:hover {
  transform: rotate(45deg);
}

.modal__actions {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  justify-items: flex-end;
}

.modal__btn {
  margin-top: 0;
}
</style>
