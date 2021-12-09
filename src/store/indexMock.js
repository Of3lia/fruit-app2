import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
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

            // return axios
            //     .delete('http://localhost:3000/fruit/' + id)
            //     .then(r => {
            //         commit('REMOVE_FRUIT', id)
            //     })
            //     .catch(e => {
            //         console.log(e);
            //         alert('Ups! There was an error, try again later');
            //     });
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

// Utils TODO: move to utils file

var getFruitsFromChaos = async (data, state) => {

    let fruits = traverse(data);
    fruits.map(f => addFruitProps(f));
    fruits.forEach(fruit => {
        state.fruits.push(fruit);
    });

    state.fruits.sort((a, b) => a.id - b.id);
}

function traverse(jsonObj) {
    let fruits = [];
    if (jsonObj !== null && typeof jsonObj == "object") {

        Object.entries(jsonObj).forEach(([key, value]) => {

            let returnFruits = traverse(value);
            returnFruits.forEach(fruit => { fruits.push(fruit); });

            if (key == 'isFruit' && value === true && jsonObj.id) { fruits.push(jsonObj); }
        });
    }
    return fruits;
}

function addFruitProps(fruit) {
    fruit.props = { isLoading: false, isEdit: false };
}

function getFruitCloneWithoutProps(fruit) {
    let clone = { ...fruit }
    delete clone.props;
    return clone;
}