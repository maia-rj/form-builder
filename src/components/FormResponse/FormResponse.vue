<template>
  <div class="form-response">
    <form v-if="sections.length" @submit.prevent="submitForm">
      <div
        v-for="section in sections"
        :key="section.id"
        class="form-response__section"
      >
        <h2 class="form-response__section-title">{{ section.title }}</h2>
        <div class="form-response__columns">
          <div
            v-for="column in section.columns"
            :key="column.id"
            class="form-response__column"
          >
            <div
              v-for="field in column.fields"
              :key="field.id"
              class="form-response__field"
            >
              <FieldRenderer :field="field" v-model="formValues[field.id]" />
            </div>
          </div>
        </div>
      </div>
      <Button text="Enviar" type="submit" />
    </form>
    <div class="form-response__no-data" v-else>
      <h2>Não há seções para exibir.</h2>
      <Button
        class="home__button"
        text="Construir Formulário"
        @click="goToBuildForm"
      />
    </div>
  </div>
</template>
<script>
import Button from "../common/Button.vue";
import FieldRenderer from "./FieldRenderer.vue";
import { mapGetters } from "vuex";

export default {
  name: "FormResponse",
  components: {
    FieldRenderer,
    Button
  },
  data() {
    return {
      formValues: {}
    };
  },
  computed: {
    ...mapGetters("formBuilder", ["sections"])
  },
  methods: {
    submitForm() {
      let isValid = true;

      this.sections.forEach(section => {
        section.columns.forEach(column => {
          column.fields.forEach(field => {
            const value = this.formValues[field.id];
            if (field.required) {
              if (field.type === "checkboxes") {
                if (!value || value.length === 0) {
                  isValid = false;
                }
              } else if (field.type === "file") {
                if (!value) {
                  isValid = false;
                }
              } else if (value === undefined || value === "") {
                isValid = false;
              }
            }
          });
        });
      });

      if (isValid) {
        this.$emit("submit", this.formValues);
        alert("Formulário enviado com sucesso!");
      } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
      }
    },
    goToBuildForm() {
      this.$router.push({ name: "BuildForm" });
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/variables.scss";

.form-response {
  padding: 0 40px;
  &__no-data {
    text-align: center;
    margin-top: 40px;
  }
  &__section {
    margin-bottom: 24px;
  }

  &__section-title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  &__columns {
    display: flex;
    gap: 16px;
  }

  &__column {
    flex: 1;
  }

  &__field {
    margin-bottom: 16px;
  }
}
</style>
