import Vue from "vue"
import App from "@/App.vue"
import store from "@/store/index"
import router from "@/router/index"
import "@/registerServiceWorker"
import modal from "@/components/modal-comp"
import accountAPI from "@/plugins/accountAPI"
import Buefy from "buefy"
import VueFormulate from "@braid/vue-formulate"
import { LMap, LTileLayer, LMarker } from "vue2-leaflet"
import LDrawToolbar from "vue2-leaflet-draw-toolbar"
import "leaflet/dist/leaflet.css";

Vue.component("l-map", LMap)
Vue.component("l-tile-layer", LTileLayer)
Vue.component("l-marker", LMarker)
Vue.component("l-draw-toolbar", LDrawToolbar)

Vue.use(VueFormulate)
Vue.use(Buefy)
Vue.use(accountAPI)
Vue.component("Modal", modal)

Vue.config.productionTip = false
Vue.config.debug = true

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
