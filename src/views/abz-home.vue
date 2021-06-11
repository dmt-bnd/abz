<template>
  <main class="abzHome">
      <section class="info" id="info">
        <div class="bgImage">
          <article class="welcomeText">
            <div class="textContainer">
              <h1>Test assignment for front-end developers</h1>
              <p>{{welcomeText}} </p>
              <abz-btn :tabindex="1" @click.native="goTo('form')"/>
            </div>
          </article>
        </div>
        <article class="developer" id="developer">
          <div class="developerContainer">
            <div class="imageWrapper">
              <img src="../assets/img/Image-328x287.svg" alt="Developer at work">
            </div>
            <div class="textContainer">
              <h1>Let's get acquainted</h1>
              <h2>I'm a good front-end developer</h2>
              <p>What defines a good front-end developer is one that has skilled knowledge of HTML, 
                CSS, JS with a vast understanding of User design thinking as they'll be building web 
                interfaces with accessibility in mind. They should also be excited to learn, as the 
                world of Front-End Development keeps evolving.</p>
              <abz-btn :tabindex="2" @click.native="goTo('form')"/>
            </div>
          </div>
        </article>
      </section>
      <section class="interactive">
        <article class="users" id="users">
          <h1>Our cheerful users</h1>
          <h2>The best specialists are shown below</h2>
          <ul class="cardsContainer" :style="{ 'grid-template-rows': `repeat(${Math.ceil(USERS.length / USERS_COUNT)}, 313px)` }">
            <abz-devcard v-for="user in this.USERS.users" 
                        :key="user.id"
                        :user_data="user" />
          </ul>
          <abz-btn title="Show more" 
                   :class="{'hideBtn' : this.USERS.page === this.USERS.total_pages}" 
                   @click.native="showMore(); delay()"
                   :tabindex="3"/>
        </article>
        <article class="form" id="form">
          <h1>Register to get a work</h1>
          <h2>Your personal data is stored according to the Privacy Policy</h2>
          <form class="formContainer">
            <abz-input id="text" 
                       label="Your name" 
                       @setValue="setName($event)"
                       :helper_text="name_helper_text"
                       :tabindex="4"
                       :max_length="60"/>
            <abz-input id="email" 
                       label="Email" 
                       placeholder="Email@example.com" 
                       :helper_text="email_helper_text" 
                       @setValue="setEmail($event)"
                       :tabindex="5"
                       :max_length="100"/>
            <abz-input id="tel" 
                       label="Phone" 
                       placeholder="+380993335588" 
                       :helper_text="phone_helper_text" 
                       @setValue="setPhone($event)" 
                       :tabindex="6"
                       :max_length="13"/>
            <ul>
              <li class="positions">
                <p>Select your position</p>
                <ul>
                  <abz-radio v-for="position in this.POSITIONS.positions" 
                       :key="position.id"
                       :position_data="position"
                       :selected_id="selected_id"
                       @radioBtnClicked="setId($event)"
                       :tabindex="7"/>
                </ul>
              </li>
            </ul>
            <abz-upload :tabindex="8" 
                        @emitImage="setImage($event)"/>
            <abz-btn :tabindex="9" 
                     :is_enabled="submitEnabled" 
                     @click.native="submitForm(); delay()"/>
          </form>
        </article>
      </section>
  </main>
</template>

<script>
import abzBtn from '../components/abz-btn.vue'
import abzDevcard from '../components/abz-devcard.vue'
import abzInput from '../components/abz-input.vue'
import abzRadio from '../components/abz-radio.vue'
import abzUpload from '../components/abz-upload.vue'
import axiosInstance from '@/api/index.js';
import {mapGetters, mapActions} from 'vuex'

