import { shallowMount } from "@vue/test-utils";
import Menu from "@/components/common/Menu.vue";

describe("Menu.vue", () => {
  it("deve renderizar o ícone de menu", () => {
    const wrapper = shallowMount(Menu, {
      propsData: {
        items: []
      }
    });
    expect(wrapper.find(".menu__icon").exists()).toBe(true);
  });

  it("deve exibir os itens ao clicar no ícone", async () => {
    const items = [
      { label: "Ação 1", action: "action1" },
      { label: "Ação 2", action: "action2" }
    ];
    const wrapper = shallowMount(Menu, {
      propsData: { items }
    });
    await wrapper.find(".menu__icon").trigger("click");
    const menuItems = wrapper.findAll(".menu__item");
    expect(menuItems.length).toBe(2);
    expect(menuItems.at(0).text()).toBe("Ação 1");
  });

  it("deve emitir o evento correto ao selecionar uma ação", async () => {
    const items = [
      { label: "Editar", action: "edit" },
      { label: "Remover", action: "remove" }
    ];
    const wrapper = shallowMount(Menu, {
      propsData: { items }
    });
    await wrapper.find(".menu__icon").trigger("click");
    let menuItems = wrapper.findAll(".menu__item");
    await menuItems.at(0).trigger("click");
    expect(wrapper.emitted().edit).toBeTruthy();
    await wrapper.find(".menu__icon").trigger("click");
    menuItems = wrapper.findAll(".menu__item");
    await menuItems.at(1).trigger("click");
    expect(wrapper.emitted().remove).toBeTruthy();
  });
});
