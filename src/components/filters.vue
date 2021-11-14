<template>
  <div class="mr4 w-third">
    <b-field label="Выберите культуру">
      <b-select
        v-model="selectedCulture"
        placeholder="Select a character"
        expanded
      >
        <option
          v-for="culture in cultures"
          :key="culture.key"
          :value="culture.name"
        >
          {{ culture.name }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Вариант возделывания">
      <b-select
        v-model="selectedPriming"
        placeholder="Select a character"
        expanded
      >
        <option
          v-for="primingType in primingTypes"
          :key="primingType.key"
          :value="primingType.name"
        >
          {{ primingType.name }}
        </option>
      </b-select>
    </b-field>
    <b-field v-if="!isMapSelection" label="Выберите район">
      <b-select
        v-model="selectedRegion"
        placeholder="Select a character"
        expanded
      >
        <option
          v-for="region in regions"
          :key="region.key"
          :value="region.name"
        >
          {{ region.name }}
        </option>
      </b-select>
    </b-field>
    <div v-else>
      <a class="link underline blue hover-orange mr-auto"
      >Выбрана область на карте</a
      >
    </div>

    <div class="flex mt4" :class="{ 'flex-column': showAdvance }">
      <a
        class="link underline blue hover-orange mr-auto"
        @click="showAdvanceFilters()"
      >
        {{ this.showAdvance ? "Скрыть фильтры" : "Продвинутые фильтры" }}
      </a>
      <div v-if="showAdvance" class="mt-4">
        <b-field label="Посевная площадь, га">
          <b-input v-model="square" />
        </b-field>
        <b-field label="Площадь защищенного грунта, га">
          <b-input v-model="area" />
        </b-field>
        <b-field
          label="Основные производственные фонды с.-х. назначения, тыс. руб."
        >
          <b-input v-model="p6" />
        </b-field>
        Потребность в ресурсах
        <b-field label="Металл, бетон и т.д., т/га, м3/га">
          <b-input v-model="p5" /> </b-field
        ><b-field label="Удобрения, средства защиты растений, кг/га">
          <b-input v-model="p4" />
        </b-field>
        <b-field label="Дизельное топливо, л/га">
          <b-input v-model="p3" />
        </b-field>
        <b-field label="Электроэнергия кВт * Га">
          <b-input v-model="p2" />
        </b-field>
        <b-field
          label="Отопление по видам топлива и общая потребность в энергии, гДж/га"
        >
          <b-input v-model="p1" />
        </b-field>
      </div>
      <b-button type="is-primary" @click="calculate">Рассчитать</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import store from "@/store/index"

export default {
  name: "Filters",
  props: ["isMapSelection"],
  data() {
    return {
      square: "",
      area: "",
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      p5: "",
      p6: "",
      cultures: [
        { key: 1, name: "Картофель" },
        { key: 2, name: "Капуста" },
        { key: 3, name: "Морковь" },
        { key: 4, name: "Свекла" },
        { key: 5, name: "Огурец" },
        { key: 6, name: "Дыня" },
        { key: 7, name: "Дыня" },
        { key: 8, name: "Арбуз" },
        { key: 9, name: "Рис" },
      ],
      selectedCulture: "",
      regions: [
        { key: 1, name: "Йошкар-Ола", coords: [56.6316, 47.886178] },
        { key: 2, name: "Юринский район", coords: [56.552092, 46.073073] },
        { key: 3, name: "Сернурский район", coords: [57.074832, 49.074066] },
        { key: 4, name: "Волжский район", coords: [56.053804, 48.55528] },
      ],
      selectedRegion: "",
      primingTypes: [
        { key: 1, name: "Открытый грунт" },
        { key: 2, name: "Тепличный комплекс" },
      ],
      selectedPriming: "",
      showAdvance: false,
    }
  },
  watch: {
    selectedRegion: function (item) {
      const regionCoords = this.regions.find(
        (region) => region.name === item
      ).coords
      this.$emit("select-region", regionCoords)
    },
  },
  methods: {
    showAdvanceFilters() {
      this.showAdvance = !this.showAdvance
    },
    calculate() {
      const isPolygon = store.get("account/coords").length > 2
      if (
        (this.selectedRegion || isPolygon) &&
        this.selectedCulture &&
        this.selectedPriming
      ) {
        store.set("filters/selectedCulture", this.selectedCulture)
        store.set("filters/selectedRegion", this.selectedRegion)
        store.set("filters/selectedPriming", this.selectedPriming)
        axios
          .get("http://localhost:3000/result/1", {
            params: {
              complex: this.showAdvance && this.area,
              area: this.area,
              selectedCulture: this.selectedCulture,
              selectedRegion: this.selectedRegion,
              selectedPriming: this.selectedPriming,
              isClosed: this.selectedPriming == "Тепличный комплекс",
              culture: this.cultures.find(
                (el) => el.name === this.selectedCulture
              ).key,
            },
          })
          .then((res) => {
            store.set("result/result", res.data)
            this.$router.push("result")
          })
      }
    },
    selectRegion(region) {
      this.$emit("select-region", region)
    },
  },
  created() {
    store.set("account/coords", [])
  },
}
</script>

<style scoped></style>
