import { shallowMount } from "@vue/test-utils";
import FieldEditor from "@/components/FormBuilder/FieldEditor.vue";

describe("FieldEditor.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(FieldEditor, {
      propsData: {
        fieldData: null
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("deve renderizar corretamente quando criando um novo campo", () => {
    expect(wrapper.find(".field-editor__title").text()).toBe("Adicionar Campo");
  });
  it("deve renderizar corretamente quando editando um campo existente", () => {
    const fieldData = {
      id: "field1",
      title: "Nome",
      type: "shortAnswer",
      options: []
    };
    const wrapper = shallowMount(FieldEditor, {
      propsData: { fieldData }
    });
    expect(wrapper.find(".field-editor__title").text()).toBe("Editar Campo");
    expect(wrapper.vm.field.title).toBe("Nome");
  });

  it("deve validar o formulário antes de salvar", async () => {
    // Simula o clique no botão Salvar sem preencher o título
    wrapper.setData({ field: { title: "", type: "shortAnswer", options: [] } });
    await wrapper.find("form").trigger("submit.prevent");
    // Verifique se o campo de título está vazio
    expect(wrapper.vm.field.title).toBe("");
    // Você pode adicionar validação personalizada e verificar se a mensagem de erro é exibida
  });

  it('deve emitir o evento "save" com os dados corretos ao salvar', async () => {
    wrapper.setData({
      field: {
        id: null,
        title: "Idade",
        type: "number",
        options: []
      }
    });
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.emitted().save).toBeTruthy();
    const emittedField = wrapper.emitted().save[0][0];
    expect(emittedField.title).toBe("Idade");
    expect(emittedField.type).toBe("number");
  });

  it("deve adicionar e remover opções para campos de múltipla escolha e caixas de seleção", async () => {
    wrapper.setData({ field: { type: "multipleChoice", options: [] } });
    await wrapper.vm.addOption();
    expect(wrapper.vm.field.options.length).toBe(1);
    wrapper.vm.field.options[0] = "Opção 1";
    await wrapper.vm.addOption();
    expect(wrapper.vm.field.options.length).toBe(2);
    wrapper.vm.field.options[1] = "Opção 2";
    await wrapper.vm.removeOption(0);
    expect(wrapper.vm.field.options).toEqual(["Opção 2"]);
  });
});
