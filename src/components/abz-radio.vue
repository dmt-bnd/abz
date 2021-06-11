<template>
  <li class="abzRadio">
      <div class="radioBtn" 
           :tabindex="tabindex" 
           :id="position_data.id" 
           :value="position_data.id" 
           :class="{ active: selected_id === position_data.id}" 
           @click="radioBtnClicked"
           @keyup.enter="radioBtnClicked">
          <div class="radioBtnChecked"></div>
      </div>
      <label :for="position_data.id">{{position_data.name}}</label>
  </li>
</template>

<style scoped lang=scss>
    .abzRadio {
        width: 100%;
        display: flex;
        text-align: left;
        .radioBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            box-shadow: inset 0 0 0 1px #D0CFCF;
            border-radius: 50%;
            cursor: pointer;
            transition-duration: 200ms;
            .radioBtnChecked {
                width: 10px;
                height: 10px;
                background-color: $bg-color;
                border-radius: 50%;
                transition-duration: 200ms;
            }
        }
        .radioBtn:focus {
            box-shadow: inset 0 0 0 1px $secondary-color;
        }
        .active {
            box-shadow: inset 0 0 0 1px $secondary-color;
            .radioBtnChecked{
                background-color: $secondary-color;
            }
        }
        label {
            margin-left: 12px;
            margin-top: -1px;
        }
    }
</style>

<script>

export default {
  components: {  },
  name: 'abz-radio',
  props: {
      position_data: {
          type: Object,
          default() {
              return {}
          }
      },
      selected_id: {
          type: Number,
          default: 1
      },
      tabindex: {
          type: Number,
          default: 0,
      }
  },
  methods: {
      radioBtnClicked() {
            this.$emit('radioBtnClicked', this.position_data.id)           
        }
  },
  data() {
      return {

      }
  }
}
</script>