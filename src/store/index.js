import Vue from "vue";
import Vuex from "vuex";
import formBuilder from "./modules/formBuilder";
//import formResponse from "./modules/formResponse";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    formBuilder
    // formResponse
  }
});
