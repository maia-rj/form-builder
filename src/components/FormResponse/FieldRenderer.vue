<template>
  <div class="field-renderer">
    <label :for="field.id" class="field-renderer__label">
      {{ field.title }} <span v-if="field.required">*</span>
    </label>
    <div class="field-renderer__description" v-if="field.description">
      {{ field.description }}
    </div>

    <div v-if="field.type === 'checkboxes'" class="field-renderer__checkboxes">
      <div
        v-for="(option, idx) in field.options"
        :key="idx"
        class="field-renderer__checkbox"
      >
        <input
          type="checkbox"
          :id="field.id + '_' + idx"
          :value="option"
          v-model="inputValue"
        />
        <label :for="field.id + '_' + idx">{{ option }}</label>
      </div>
    </div>
    <component
      v-else
      :is="fieldComponent"
      :id="field.id"
      v-model="inputValue"
      @input="updateValue"
      :type="inputType"
      class="field-renderer__input"
      :placeholder="field.placeholder || ''"
      :required="field.required"
      :min="field.min"
      :max="field.max"
    >
      <option v-for="(option, idx) in field.options" :key="idx" :value="option">
        {{ option }}
      </option>
    </component>
  </div>
</template>

<script>
export default {
  name: "FieldRenderer",
  props: {
    field: {
      type: Object,
      required: true
    },
    value: [String, Number]
  },
  computed: {
    fieldComponent() {
      switch (this.field.type) {
        case "shortAnswer":
          return "input";
        case "paragraph":
          return "textarea";
        case "number":
          return "input";
        case "multipleChoice":
          return "select";
        case "checkboxes":
          return "div"; // Vamos criar checkboxes manualmente
        case "date":
          return "input";
        case "time":
          return "input";
        case "dateTime":
          return "input";
        case "color":
          return "input";
        case "file":
          return "input";
        case "monetary":
          return "input";
        default:
          return "input";
      }
    },
    inputType() {
      switch (this.field.type) {
        case "number":
          return "number";
        case "date":
          return "date";
        case "time":
          return "time";
        case "dateTime":
          return "datetime-local";
        case "color":
          return "color";
        case "file":
          return "file";
        case "monetary":
          return "text";
        default:
          return "text";
      }
    }
  },
  data() {
    return {
      inputValue: this.value || (this.field.type === "checkboxes" ? [] : "")
    };
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    },
    inputValue(newVal) {
      this.$emit("input", newVal);
    }
  },
  methods: {
    updateValue(event) {
      let value = event.target.value;
      if (this.field.type === "monetary") {
        value = value.replace(/\D/g, "");
        value = (value / 100).toFixed(2);
        event.target.value = `R$ ${value.replace(".", ",")}`;
        this.inputValue = parseInt(value.replace(",", ""), 10);
      } else if (this.field.type === "file") {
        const file = event.target.files[0];
        this.inputValue = file;
      } else {
        this.inputValue = value;
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.field-renderer {
  margin-bottom: 20px;
  font-family: $font-family;
  width: 100%;
  display: flex;
  flex-direction: column;
  &__label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  &__input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid lighten($text-color, 60%);
    border-radius: $border-radius;
    font-family: $font-family;
  }
}
</style>