export default {
  components: { abzBtn, abzDevcard, abzInput, abzRadio, abzUpload},
  name: 'abz-home',
  computed: {
    ...mapGetters([
      'USERS',
      'POSITIONS',
      'TOKEN',
      'APP_WIDTH',
      'USERS_COUNT',
    ]),
    submitEnabled() {
      if(this.user_name && this.user_email && this.user_phone && this.user_image) {
        return true
      } else {
        return false
      }
    },
    welcomeText() {
      let text
      if(this.APP_WIDTH >= 768) {
        text = 'Front-end developers make sure the user sees and interacts with all the necessary elements to ensure conversion. \n\
                Therefore, responsive design, programming languages and specific frameworks are the must-have skillsets to look \n\
                for when assessing your front-end developers.'
      } else {
        text = 'Front-end developers make sure the user sees and interacts with all the necessary elements to ensure conversion'
      }
      return text
    }
  },
  methods: {
    ...mapActions([
      'GET_NEXT_USERS_PAGE',
      'GET_FIRST_USERS_PAGE',
      'GET_POSITIONS',
      'GET_TOKEN',
    ]),
    showMore() {
      this.GET_NEXT_USERS_PAGE(this.USERS.links.next_url);
    },
    setId(value) {
      this.selected_id = value
    },
    setName(value) {
      if(value.length < 2 && value.length != 0) {
        this.name_helper_text = 'Name is too short'
        this.user_name = ''
      } else {
        this.name_helper_text = ''
        this.user_name = value
      }
    },
    setEmail(value) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(value)) {
        this.email_helper_text = ''
        this.user_email = value
      } else if(value === '') {
        this.email_helper_text = ''
      } 
        else {
        this.email_helper_text = 'Invalid email format'
        this.user_email = ''
      }
    },
    setPhone(value) {
      if(value.match(/^\+380\d{3}\d{2}\d{2}\d{2}$/) != null) {
        this.phone_helper_text = ''
        this.user_phone = value
      } else if(value === '') {
        this.phone_helper_text = ''
      } else if(value.length < 13) {
        this.phone_helper_text = 'This number is too short'
      }
        else {
        this.phone_helper_text = 'Invalid number format'
        this.user_phone = ''
      }
    },
    setImage(value) {
      this.user_image = value
    },
    submitForm(){
      let vm = this;
      let formData = new FormData();
      formData.append('name', this.user_name);
      formData.append('email', this.user_email);
      formData.append('phone', this.user_phone);
      formData.append('position_id', this.selected_id);
      formData.append('photo', this.user_image);
      axiosInstance.post( '/users',
      formData, {
        headers: {
            'Token': this.TOKEN.token,
            'Content-Type': 'multipart/form-data'
        }
      }).then(function(response){
        vm.showModal(response.data);
      })
        .catch(function(error){
        vm.showModal(error.response.data);
        console.log(error);
      });
    },
    goTo(id) {
      const yOffset = -60; 
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
    },
    showModal(response) {
      this.$emit('showModal', response)
    },
    delay () {
        this.is_enabled = false

        this.timeout = setTimeout(() => {
          this.is_enabled = true
        }, 500)
      },
  },
  data() {
      return {
        selected_id: 1,
        user_name: '',
        name_helper_text: '',
        user_email: '',
        email_helper_text: '',
        user_phone: '', 
        phone_helper_text: '',
        user_image: '',
      }
  },
  mounted() {
    this.GET_FIRST_USERS_PAGE(this.USERS_COUNT);
    this.GET_POSITIONS();
    this.GET_TOKEN();
  }
}
</script>

