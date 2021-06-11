<template>
  <aside class="abzMobileMenu" ref="menu_bg">
      <nav class="abzMobileMenu_Content">
          <a href="#" class="logo">
            <img src="../assets/img/logo-image.svg" alt="" class="logoImage">
            <img src="../assets/img/logo-title.svg" alt="" class="logoTitle">
          </a>
          <ul>
              <li><a href="#">About me</a></li>
              <li><a href="#">Relationship</a></li>
              <li><a href="#">Users</a></li>
              <li><a href="#">Sign up</a></li>
              <li><a href="#">Terms and Conditions</a></li>
          </ul>
          <ul>
              <li><a href="#">How it works</a></li>
              <li><a href="#">Partnership</a></li>
              <li><a href="#">Help</a></li>
              <li><a href="#">Level testimonial</a></li>
              <li><a href="#">Contact us</a></li>
          </ul>
          <ul>
              <li><a href="#">Articles</a></li>
              <li><a href="#">Our news</a></li>
              <li><a href="#">Testimonials</a></li>
              <li><a href="#">Licenses</a></li>
              <li><a href="#">Privacy Policy</a></li>
          </ul>
      </nav>
  </aside>
</template>

<style scoped lang=scss>
    .abzMobileMenu {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        z-index: 3;
        .abzMobileMenu_Content {
            position: fixed;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            width: 270px;
            height: 100%;
            padding-top: 16px;
            padding-bottom: 100px;
            background-color: #ffffff;
            z-index: 3;
            overflow-y: scroll;
            & > * + * {
                margin-top: 64px;
            }
            &::-webkit-scrollbar {
                width: 0;
            }
            .logo {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 16px;
                margin-top: 1px;
                margin-bottom: -14px;
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
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                margin-right: -17px;
                &:last-of-type {
                    margin-bottom: 50px;
                }
                & > * + * {
                margin-top: 26px;
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
        }
    }
</style>

<script>

export default {
  components: {  },
  name: 'abz-mobile-menu',
  methods: {
      closeMenu() {
          this.$emit('closeMenu')
      }
  },
  data() {
      return {

      }
  },
  mounted() {
      let vm = this;
      document.addEventListener('click', function (item){
          if(item.target === vm.$refs['menu_bg']) {
              vm.closeMenu();
          }
      })
  }
}
</script>

