import { shallowMount } from "@vue/test-utils";
import FieldRenderer from "@/components/FormResponse/FieldRenderer.vue";

describe("FieldRenderer.vue", () => {
  it("deve renderizar um input para campos de resposta curta", () => {
    const field = {
      id: "field1",
      title: "Nome",
      type: "shortAnswer",
      required: true
    };
    const wrapper = shallowMount(FieldRenderer, {
      propsData: { field }
    });
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it("deve renderizar um textarea para campos de parágrafo", () => {
    const field = {
      id: "field2",
      title: "Descrição",
      type: "paragraph"
    };
    const wrapper = shallowMount(FieldRenderer, {
      propsData: { field }
    });
    expect(wrapper.find("textarea").exists()).toBe(true);
  });

  it("deve renderizar um select para campos de múltipla escolha", () => {
    const field = {
      id: "field3",
      title: "Escolha uma opção",
      type: "multipleChoice",
      options: ["Opção 1", "Opção 2"]
    };
    const wrapper = shallowMount(FieldRenderer, {
      propsData: { field }
    });
    expect(wrapper.find("select").exists()).toBe(true);
    const options = wrapper.findAll("option");
    expect(options.length).toBe(2);
    expect(options.at(0).text()).toBe("Opção 1");
  });

  it("deve renderizar checkboxes para campos de caixas de seleção", () => {
    const field = {
      id: "field4",
      title: "Selecione as opções",
      type: "checkboxes",
      options: ["Opção A", "Opção B"]
    };
    const wrapper = shallowMount(FieldRenderer, {
      propsData: { field }
    });
    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(2);
  });

  it("deve emitir o valor correto ao alterar o campo", async () => {
    const field = {
      id: "field5",
      title: "Idade",
      type: "number"
    };
    const wrapper = shallowMount(FieldRenderer, {
      propsData: { field }
    });
    const input = wrapper.find('input[type="number"]');
    await input.setValue("25");
    expect(wrapper.emitted().input[0][0]).toBe("25");
  });
});