<style scoped lang=scss>
    .abzHome {
      .info {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;
        background-color: #EDECEA;
        .bgImage{
            display: flex;
            justify-content: center;
            width: 100%;
            background-image: url("~@/assets/img/Banner_photo.jpg");
            background-size: 815px;
            background-repeat: no-repeat;
            background-position: right -237px bottom -22px;
          .welcomeText {
            max-width: 749px;
            padding: 52px 16px;
            text-align: left;
            
            .textContainer {
              margin-top: 59px;
              h1 {
                padding-right: 70px;
              }
              p {
                margin-top: 21px;
                margin-bottom: 32px;
                padding-right: 79px;
              }
            }
          }
        }
        .developer {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          background-color: $bg-color;
          .developerContainer {
            display: flex;
            flex-direction: column;
            padding: 144px 15px 0px 16px;
            max-width: 749px;
            .imageWrapper {
              display: flex;
              justify-content: center;
              img {
                margin-left: -1px;
              }
            }
            .textContainer {
              margin-top: 40px;
              h2  {
                margin-top: 10px;
              }
              p {
                margin-top: 20px;
                margin-bottom: 32px;
              }
            }
          }
        }
        @media (min-width: 768px) {
          .bgImage {
            padding-bottom: 29px;
            background-size: 1071px;
            background-position: left 46% bottom 0px;
            .welcomeText {
                .textContainer {
                margin-top: 89px;
                margin-left: 16px;
                h1 {
                  padding-right: 300px;
                }
                p {
                  padding-right: 300px;
                  margin-bottom: 31px;
                }
              }
            }
          }
          .developer {
            .developerContainer {
              flex-direction: row;
              .imageWrapper {
                  margin-top: 30px;
                  margin-left: 17px;
                img {
                  width: 296px;
                }
              }
              .textContainer {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                text-align: right;
                margin-right: 17px;
                margin-top: 31px;
                p {
                  padding-left: 40px;
                }
              }
            }
          }
        }
        @media (min-width: 1024px) {
          .bgImage {
            padding-bottom: 133px;
            background-size: 1391px;
            background-position: left 50% bottom 0px;
            .welcomeText {
              max-width: 907px;
              .textContainer {
                margin-top: 193px;
                margin-left: 1px;
                p  {
                  padding-right: 360px;
                  margin-bottom: 25px;
                }
              }
            }
          }
          .developer {
            .developerContainer {
              max-width: 907px;
              .imageWrapper {
                margin-top: 31px;
                margin-left: 2px;
                img {
                  width: 387px;
                }
              }
              .textContainer {
                margin-right: 2px;
                margin-top: 46px;
              }
            }
          }
        }
        @media (min-width: 2560px) {
          .bgImage {
            .welcomeText {
              .textContainer {
                margin-left: -130px;
                p {
                  padding-right: 500px;
                }
              }
            }
          }
          .developer {
            .developerContainer {
              max-width: 1173px;
              .imageWrapper {
                margin-top: 36px;
                margin-left: 3px;
              }
              .textContainer {
                margin-top: 66px;
                p {
                  padding-left: 100px;
                }
              }
            }
          }
        }
      }


      .interactive {
        .users {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 145px;
          overflow-x: hidden;
          h1 {
            padding: 0px 30px;
          }
          h2 {
            margin-top: 10px;
            margin-bottom: 32px;
          }
          .cardsContainer {
            display: grid;
            grid-template-columns: repeat(1, 328px);
            gap: 20px;
            margin-bottom: 50px;
          }
          .hideBtn {
            display: none;
          }
        }
        .form {
          margin-top: 145px;
          padding-bottom: 149px;
          background-image: url("~@/assets/img/Footprint-328x124.svg");
          background-repeat: no-repeat;
          background-position: bottom 1px right 0px; 
          h1 {
            padding: 0px 35px;
          }
          h2 {
            margin-top: 10px;
          }
          .formContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 32px;
            margin-left: 1px;
            & > * + * {
              margin-top: 50px;
            }
            ul  {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .positions {
              display: flex;
              flex-direction: column;
              min-width: 314px;
              margin-left: -15px;
              margin-top: -7px;
              p {
                text-align: left;
              }
              ul {
                margin-top: 13px;
                & > * + * {
                  margin-top: 12px;
                }
              }
            }
          }
        }
        @media (min-width: 768px) {
          .users {
            margin-top: 175px;
            .cardsContainer {
              grid-template-columns: repeat(2, 344px);
              gap: 16px;
            }
          }
          .form {
            margin-top: 175px;
            padding-bottom: 179px;
            background-size: 467px;
            .formContainer {
              .positions {
                min-width: 367px;
              }
            }
          }
        }
        @media (min-width: 1024px) {
          .users {
            margin-top: 176px;
            .cardsContainer {
              grid-template-columns: repeat(3, 282px);
              gap: 29px;
            }
          }
        }
        @media (min-width: 2560px) {
          .users {
            margin-top: 192px;
            .cardsContainer {
              grid-template-columns: repeat(3, 370px);
            }
          }
        }
      }
    }
</style>

