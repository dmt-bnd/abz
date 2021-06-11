<template>
  <div  class="abzBtn" 
        :class="{ disabled: is_enabled === false }" 
        :tabindex="currentTabindex">
      <span>{{title}}</span>
      <div class="abzBtn__focused"></div>
  </div>
</template>

<style scoped lang=scss>
    .abzBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 148px;
        height: 50px;
        background-color: $primary-color;
        border-radius: 80px;
        font-family: $ff-primary;
        font-size: 16px;
        cursor: pointer;
        overflow: hidden;
        .abzBtn__focused {
            width: 120px;
            height: 50px;
            position: absolute;
            background-color: inherit;
            border-radius: 80px;
            top: 0px;
            transition-duration: 80ms;
        }
        span {
            z-index: 1;
            user-select: none;
        }
        &:hover {
            background-color: #FFE302;
        }
        &:focus {
           .abzBtn__focused {
               background-color: rgba(126, 126, 126, 0.5);
           } 
        }
        &:active {
           .abzBtn__focused {
                background-color: rgba(126, 126, 126, 0.5);
                width: 138px;
                height: 86px;
           } 
        }
    }
    .disabled {
        color: #FFFFFF;
        background-color: #B4B4B4;
        pointer-events: none;
    }
</style>

<script>

export default {
  components: {  },
  name: 'abz-btn',
  computed: {
      currentTabindex() {
          if(this.is_enabled === false) {
              return -1
          } else {
              return this.tabindex
          }
      }
  },
  props: {
      title: {
          type: String,
          default: 'Sign up',
      },
      is_enabled: {
          type: Boolean,
          default: true,
      },
      tabindex: {
          type: Number,
          default: 0
      }
  },
  data() {
      return {
          timeout: null,
      }
  }
}
</script>

