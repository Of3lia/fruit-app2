import Vue from 'vue'
import Vuex from 'vuex'
const mockData = require('../assets/fruits.json');

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        createFruit: false,
        fruits: [],

    },
    actions: {
        loadFruits({ commit }) {
            commit('SET_FRUITS', mockData);
        },
        createFruit({ commit }, fruit) {
            commit('ADD_FRUIT', fruit)
        },
        editFruit({ commit }, fruit) {
            commit('EDIT_DATA', fruit)
        },
        deleteFruit({ commit }, id) {
            commit('REMOVE_FRUIT', id)
        }
    },
    mutations: {
        SET_CREATE_FRUIT(state, val) {
            state.createFruit = val;
        },
        SET_FRUITS(state, fruits) {
            state.fruits = [];
            state.fruits = fruits;
        },
        ADD_FRUIT(state, newFruit) {
            setTimeout(() => {
                addFruitProps(newFruit);
                state.fruits.push(newFruit);
                this.state.createFruit = false;
            }, 1000);
        },
        EDIT_DATA(state, newFruit) {
            let current = state.fruits.find(x => x.id == newFruit.id);
            current = newFruit;
            setTimeout(() => {
                current.props.isLoading = false;
                current.props.isEdit = false;
            }, 1000);
        },
        REMOVE_FRUIT(state, id) {
            setTimeout(() => {
                state.fruits.splice(state.fruits.findIndex(x => x.id === id), 1);
            }, 1000);
        }
    },
    modules: {}
})

function addFruitProps(fruit) {
    fruit.props = { isLoading: false, isEdit: false };
}