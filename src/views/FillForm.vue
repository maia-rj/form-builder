<template>
  <div class="fill-form">
    <FormResponse @submit="handleSubmit" />
  </div>
</template>

<script>
import FormResponse from '../components/FormResponse/FormResponse.vue';

export default {
  name: 'FillForm',
  components: {
    FormResponse,
  },
  methods: {
    handleSubmit(formData) {
      console.log('Formulário enviado:', formData);
    },
  },
};
</script>

