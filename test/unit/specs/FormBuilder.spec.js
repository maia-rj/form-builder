import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import FormBuilder from "@/components/FormBuilder/FormBuilder.vue";
import SectionList from "@/components/FormBuilder/SectionList.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("FormBuilder.vue", () => {
  let store;
  let state;
  let actions;
  let getters;

  beforeEach(() => {
    state = {
      sections: []
    };
    actions = {
      addSection: jest.fn(),
      updateSection: jest.fn(),
      removeSection: jest.fn(),
      addColumn: jest.fn(),
      removeColumn: jest.fn(),
      addField: jest.fn(),
      updateField: jest.fn(),
      removeField: jest.fn()
    };
    getters = {
      sections: state => state.sections
    };
    store = new Vuex.Store({
      modules: {
        formBuilder: {
          namespaced: true,
          state,
          actions,
          getters
        }
      }
    });
  });

  it("deve renderizar corretamente", () => {
    const wrapper = shallowMount(FormBuilder, { store, localVue });
    expect(wrapper.find(".form-builder__title").text()).toBe(
      "Construtor de Formulários"
    );
  });

  it("deve abrir o modal de adicionar seção ao clicar no botão", async () => {
    const wrapper = shallowMount(FormBuilder, {
      store,
      localVue,
      stubs: {
        Button: {
          template: "<button @click=\"$emit('click')\"><slot /></button>"
        }
      }
    });
    await wrapper.find(".form-builder__add-section-button").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isSectionEditorOpen).toBe(true);
  });

  it('deve chamar a action "addSection" ao salvar uma nova seção', async () => {
    const wrapper = shallowMount(FormBuilder, { store, localVue });
    wrapper.setData({ isSectionEditorOpen: true });
    const section = { id: "section1", title: "Nova Seção", columns: [] };
    await wrapper.vm.saveSection(section);
    expect(actions.addSection).toHaveBeenCalled();
  });
});
