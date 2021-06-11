<template>
  <div class="abzInput" 
       :class="{ error: helper_text != '', 
                 disabled: is_enabled === false}" >
      <input type="text" 
             :placeholder="placeholder" 
             required 
             v-model="input_value" 
             :tabindex="currentTabindex" 
             @input="setValue"
             :maxlength="max_length">
      <label>{{label}}</label>
      <div class="helperText_Container" v-if="helper_text != ''">
          <p class="helperText">{{helper_text}}</p>
          <p class="charsCounter">{{inputLength}}</p>
      </div>
  </div>
</template>

<style scoped lang=scss>
    .abzInput {
        display: flex;
        flex-direction: column;
        font-size: 16px;
        label {
            position: absolute;
            z-index: 1;
            margin-left: 15px;
            margin-top: 17px;
            color: #7E7E7E;
            font-size: 16px;
            transition-duration: 200ms;
        }
        .helperText_Container {
            display: flex;
            position: relative;
            justify-content: space-between;
            .helperText {
                position: absolute;
                font-size: 12px;
                margin-left: 15px;
                color: #CB3D40;
            }
            .charsCounter {
                position: absolute;
                right: 9px;
                font-size: 12px;
                white-space: nowrap;
            }
        }
        input {
            min-width: 291px;
            min-height: 24px;
            padding: 15px 21px 13px 14px;
            border: 1px solid #D0CFCF;
            border-radius: 4px;
            font-family: $ff-primary;
            font-size: 16px;
            &::placeholder {
                color: $bg-color;
                transition-duration: 200ms;
            }
            &:valid {
                & ~ label {
                    background-color: $bg-color;
                    border-radius: 5px;
                    color: #D0CFCF;
                    font-size: 12px;
                    padding: 0px 4px;
                    margin-left: 12px;
                    margin-top: -7px;
                }
            }
            &:focus {
                & ~ label {
                    background-color: $bg-color;
                    border-radius: 5px;
                    color: $secondary-color;
                    font-size: 12px;
                    padding: 0px 4px;
                    margin-left: 12px;
                    margin-top: -7px;
                }
                &::placeholder {
                    color: #BCBCBC;
                }
            }
        }
        &:focus-within {
            input {
                border: 1px solid $secondary-color;
                box-shadow: inset 0 0 0 1px $secondary-color;
            }
        }
        @media (min-width: 768px) {
            input {
                min-width: 343px;
            }
        }
    }
    .error {
        input {
            border: 1px solid #CB3D40;
            box-shadow: inset 0 0 0 1px #CB3D40;
        }
        label {
            color: #CB3D40 !important;
        }
        &:focus-within {
            label {
                color: $secondary-color !important;
            }
        }
    }
    .disabled {
        pointer-events: none;
        input {
            border: 1px solid #D0CFCF;
        }
        label {
            color: #BCBCBC;
        }
        .helperText {
            color: #BCBCBC;
        }
    }
</style>

<script>

export default {
  components: {  },
  name: 'abz-input',
  props: {
      label: {
          type: String,
          default: 'Your name'
      },
      placeholder: {
          type: String,
          default: 'Enter your name'
      },
      helper_text: {
          type: String,
          default: ''
      },
      is_enabled: {
          type: Boolean,
          default: true,
      },
      tabindex: {
          type: Number,
          default: 0
      },
      max_length: {
          type: Number,
          default: 60
      }
  },
  computed: {
      currentTabindex() {
          if(this.is_enabled === false) {
              return -1
          } else {
              return this.tabindex
          }
      },
      inputLength() {
          return `${this.input_value.length} / ${this.max_length}`
      }
  },
  methods: {
      setValue() {
          this.$emit('setValue', this.input_value);
      }
  },
  data() {
      return {
          input_value: ''
      }
  }
}
</script>

