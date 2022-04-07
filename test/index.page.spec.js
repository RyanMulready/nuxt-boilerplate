import { mount, config } from '@vue/test-utils';
import IndexPage from '@/pages/index.vue';

config.mocks.$t = (key) => key;

describe('IndexPage', () => {
    it('is a Vue instance', () => {
        const wrapper = mount(IndexPage);
        expect(wrapper.vm).toBeTruthy();
    });
});
