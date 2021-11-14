<template>
  <section class="section">
    <div class="container justify-between">
      <Filters
        :is-map-selection="isMapSelection"
        @select-region="selectRegion"
      />
      <div class="mw-50">
        <Map :selected-region="selectedRegion" />
      </div>
    </div>
  </section>
</template>

<script>
import Map from "../components/map"
import Filters from "../components/filters"
import store from "@/store/index"

export default {
  name: "Index",
  components: {
    Map,
    Filters,
  },
  mixins: [],
  data() {
    return {
      selectedRegion: null,
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {
    isMapSelection() {
      return store.get("account/coords").length > 2
    },
  },
  methods: {
    selectRegion(value) {
      this.selectedRegion = value
    },
  },
  filters: {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
}
</style>
