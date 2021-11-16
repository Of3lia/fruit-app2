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
                .catch(e => { console.log(e) });
        },
        createFruit({ commit }, fruit) {
            axios
                .post('http://localhost:3000/fruit', {...fruit })
                .then(r => {
                    commit('ADD_FRUIT', r.data)
                })
                .catch(e => { console.log(e) });
        },
        editFruit({ commit }, fruit) {
            let fruitClone = getFruitCloneWithoutProps(fruit);
            axios
                .put('http://localhost:3000/fruit/' + fruitClone.id, {...fruitClone })
                .then(r => {
                    commit('EDIT_DATA', r.data)
                })
                .catch(e => { console.log(e) });
        },
        deleteFruit({ commit }, id) {
            axios
                .delete('http://localhost:3000/fruit/' + id)
                .then(r => {
                    commit('REMOVE_FRUIT', id)
                })
                .catch(e => { console.log(e) });
        }
    },
    mutations: {
        SET_FRUITS(state, fruits) {
            state.fruits = [];
            getFruitsFromChaos(fruits.data, state);
        },
        ADD_FRUIT(state, newFruit) {
            addFruitProps(newFruit);
            state.fruits.push(newFruit);
        },
        EDIT_DATA(state, fruit) {
            // Object.assign(state.fruits.find(x => x.id === fruit.id), {...fruit });
            state.fruits.find(x => x.id == fruit.id).name = fruit.name;
            // oldFruit.name = fruit.name;
            // oldFruit.price = fruit.price;
            // oldFruit.description = fruit.description;
            // oldFruit.color = fruit.color;
            // oldFruit.expires = fruit.expires;
            // oldFruit.image = fruit.image;
            // oldFruit.taste = fruit.taste;
            // console.log(oldFruit);
        },
        REMOVE_FRUIT(state, id) {
            let currentFruit = state.fruits.find(x => x.id === id);
            // currentFruit.id = '';
            currentFruit.props.isDeleted = true;
        }
    },
    modules: {}
})

// Utils TODO: move to utils file

var getFruitsFromChaos = async(data, state) => {

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
    fruit.props = { isLoading: false, isDeleted: false, isEdit: false };
}

function getFruitCloneWithoutProps(fruit) {
    let clone = {...fruit }
    delete clone.props;
    return clone;
}