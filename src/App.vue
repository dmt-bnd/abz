<template>
  <div id="app">
    <header>
      <div class="headerContainer">
        <a href="#" class="logo">
          <img src="./assets/img/logo-image.svg" alt="" class="logoImage">
          <img src="./assets/img/logo-title.svg" alt="" class="logoTitle">
        </a>
        <nav>
          <ul v-if="this.APP_WIDTH >= 1024">
            <li><a href="#" @click.prevent="goTo('form')">About me</a></li>
            <li><a href="#" @click.prevent="goTo('info')">Relationships</a></li>
            <li><a href="#" @click.prevent="goTo('developer')">Requirements</a></li>
            <li><a href="#" @click.prevent="goTo('users')">Users</a></li>
            <li><a href="#" @click.prevent="goTo('form')">Sign Up</a></li>
          </ul>
          <div class="mobileMenu" 
               v-if="this.APP_WIDTH < 1024"
               @click="openMenu()"></div>
        </nav>
      </div>
    </header>
    <transition name="fade">
      <abz-modal v-if="this.is_modal_enabled"
                 :header="modal_header"
                 :message="modal_message"
                 :btn_title="modal_btn_title"
                 @closeModal="closeModal()"/>
    </transition>
    <transition name="fade">
      <abz-mobile-menu v-if="this.is_mobile_menu_enabled"
                       @closeMenu="closeMenu()"/>
    </transition>
    <abz-home @showModal="showModal($event)"/>
    <footer>
      <a href="https://abz.agency/">© abz.agency specially for the test task</a>
    </footer>
  </div>
</template>

<script>
import abzHome from './views/abz-home.vue'
import abzModal from './components/abz-modal.vue'
import abzMobileMenu from './components/abz-mobile-menu.vue'
import {mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    abzHome,
    abzModal,
    abzMobileMenu
  },
  computed: {
    ...mapGetters([
      'APP_WIDTH',
    ]),
  },
  methods: {
    ...mapActions([
      'GET_TOKEN',
    ]),
    updateWidth() {
      this.$store.commit('SET_WIDTH', window.innerWidth)
    },
    goTo(id) {
      let yOffset = -60; 
      let element = document.getElementById(id);
      let y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
    },
    showModal(response) {
      if(response.success === true) {
        this.modal_header = 'Congratulations'
        this.modal_message = 'You have successfully passed the registration '
        this.modal_btn_title = 'Great'
      } else {
        this.modal_header = 'Error'
        this.modal_message = response.message
        this.modal_btn_title = 'Try again'
      }
      this.is_modal_enabled = true;
    },
    closeModal() {
      this.GET_TOKEN();
      this.is_modal_enabled = false;
    },
    openMenu() {
      this.is_mobile_menu_enabled = true;
    },
    closeMenu() {
      this.is_mobile_menu_enabled = false;
    },
  },
  data() {
    return {
      is_modal_enabled: false,
      is_mobile_menu_enabled: false,
      modal_header: '',
      modal_message: '',
      modal_btn_title: ''
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateWidth);
  }
}
</script>

<style lang="scss">
#app {
  font-family: $ff-primary;
  font-weight: 400;
  text-align: center;
  header {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    background-color: #FFFFFF;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
    z-index: 2;
    .headerContainer {
      display: flex;
      flex: auto;
      align-items: center;
      justify-content: space-between;
      max-width: 749px;
      padding: 16px 13px 17px 13px;
      .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 3px;
        margin-top: 1px;
        .logoImage {
          width: 39px;
        }
        .logoTitle {
          width: 64px;
          margin-left: 1px;
        }
      }
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: -17px;
        & > * + * {
          margin-left: -1.5px;
        }
        li {
          a {
            padding: 7px 16px;
            border-radius: 4px;
            transition-duration: 200ms;
            &:hover {
              color: $secondary-color;
            }
            &:focus {
              color: $secondary-color;
              background-color: rgba(0, 189, 211, 0.1);
            }
          }
        }
      }
      .mobileMenu {
        width: 24px;
        height: 24px;
        background-image: url("~@/assets/img/Menu.svg");
        background-position: center;
        margin-left: auto;
        margin-right: 3px;
        cursor: pointer;
      }
    }
    @media (min-width: 768px) {
      .headerContainer {
        padding: 16px 29px 17px 29px;
      }
    }
    @media (min-width: 1024px) {
      .headerContainer {
        max-width: 907px;
        justify-content: space-between;
        .logo {
          margin-left: 1px;
        }
      }
    }
    @media (min-width: 2560px) {
      .headerContainer {
        max-width: 1173px;
      }
    }
  }
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #E0E0E0;
    background-color: #FFFFFF;
    height: 57px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>
