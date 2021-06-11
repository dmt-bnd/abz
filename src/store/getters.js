export default {
    APP_WIDTH(state) {
        return state.app_width;
    },
    USERS(state) {
        return state.users;
    },
    POSITIONS(state) {
        return state.positions;
    },
    TOKEN(state) {
        return state.token;
    },
    USERS_COUNT(state) {
        if(state.app_width < 768) {
            return 3
          } else if(state.app_width < 1024) {
            return 6
          } else {
            return 9
          }
    },
}