import Vue from "vue";

const state = {
  sections: []
};

const mutations = {
  ADD_SECTION(state, section) {
    state.sections.push(section);
  },
  UPDATE_SECTION(state, { index, section }) {
    state.sections.splice(index, 1, section);
  },
  REMOVE_SECTION(state, index) {
    state.sections.splice(index, 1);
  },

  ADD_COLUMN(state, { sectionIndex, column }) {
    state.sections[sectionIndex].columns.push(column);
  },
  UPDATE_COLUMN(state, { sectionIndex, columnIndex, column }) {
    state.sections[sectionIndex].columns.splice(columnIndex, 1, column);
  },
  REMOVE_COLUMN(state, { sectionIndex, columnIndex }) {
    state.sections[sectionIndex].columns.splice(columnIndex, 1);
  },

  ADD_FIELD(state, { sectionIndex, columnIndex, field }) {
    console.log(state, sectionIndex, columnIndex, field);
    state.sections[sectionIndex].columns[columnIndex].fields.push(field);
  },
  UPDATE_FIELD(state, { sectionIndex, columnIndex, fieldIndex, field }) {
    state.sections[sectionIndex].columns[columnIndex].fields.splice(
      fieldIndex,
      1,
      field
    );
  },
  REMOVE_FIELD(state, { sectionIndex, columnIndex, fieldIndex }) {
    state.sections[sectionIndex].columns[columnIndex].fields.splice(
      fieldIndex,
      1
    );
  }
};

const actions = {
  addSection({ commit }, section) {
    commit("ADD_SECTION", section);
  },
  updateSection({ commit }, payload) {
    commit("UPDATE_SECTION", payload);
  },
  removeSection({ commit }, index) {
    commit("REMOVE_SECTION", index);
  },

  addColumn({ commit }, payload) {
    commit("ADD_COLUMN", payload);
  },
  updateColumn({ commit }, payload) {
    commit("UPDATE_COLUMN", payload);
  },
  removeColumn({ commit }, payload) {
    commit("REMOVE_COLUMN", payload);
  },

  addField({ commit }, payload) {
    commit("ADD_FIELD", payload);
  },
  updateField({ commit }, payload) {
    commit("UPDATE_FIELD", payload);
  },
  removeField({ commit }, payload) {
    commit("REMOVE_FIELD", payload);
  }
};

const getters = {
  sections: state => state.sections
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
