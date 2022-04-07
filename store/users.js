/*
    Example user profile state management
    API found in: ./api/users.js
*/
import Vue from 'vue';

// Returns the current index if user already exists in the list array state
const findUserIndex = (state, userId) => state.list.findIndex((user) => user.userId === userId);

export const state = () => ({
    listFilled: false,
    list: [],
    filteredList: [],
});

export const mutations = {
    setFilteredUserList: (state, data) => {
        state.filteredList = data;
    },
    setUserList: (state, data) => {
        state.list = data;
        state.listFilled = true;
    },
    // TODO: state should be a reserved word
    setUserById: (vuexState, {
        userId, username, email, city, state,
    }) => {
        const userIndex = findUserIndex(vuexState, userId);

        /*
        *   Vuex must respect vue's reactivity rules around arrays
        *   https://v2.vuejs.org/v2/guide/reactivity.html#For-Arrays
        *   https://v3.vuex.vuejs.org/guide/mutations.html#mutations-follow-vue-s-reactivity-rules
        */

        // If the user exists update it
        if (userIndex > -1) {
            Vue.set(vuexState.list, userIndex, {
                userId, username, email, city, state,
            });
        // else push a new user to the array
        } else {
            vuexState.list.push({
                userId, username, email, city, state,
            });
        }
    },
    removeUserById: (state, userId) => {
        const userIndex = findUserIndex(state, userId);

        // If the user exists delete it
        if (userIndex > -1) {
            state.list.splice(userIndex, 1);
        }
    },
};

export const actions = {
    // Get the entire user list from the API and set the state
    async fetchUserList({ state, commit }) {
        // Only fetch the entire user list once per session
        // can't use .length since we insert single items on detail/edit pages
        if (!state.listFilled) {
            const users = await this.$api.users.list();
            commit('setUserList', users.data?.results || []);
        }
    },
    // in real world .filter on the existing state.list would be more appropriate
    async searchUserList({ commit }, city) {
        const users = await this.$api.users.search({ city });
        commit('setFilteredUserList', users.data?.results || []);
    },
    // Get individual user details and set the state
    async fetchUserById({ state, commit }, userId) {
        const userIndex = findUserIndex(state, userId);

        // Only fetch user info if it isn't already in the state
        if (userIndex === -1) {
            const user = await this.$api.users.get(userId);
            commit('setUserById', user || {});
        }
    },
    // Create a new user via API and update state on success
    async createUser({ commit }, {
        username, email, city, state,
    }) {
        const response = await this.$api.users.create({
            username,
            email,
            city,
            state,
        });
        // Grab the newly created userId from the response
        const { userId } = response;

        // Make sure there is a successful response before modifying our state
        if (userId) {
            commit('setUserById', {
                userId, username, email, city, state,
            });
        }

        // Always bubble response and handle error/success at the component level
        return response;
    },
    // Update user details via API and update state on success
    async editUserById({ commit }, {
        userId, username, email, city, state,
    }) {
        const response = await this.$api.users.update(userId, {
            username,
            email,
            city,
            state,
        });

        if (response) {
            commit('setUserById', {
                userId, username, email, city, state,
            });
        }

        return response;
    },
    // Delete the user via API and then in the state list
    async deleteUserById({ commit }, userId) {
        const user = await this.$api.users.delete(userId);
        commit('removeUserById', user);
    },
};

export const getters = {
    // Return the specific user in our state based on userId
    // Could also be done with `findUserIndex`
    getUserById: (state) => (id) => (state.list && state.list.find((user) => user.userId === id)) || {},
};
