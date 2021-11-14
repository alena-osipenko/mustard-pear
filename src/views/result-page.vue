<template>
  <div class="pa4">
    <Result :result="result" />
  </div>
</template>

<script>
import Result from "../components/result"

export default {
  name: "About",
  components: {
    Result,
  },
  mixins: [],
  data() {
    return {
      result: null,
    }
  },
  beforeCreate() {},
  created() {
    this.result = this.$store.get("result/result")
  },
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {},
  filters: {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped></style>
