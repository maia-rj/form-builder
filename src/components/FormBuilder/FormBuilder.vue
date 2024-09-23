<template>
  <div class="form-builder">
    <header class="form-builder__header">
      <h1 class="form-builder__title">Construtor de Formulários</h1>
      <div class="form-builder__actions">
        <Button
          class="form-builder__add-section-button"
          text="Adicionar Seção"
          @click="openSectionEditor"
        />
      </div>
    </header>

    <SectionList
      :sections="sections"
      @edit-section="editSection"
      @remove-section="removeSectionFn"
      @add-column="addColumnFn"
      @remove-column="removeColumnFn"
      @add-field="openFieldEditor"
      @edit-field="editField"
      @remove-field="removeFieldFn"
    />

    <SectionEditor
      v-if="isSectionEditorOpen"
      :sectionData="currentSectionData"
      @close="closeSectionEditor"
      @save="saveSection"
    />

    <FieldEditor
      v-if="isFieldEditorOpen"
      :fieldData="currentFieldData"
      @close="closeFieldEditor"
      @save="saveField"
    />
  </div>
</template>
<script>
import SectionList from "./SectionList.vue";
import SectionEditor from "./SectionEditor.vue";
import FieldEditor from "./FieldEditor.vue";
import Button from "@/components/common/Button.vue";
import { mapActions, mapGetters } from "vuex";
import { generateUniqueId } from "@/utils/uniqueId";

export default {
  name: "FormBuilder",
  components: {
    SectionList,
    SectionEditor,
    FieldEditor,
    Button
  },
  data() {
    return {
      isSectionEditorOpen: false,
      isFieldEditorOpen: false,

      currentSectionData: null,
      currentSectionIndex: null,

      currentFieldData: null,
      currentFieldIndex: null
    };
  },
  computed: {
    ...mapGetters("formBuilder", ["sections"])
  },
  methods: {
    ...mapActions("formBuilder", [
      "addSection",
      "updateSection",
      "removeSection",

      "addColumn",
      "removeColumn",

      "addField",
      "updateField",
      "removeField"
    ]),

    openSectionEditor() {
      this.currentSectionData = null;
      this.currentSectionIndex = null;
      this.isSectionEditorOpen = true;
    },
    closeSectionEditor() {
      this.isSectionEditorOpen = false;
    },
    saveSection(section) {
      if (this.currentSectionIndex !== null) {
        this.updateSection({ index: this.currentSectionIndex, section });
      } else {
        this.addSection(section);
      }
      this.closeSectionEditor();
    },
    editSection(index) {
      this.currentSectionData = { ...this.sections[index] };
      this.currentSectionIndex = index;
      this.isSectionEditorOpen = true;
    },
    removeSectionFn(index) {
      this.removeSection(index);
    },

    addColumnFn(sectionIndex) {
      const column = {
        id: generateUniqueId(),
        fields: []
      };
      this.addColumn({
        sectionIndex,
        column
      });
    },
    removeColumnFn(sectionIndex, columnIndex) {
      this.removeColumn({ sectionIndex, columnIndex });
    },

    openFieldEditor(sectionIndex, columnIndex) {
      this.currentFieldData = null;
      this.currentSectionIndex = sectionIndex;
      this.currentColumnIndex = columnIndex;
      this.currentFieldIndex = null;
      this.isFieldEditorOpen = true;
    },
    closeFieldEditor() {
      this.isFieldEditorOpen = false;
    },
    saveField(field) {
      console.log(
        field,
        this.currentFieldIndex,
        this.currentColumnIndex,
        this.currentSectionIndex
      );
      if (this.currentFieldIndex !== null) {
        this.updateField({
          sectionIndex: this.currentSectionIndex,
          columnIndex: this.currentColumnIndex,
          fieldIndex: this.currentFieldIndex,
          field
        });
      } else {
        this.addField({
          sectionIndex: this.currentSectionIndex,
          columnIndex: this.currentColumnIndex,
          field
        });
      }
      this.closeFieldEditor();
    },
    editField(sectionIndex, columnIndex, fieldIndex) {
      this.currentFieldData = {
        ...this.sections[sectionIndex].columns[columnIndex].fields[fieldIndex]
      };
      this.currentSectionIndex = sectionIndex;
      this.currentColumnIndex = columnIndex;
      this.currentFieldIndex = fieldIndex;
      this.isFieldEditorOpen = true;
    },
    removeFieldFn(sectionIndex, columnIndex, fieldIndex) {
      this.removeField({
        sectionIndex,
        columnIndex,
        fieldIndex
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.form-builder {
  padding: 0 40px;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: $background-color;
    color: $text-color;
    border-bottom: 1px solid lighten($text-color, 70%);
    & .form-builder__title {
      margin: 0;
      font-size: 24px;
      font-family: $font-family;
    }
  }
}
</style>
