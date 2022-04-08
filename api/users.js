/* eslint-disable no-unused-vars */
/*
    Example user profile API service
    Extended from base nuxt/axios: https://go.nuxtjs.dev/axios
    methods available are $post, $patch, $delete, $get
    State management found in: ./store/users.js
*/
export default async (ctx) => {
    // AWS_USER_PROFILE_API is defined in /.env and configured in ./nuxt.config.js
    const api = ctx.$axios.create({
        baseURL: ctx.$config.AWS_USER_PROFILE_API,
    });
    return {
        // Create a new user
        create: async ({
            username, email, city, state,
        }) => { },
        // Update an existing user
        update: async (userId, {
            username, email, city, state,
        }) => { },
        // Delete an existing user
        delete: async (userId) => { },
        // Get individual user details
        get: async (userId) => { },
        // Get all users
        list: async () => [],
        // Search all users based on city
        search: async ({ city }) => [],
    };
};
