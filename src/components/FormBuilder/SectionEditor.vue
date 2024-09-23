<template>
  <Modal @close="closeEditor">
    <div class="section-editor">
      <h2 class="section-editor__title">
        {{ isEditing ? "Editar" : "Adicionar" }} Seção
      </h2>
      <form @submit.prevent="save">
        <div class="section-editor__group">
          <label for="title">Título da Seção</label>
          <input id="title" v-model="section.title" required />
        </div>
        <div class="section-editor__actions">
          <Button text="Cancelar" @click="closeEditor" />
          <Button text="Salvar" type="submit" />
        </div>
      </form>
    </div>
  </Modal>
</template>

<script>
import Modal from "../common/Modal.vue";
import Button from "../common/Button.vue";
import { generateUniqueId } from "../../utils/uniqueId";

export default {
  name: "SectionEditor",
  components: {
    Modal,
    Button
  },
  props: {
    sectionData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      section: {
        id: null,
        title: "",
        columns: []
      }
    };
  },
  computed: {
    isEditing() {
      return this.sectionData !== null;
    }
  },
  methods: {
    closeEditor() {
      this.$emit("close");
    },
    save() {
      if (!this.section.id) {
        this.section.id = generateUniqueId();
      }
      this.$emit("save", this.section);
    },
  },
  created() {
    if (this.isEditing) {
      this.section = { ...this.sectionData };
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/variables.scss";
.section-editor {
  &__title {
    margin-top: 0;
    font-family: $font-family;
  }

  &__group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 16px;
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
}
</style>
