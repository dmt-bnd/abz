<template>
  <div class="abzUpload"
       :class="{ error: helper_text != '', 
                 disabled: is_enabled === false}">
      <input type="file"
             accept="image/jpeg" 
             name="file" 
             id="file" 
             ref="file" 
             class="inputFile" 
             v-on:change="onFileChange" 
             :tabindex="currentTabindex"/>
      <label for="file">Upload</label>
      <div>
          <input type="text" :value="image_name" placeholder="Upload your photo">
      </div>
      <p class="helperText" v-if="helper_text != ''">{{helper_text}}</p>
  </div>
</template>

<style scoped lang=scss>
    .abzUpload {
        display: flex;
        min-width: 329px;
        padding-top: 1px;
        border-radius: 4px;
        .inputFile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
            &:focus {
                & ~ div {
                    border-color: rgba(0, 0, 0, 0.87);
                }
            }
        }
        label {
            font-size: 16px;
            padding: 15px 14px 14px 15px;
            color: #000000;
            margin-top: -1px;
            background-color: $bg-color;
            border: 1px solid rgba(0, 0, 0, 0.87);
            border-radius: 4px 0px 0px 4px;
            cursor: pointer;
        }
        div {
            display: flex;
            flex: auto;
            margin-top: -1px;
            border: 1px solid #D0CFCF;
            border-left-style: none;
            border-radius: 0px 4px 4px 0px;
            input {
                width: 100%;
                font-size: 16px;
                font-family: 'Nunito';
                margin: 13px 15px 13px 15px;
                color: #000000;
                pointer-events: none;
            }
        }
        .helperText {
            position: absolute;
            margin-top: 55px;
            margin-left: 15px;
            font-size: 12px;
            color: #CB3D40;
        }
        &:hover {
            div {
                border-color: rgba(0, 0, 0, 0.87);
            }
        }
        &:focus {
            div {
                border-color: rgba(0, 0, 0, 0.87);
            }
        }
         @media (min-width: 768px) {
             min-width: 381px;
        }
    }
    .disabled {
        pointer-events: none;
        label {
            color: #D0CFCF;
            border-color: #D0CFCF;
        }
        div {
            border-color: #D0CFCF;
            input {
                color: #D0CFCF;
                &::placeholder {
                    color: #D0CFCF;
                }
            }
        }
    }
    .error {
        box-shadow: inset 0 0 0 2px #cb3d40;
        label {
            border: 1px solid #CB3D40;
            box-shadow: inset 0 0 0 1px #CB3D40;
        }
        div {
            border-color: #CB3D40 !important;
        }
    }
</style>

<script>

export default {
  components: {  },
  name: 'abz-upload',
  props: {
      is_enabled: {
          type: Boolean,
          default: true,
      },
      tabindex: {
          type: Number,
          default: 0
      }
  },
  computed: {
      currentTabindex() {
          if(this.is_enabled === false) {
              return -1
          } else {
              return this.tabindex
          }
      }
  },
  methods: {
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if(files[0].size > 5000000) {
            this.helper_text = 'The photo size must not be greater than 5 Mb'
        } else {
            let _URL = window.URL;
            let img;
            let vm = this
            let fm = this.$refs.file.files[0]
            if (files[0]) {
                img = new Image();
                img.onload = function () {
                    if(this.width < 70 || this.height < 70) {
                        vm.helper_text = 'Minimum size of photo 70x70px'
                        vm.image_name = files[0].name;
                        vm.file = '';
                        vm.emitImage()
                    } else {
                        vm.image_name = files[0].name;
                        vm.file = fm;
                        vm.helper_text = ''
                        vm.emitImage()
                    }
                };
                img.src = _URL.createObjectURL(files[0]);
            }
        }    
    },
    emitImage() {
        this.$emit('emitImage', this.file);
    }
  },
  data() {
      return {
          image_name: '',
          file: '',
          helper_text: '',
      }
  }
}
</script>
