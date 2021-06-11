export default {
    SET_WIDTH: (state, width) => {
        state.app_width = width;
    },
    SET_USERS: (state, users) => {
        state.users = users;
    },
    ADD_USERS: (state, users) => {
        state.users.page = users.page;
        state.users.links = users.links;
        state.users.users = state.users.users.concat(users.users);
    },
    SET_POSITIONS: (state, positions) => {
        state.positions = positions;
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
}