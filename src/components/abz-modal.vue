<template>
  <div class="abzModal" ref="modal_bg">
      <div class="abzModalContent">
          <h3>{{header}}</h3>
          <p>{{message}}</p>
          <abz-btn class="abzModalBtn" 
                   :title="btn_title"
                   @click.native="closeModal(); GET_FIRST_USERS_PAGE(6)"/>
      </div>
  </div>
</template>

<style scoped lang=scss>
    .abzModal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 3;
        width: 100%;
        height: 100%;
        .abzModalContent {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            background-color: #FFFFFF;
            box-shadow: 0px 0 10px 0 rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            width: 328px;
            height: 220px;
            z-index: 3;
            h3 {
                    font-size: 22px;
                    line-height: 31px;
                    margin: 0px 0px 5px 24px;
                    letter-spacing: -0.2px;
            }
            p {
                text-align: left;
                padding-right: 30px;
                margin-bottom: 33px;
                margin-left: 24px;
            }
            .abzModalBtn {
                margin-left: auto;
                margin-right: 24px;
            }
        }
    }
</style>

<script>
import abzBtn from '../components/abz-btn.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: { abzBtn },
  name: 'abz-modal',
  props: {
      header: {
          type: String,
          default: 'Congratulations'
      },
      message: {
          type: String,
          default: 'You have successfully passed the registration'
      },
      btn_title: {
          type: String,
          default: 'Great'
      }
  },
  computed: {
      ...mapGetters([
      'USERS_COUNT'
    ]),
  },
  methods: {
      ...mapActions([
      'GET_FIRST_USERS_PAGE',
      ]),
      closeModal() {
          this.$emit('closeModal')
      }
  },
  data() {
      return {

      }
  },
  mounted() {
      let vm = this;
      document.addEventListener('click', function (item){
          if(item.target === vm.$refs['modal_bg']) {
              vm.GET_FIRST_USERS_PAGE(6);
              vm.closeModal();
          }
      })
  }
}
</script>
