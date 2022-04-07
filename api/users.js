/*
    Example user profile API service
    Extended from base nuxt/axios: https://go.nuxtjs.dev/axios
    State management found in: ./store/users.js
*/
export default async (ctx) => {
    // AWS_USER_PROFILE_API is defined in /.env and configured in ./nuxt.config.js
    const api = ctx.$axios.create({
        baseURL: ctx.$config.AWS_USER_PROFILE_API,
    });
    return {
        create: async ({
            username, email, city, state,
        }) => {
            if (!username || !email) {
                // throwing an error stops the function and bubbles to the caller
                throw Error('Username and email are required!');
            }
            // no await is needed, return is asnyc
            return api.$post('/users', {
                username, email, city, state,
            });
        },
        update: async (userId, {
            username, email, city, state,
        }) => {
            if (!userId) {
                throw Error('userId is required!');
            }
            return api.$patch(`/users/${userId}`, {
                username, email, city, state,
            });
        },
        delete: async (userId) => {
            if (!userId) {
                throw Error('userId is required!');
            }
            return api.$delete(`/users/${userId}`);
        },
        get: async (userId) => {
            if (!userId) {
                throw Error('userId is required!');
            }
            return api.$get(`/users/${userId}`);
        },
        list: async () => api.get('/users'),
        // TODO: `search` and `list` could be combined into one
        // TODO: Add other search params
        search: async ({ city }) => {
            if (!city) {
                throw Error('City is required!');
            }
            const params = new URLSearchParams({ city }).toString();

            return api.get(`/users?${params}`);
        },
    };
};
