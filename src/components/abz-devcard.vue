<template>
  <li class="abzDevcard">
    <img :src="this.user_data.photo" 
         @error="user_data.photo = require('../assets/img/Photo-cover.svg')" 
         alt="Specialist photo">
    <h2 :tooltip="user_data.name">{{lengthCheck(user_data.name, this.nameCharsQuantity)}}</h2>
    <p>{{lengthCheck(user_data.position, this.positionCharsQuantity)}}</p>
    <a :href="`mailto:${user_data.email}`" 
       class="email"
       :tooltip="user_data.email">
            {{lengthCheck(user_data.email, 25)}}
    </a>
    <a :href="`tel:${user_data.phone}`" 
       class="phone"
       :tooltip="user_data.phone">
            {{lengthCheck(user_data.phone, 13)}}
    </a>
  </li>
</template>

<style scoped lang=scss>
    .abzDevcard {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 313px;
        padding: 36px 25px 84px 25px;
        background-color: #FFFFFF;
        border-radius: 10px;
        box-sizing: border-box;
        img {
            width: 70px;
            height: 70px;
            flex-shrink: 0;
            border-radius: 50%;
        }
        h2  {
            margin-top: 15px;
            overflow-wrap: anywhere;
        }
        p {
            margin-top: 4px;
        }
        .email {
            margin-top: 2px;
        }
        .phone {
            margin-top: 4px;
        }
        a, h2 {
            position: relative;
            &::after {
                display: none;
                content: attr(tooltip);
                position: absolute;
                left: 50%;
                top: 43px;
                background: #232F34;
                text-align: center;
                white-space: nowrap;
                color: #fff;
                padding: 0px 16px;
                margin-right: 1px;
                font-size: 16px;
                border-radius: 4px;
                pointer-events: none;
                z-index: 1;
            }
            &:hover::after {
                display: block;
            }
        }
    }
</style>

<script>
import {mapGetters} from 'vuex'

export default {
  components: {  },
  name: 'abz-devcard',
  props: {
      user_data: {
        type: Object,
        default() {
            return {}
        }
      }
  },
  computed: {
      ...mapGetters([
      'APP_WIDTH',
      ]),
      nameCharsQuantity() {
          if(this.APP_WIDTH <= 360) {
              return 45
          } else {
              return 35
          }
      },
      positionCharsQuantity() {
          if(this.APP_WIDTH < 768) {
              return 55
          } else if (this.APP_WIDTH >= 768 && this.APP_WIDTH < 1024) {
              return 64
          } else {
              return 52
          }
      }
  },
  methods: {
      lengthCheck(string, length) {
          if(string.length > length) {
              return string.slice(0, length) + String.fromCharCode(8230)
          } else {
              return string
          }
      },
  },
  data() {
      return {

      }
  }
}
</script>

