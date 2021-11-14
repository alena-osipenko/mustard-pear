<template>
  <transition v-if="show" name="fade">
    <div class="modal-mask" @click="close()">
      <div class="modal-container" @click.stop>
        <span class="close-button" @click="close()" />
        <div class="modalbody">
          <transition name="fade">
            <div>
              <h1 class="modalbody-title">Кредитный калькулятор</h1>
              <b-field label="Сумма кредита">
                <b-input v-model="loanAmount" type="text" />
              </b-field>
              <b-field label="Процентная ставка">
                <b-input v-model="interestRate" type="text" />
              </b-field>
              <b-field label="Срок кредита (мес)">
                <b-input v-model="terms" type="text" />
              </b-field>
              <b-button type="is-primary" class="mt-6 ml-0" @click="calculate">Рассчитать</b-button>
              <div v-if="monthlyPayment" class="mt-3">
                <b>Сумма ежемесячного платежа:</b> {{ monthlyPayment }}&nbsp;руб.
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios"

export default {
  name: "GlobalModal",
  components: {},
  mixins: [],
  props: ["show"],
  data() {
    return {
      loanAmount: "",
      interestRate: "",
      terms: "",
      monthlyPayment: null
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    document.addEventListener("keydown", (e) => this.closeOnKeyDown(e), {
      capture: true,
      passive: true,
    })
  },
  computed: {},
  methods: {
    calculate() {
      axios
        .get("https://mortgage-monthly-payment-calculator.p.rapidapi.com/revotek-finance/mortgage/monthly-payment", {
          headers: {
            "x-rapidapi-host": "mortgage-monthly-payment-calculator.p.rapidapi.com",
            "x-rapidapi-key": "2e13487b9dmshc2bdd6264bdfa50p155269jsn8ad65797ec4b"
          },
          params: {
            loanAmount: this.loanAmount, interestRate: this.interestRate, terms: this.terms
          },
        })
        .then((res) => {
          this.monthlyPayment = Math.round(res.data.monthlyPayment)
        })
    },
    close(result = null) {
      this.$emit("exit-modal", result)
    },
    closeOnKeyDown(e) {
      if (e.keyCode === 27) {
        this.close()
      }
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    document.removeEventListener("keydown", (e) => this.closeOnKeyDown(e))
  },
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 1002;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
}

.modal-container {
  height: auto;
  min-height: 380px;
  min-width: 440px;
  background-color: $white;
  border-radius: 5px;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
  margin-top: $stickyNavHeight * 2;
  padding: 16px;
  display: flex;
  align-self: flex-start;
  flex-direction: column;

  h1 {
    margin: 0 0 36px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
}

.modalbody {
  padding: 15px;
  width: 100%;
  height: 100%;
  display: block;
  margin-top: 30px;
}

.close-button {
  $size: 35px;
  height: $size;
  width: $size;
  position: absolute;
  box-sizing: border-box;
  line-height: $size;
  display: inline-block;
  cursor: pointer;
  cursor: hand;
  align-self: flex-end;

  &:before,
  &:after {
    $width: 22px;
    $height: 3px;
    transform: rotate(-45deg);
    content: "";
    position: absolute;
    top: 45%;
    left: 25%;
    display: inline-block;
    height: $height;
    width: $width;
    background-color: $primary;
    transition: all 0.25s ease-out;
  }

  &:after {
    transform: rotate(-135deg);
  }

  &:hover {
    &:before,
    &:after {
      transform: rotate(0deg);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 700px) {
  .modal-container {
    width: 80vw;
    min-width: 0;
    margin-top: $stickyNavHeight * 1.3;
  }
}
</style>
