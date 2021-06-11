import axios from 'axios';
import axiosInstance from '@/api/index.js';

export default {
    GET_FIRST_USERS_PAGE({commit}, count) {
        return axiosInstance('users', {
            method: 'GET',
            params: {
                count: count,
            }
        })
        .then((users) => {
            commit('SET_USERS', users.data);
            return users.data;
        })
        .catch((error) => {
            console.log(error)
            return error
        })
    },
    GET_NEXT_USERS_PAGE({commit}, link) {
        return axios(link, {
            method: 'GET',
        })
        .then((users) => {
            commit('ADD_USERS', users.data);
            return users.data;
        })
        .catch((error) => {
            console.log(error)
            return error
        })
    },
    GET_POSITIONS({commit}) {
        return axiosInstance('positions', {
            method: 'GET',
        })
        .then((positions) => {
            commit('SET_POSITIONS', positions.data);
            return positions.data;
        })
        .catch((error) => {
            console.log(error)
            return error
        })
    },
    GET_TOKEN({commit}) {
        return axiosInstance('token', {
            method: 'GET',
        })
        .then((token) => {
            commit('SET_TOKEN', token.data);
            return token.data;
        })
        .catch((error) => {
            console.log(error)
            return error
        })
    },
}