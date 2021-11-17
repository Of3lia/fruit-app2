import Fruit from '../../src/components/Fruit.vue'
import { shallowMount } from '@vue/test-utils';

describe('Fruit', () => {
    const wrapper = shallowMount(Fruit, {
        propsData: {
            fruit: {
                id: "",
                isFruit: true,
                name: "Apple",
                price: "",
                taste: "",
                color: "",
                description: "",
                expires: "",
                image: "",
                props: {
                    empty: false,
                    isLoading: false,
                    isEdit: false,
                },
            }
        }
    });

    it('checks the prop fruit name  ', () => {
        expect(wrapper.props().fruit.name).toBe('Apple');
    })
})