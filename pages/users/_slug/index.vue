<template>
    <div>
        <h1>
            User Details
        </h1>
        <b-card
            :title="userId"
            footer-tag="footer">
            <b-card-text>
                <dl class="row">
                    <dt class="col-2">
                        Username:
                    </dt>
                    <dd class="col-10">
                        {{ user.username }}
                    </dd>
                    <dt class="col-2">
                        Email:
                    </dt>
                    <dd class="col-10">
                        {{ user.email }}
                    </dd>
                    <dt class="col-2">
                        Location:
                    </dt>
                    <dd class="col-10">
                        {{ user.city }}
                        {{ user.state }}
                    </dd>
                </dl>
            </b-card-text>
            <template #footer>
                <b-button
                    to="/users">
                    Back
                </b-button>
                <b-button
                    class="float-right"
                    variant="primary"
                    :to="`/users/${userId}/edit`">
                    Edit
                </b-button>
            </template>
        </b-card>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'UserView',
    data() {
        return {
            userId: this.$route.params.slug,
        };
    },
    computed: {
        ...mapGetters({
            getUserById: 'users/getUserById',
        }),
        user() {
            return this.getUserById(this.userId);
        },
    },
    async mounted() {
        try {
            await this.fetchUserById(this.userId);
        // Handle 404 from API on bad userId slug
        // eslint-disable-next-line no-empty
        } catch (e) {}
    },
    methods: {
        ...mapActions({
            fetchUserById: 'users/fetchUserById',
        }),
    },

};
</script>
