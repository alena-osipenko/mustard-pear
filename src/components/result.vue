<template>
  <article class="br2 ba dark-gray b--black-10 w-100 center">
    <div class="pa2 ph3-ns pb3-ns">
      <div id="printJS-form" class="result-content w-100 mt1">
        <div>
          <div class="results-header">
            <h1 class="f5 f4-ns mv0">Результат</h1>
            <ul class="stars">
              <li v-for="(i, index) in result.rate" :key="index">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f6de36"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
                  />
                </svg>
              </li>

              <li v-for="(i, index) in 5 - result.rate" :key="index">
                <svg
                  fill="#d2d7d3"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
                  />
                </svg>
              </li>
            </ul>
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
            <h3 v-if="this.result.requirements" class="f5 f4-ns mv0">
              Ресурсозатраты
            </h3>
            <div v-if="this.result.requirements">
              <div>
                <p class="f6 lh-copy measure mt2 mid-gray">
                  Водопотребление:
                  <span class="fw7"
                  >{{ this.result.requirements.water.value }}
                    {{ this.result.requirements.water.description }}</span
                  >
                </p>
              </div>
              <div>
                <p class="f6 lh-copy measure mt2 mid-gray">
                  Энергопотребление:
                  <span class="fw7">
                    {{ this.result.requirements.enegry.value }}
                    {{ this.result.requirements.enegry.description }}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div v-if="this.result.requirements" class="mt3">
            <a
              class="link underline blue hover-orange mr-auto"
              @click="showCalculate()"
            >
              {{ this.isShowCalculate ? "Скрыть расчёты" : "Показать расчёты" }}
            </a>
          </div>
          <div class="mt4">
            <h3 class="f5 f4-ns mv0">Маржинальный анализ</h3>
            <p>Объём реализации, ц: {{ this.result.economy.volume }}</p>
            <p>Доход, : {{ this.result.economy.proceeds }}</p>
            <p>Переменные затраты, руб: {{ this.result.economy.costs }}</p>
            <p>Плановая прибыль: {{ this.result.economy.profit }}</p>
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
                    this.result.requirements.enegry.value * priceEnergy +
                      (this.result.requirements.water.value * priceWater) / 1000
                  }}
                </h1>
              </div>
            </div>
          </div>
          <b-button
            type="is-primary"
            class="mt-6 ml-0"
            @click="showCreditCalculateModal"
          >Рассчитать кредит</b-button
          >
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
    <Modal
      :show="creditCalculateModal"
      @exit-modal="creditCalculateModal = false"
    />
  </article>
</template>

<script>
import Map from "../components/map"
import Modal from "../components/modal-comp"
import printJS from "print-js"

export default {
  components: {
    Map,
    Modal,
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
      creditCalculateModal: false,
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
    showCreditCalculateModal() {
      this.creditCalculateModal = true
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
.results-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.stars {
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
