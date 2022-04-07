import users from '~/api/users';

export default async (ctx, inject) => {
    // Initialize API repositories
    const api = {
        users: await users(ctx),
    };

    ctx.$api = api;

    inject('api', api);
};
