<template>
  <div class="section-list">
    <div
      v-for="(section, sectionIndex) in sections"
      :key="section.id"
      class="section-list__section"
    >
      <div class="section-list__section-header">
        <h2>{{ section.title }}</h2>
        <Menu
          :items="[
            { label: 'Adicionar Coluna', action: 'addColumn' },
            { label: 'Editar Seção', action: 'editSection' },
            { label: 'Remover Seção', action: 'removeSection' }
          ]"
          @editSection="$emit('edit-section', sectionIndex)"
          @removeSection="$emit('remove-section', sectionIndex)"
          @addColumn="$emit('add-column', sectionIndex)"
        />
      </div>
      <div class="section-list__columns">
        <div
          v-for="(column, columnIndex) in section.columns"
          :key="column.id"
          class="section-list__column"
        >
          <div class="section-list__column-header">
            <h3>Coluna {{ columnIndex + 1 }}</h3>
            <Menu
              :items="[
                { label: 'Adicionar Campo', action: 'addField' },
                { label: 'Remover Coluna', action: 'removeColumn' }
              ]"
              @removeColumn="$emit('remove-column', sectionIndex, columnIndex)"
              @addField="$emit('add-field', sectionIndex, columnIndex)"
            />
          </div>
          <ul class="section-list__fields">
            <li
              v-for="(field, fieldIndex) in column.fields"
              :key="field.id"
              class="section-list__field"
            >
              <div class="section-list__field-content">
                <span
                  >{{ field.title }} ({{ getFieldTypeLabel(field.type) }})</span
                >
                <Menu
                  :items="[
                    { label: 'Editar Campo', action: 'editField' },
                    { label: 'Remover Campo', action: 'removeField' }
                  ]"
                  @editField="
                    $emit('edit-field', sectionIndex, columnIndex, fieldIndex)
                  "
                  @removeField="
                    $emit('remove-field', sectionIndex, columnIndex, fieldIndex)
                  "
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/common/Button.vue";
import Menu from "@/components/common/Menu.vue";

export default {
  name: "SectionList",
  props: {
    sections: {
      type: Array,
      required: true
    }
  },
  components: {
    Button,
    Menu
  },
  methods: {
    getFieldTypeLabel(type) {
      const types = {
        shortAnswer: "Resposta Curta",
        paragraph: "Parágrafo",
        number: "Número",
        multipleChoice: "Múltipla Escolha",
        checkboxes: "Caixas de Seleção",
        date: "Data",
        time: "Hora",
        dateTime: "Data e Hora",
        color: "Cor",
        file: "Anexo",
        monetary: "Valor Monetário"
      };
      return types[type] || "Tipo Desconhecido";
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/variables.scss";

.section-list {
  &__section {
    margin-bottom: 24px;
    border: 1px solid lighten($text-color, 70%);
    border-radius: $border-radius;
    padding: 16px;
  }

  &__section-header,
  &__column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  &__section-actions {
    display: flex;
    gap: 8px;
  }

  &__columns {
    display: flex;
    gap: 16px;
  }

  &__column {
    flex: 1;
    border: 1px solid lighten($text-color, 80%);
    border-radius: $border-radius;
    padding: 12px;
  }

  &__column-actions {
    display: flex;
    gap: 8px;
  }

  &__fields {
    list-style: none;
    padding: 0;
  }

  &__field {
    border: 1px solid lighten($text-color, 80%);
    padding: 8px;
    margin-bottom: 8px;
    border-radius: $border-radius;
  }

  &__field-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__field-actions {
    display: flex;
    gap: 8px;
  }
}
</style>
