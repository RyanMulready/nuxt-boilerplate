import { mount, config, createLocalVue } from '@vue/test-utils';
import IndexPage from '@/pages/index.vue';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

config.mocks.$t = (key) => key;

describe('IndexPage', () => {
    it('is a Vue instance', () => {
        const wrapper = mount(IndexPage, { localVue });
        expect(wrapper.vm).toBeTruthy();
    });
});
