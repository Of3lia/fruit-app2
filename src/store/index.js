import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        fruits: [],
    },
    actions: {
        loadFruits({ commit }) {
            axios
                .get('http://localhost:3000/fruit')
                .then(r => r.data)
                .then(fruits => {
                    commit('SET_FRUITS', fruits)
                })
        }
    },
    mutations: {
        SET_FRUITS(state, fruits) {
            state.fruits = [];
            getFruitsFromChaos(fruits.data, state);
        }
    },
    modules: {}
})

// Utils TODO: move to utils file

var getFruitsFromChaos = async(data, state) => {

    let fruits = traverse(data);
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