<template>
  <article class="br2 ba dark-gray b--black-10 w-100 center">
    <div class="pa2 ph3-ns pb3-ns">
      <div id="printJS-form" class="result-content w-100 mt1">
        <div>
          <div>
            <h1 class="f5 f4-ns mv0">Результат {{ result[0].rate }}/5</h1>
          </div>
          <p class="f6 lh-copy measure mt2 mid-gray">
            Сельскохозяйственная культура
            <span class="fw7">{{ this.selectedCulture }}</span>
          </p>
          <p class="f6 lh-copy measure mt2 mid-gray">
            Вариант возделывания
            <span class="fw7">{{ this.selectedPriming }}</span>
          </p>
          <p class="f6 lh-copy measure mt2 mid-gray">
            Район <span class="fw7">{{ this.selectedRegion }}</span>
          </p>
          <!--      <pre>{{ result }}</pre>-->
          <div class="mt4">
            <h3 class="f5 f4-ns mv0">Ресурсозатраты</h3>
            <div>
              <p class="f6 lh-copy measure mt2 mid-gray">
                Водопотребление:
                <span class="fw7"
                >{{ this.result[0].requirements.water.value }}
                  {{ this.result[0].requirements.water.description }}</span
                >
              </p>
            </div>
            <div>
              <p class="f6 lh-copy measure mt2 mid-gray">
                Энергопотребление:
                <span class="fw7">
                  {{ this.result[0].requirements.enegry.value }}
                  {{ this.result[0].requirements.enegry.description }}
                </span>
              </p>
            </div>
          </div>
          <div class="mt3">
            <a
              class="link underline blue hover-orange mr-auto"
              @click="showCalculate()"
            >
              {{ this.isShowCalculate ? "Скрыть расчёты" : "Показать расчёты" }}
            </a>
          </div>

          <div v-if="isShowCalculate" class="mt-4">
            <div>
              <div>
                <b-field label="Цена за воду, руб/м3">
                  <b-input v-model="priceWater" type="number" />
                </b-field>
              </div>
              <div>
                <b-field label="Цена за энергию, кВт×ч">
                  <b-input v-model="priceEnergy" type="number" />
                </b-field>
              </div>
            </div>
            <div>
              <div>
                <h1 class="f3 mv0 mt-3">
                  ИТОГО ЗАТРАТ, руб/га :
                  {{
                    this.result[0].requirements.enegry.value * priceEnergy +
                      (this.result[0].requirements.water.value * priceWater) /
                      1000
                  }}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <Map
          v-if="selectedRegionCoords"
          :selected-region="selectedRegionCoords"
        />
      </div>
      <b-button
        class="print-button button mt-3"
        type="button"
        @click="printTest()"
      >
        Распечатать результат
      </b-button>
    </div>
  </article>
</template>

<script>
import Map from "../components/map"
import printJS from "print-js"

export default {
  components: {
    Map,
  },
  name: "Result",
  props: ["result"],
  data() {
    return {
      isShowCalculate: false,
      priceEnergy: 0,
      priceWater: 0,
      selectedPriming: "",
      selectedRegion: "",
      selectedCulture: "",
      selectedRegionCoords: null,
    }
  },
  created() {
    this.selectedPriming = this.$store.get("filters/selectedPriming")
    this.selectedRegion = this.$store.get("filters/selectedRegion")
    this.selectedCulture = this.$store.get("filters/selectedCulture")
    this.selectedRegionCoords = this.$store.get("account/coords")
  },
  methods: {
    showCalculate() {
      this.isShowCalculate = !this.isShowCalculate
    },
    printTest() {
      printJS({
        printable: "printJS-form",
        type: "html",
        // type: "pdf",
        style:
          ".result-content {flex-direction: column;} #map { width: 400px; height: 300px;}",
      })
    },
  },
}
</script>

<style scoped>
.result-content {
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
}
.print-button {
  display: block;
}
@media print {
  #printJS-form {
    color: inherit;
  }
  .result-content {
    flex-direction: column;
  }
  .print-button {
    display: none;
  }
}
</style>
