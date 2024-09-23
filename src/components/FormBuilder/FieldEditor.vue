<template>
  <Modal @close="closeEditor">
    <div class="field-editor">
      <h2 class="field-editor__title">
        {{ isEditing ? 'Editar Campo' : 'Adicionar Campo' }}
      </h2>
      <form @submit.prevent="save">
        <div class="field-editor__group">
          <label for="title">Título</label>
          <input id="title" v-model="field.title" required />
        </div>
        <div class="field-editor__group">
          <label for="type">Tipo</label>
          <select id="type" v-model="field.type" required>
            <option value="shortAnswer">Resposta Curta</option>
            <option value="paragraph">Parágrafo</option>
            <option value="number">Número</option>
            <option value="checkboxes">Caixas de Seleção</option>
            <option value="multipleChoice">Múltipla Escolha</option>
            <option value="date">Data</option>
            <option value="time">Hora</option>
            <option value="dateTime">Data e Hora</option>
            <option value="color">Cor</option>
            <option value="file">Anexo</option>
            <option value="monetary">Valor Monetário</option>
          </select>
        </div>
        <div
          v-if="field.type === 'multipleChoice' || field.type === 'checkboxes'"
          class="field-editor__group"
        >
          <label>Opções</label>
          <div
            v-for="(option, index) in field.options"
            :key="index"
            class="field-editor__option"
          >
            <input v-model="field.options[index]" required />
            <Button text="Remover" @click="removeOption(index)" />
          </div>
          <Button text="Adicionar Opção" @click="addOption" />
        </div>
        <div class="field-editor__actions">
          <Button text="Cancelar" @click="closeEditor" />
          <Button text="Salvar" type="submit" />
        </div>
      </form>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/common/Modal.vue";
import Button from "@/components/common/Button.vue";
import { generateUniqueId } from "@/utils/uniqueId";

export default {
  name: "FieldEditor",
  components: {
    Modal,
    Button
  },
  props: {
    fieldData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      field: {
        id: null,
        title: "",
        type: "shortAnswer",
        options: [],
        placeholder: "",
        description: "",
        required: false
      }
    };
  },
  computed: {
    isEditing() {
      return this.fieldData !== null;
    }
  },
  methods: {
    closeEditor() {
      this.$emit("close");
    },
    save() {
      if (!this.field.id) {
        this.field.id = generateUniqueId();
      }
      this.$emit("save", this.field);
    },
    addOption() {
      this.field.options.push("");
    },
    removeOption(index) {
      this.field.options.splice(index, 1);
    }
  },
  created() {
    if (this.isEditing) {
      this.field = { ...this.fieldData };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.field-editor {
  &__title {
    margin-top: 0;
    font-family: $font-family;
  }

  &__group {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }

  &__option {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    input {
      flex: 1;
    }

    .button {
      margin-left: 8px;
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
}
</style>
