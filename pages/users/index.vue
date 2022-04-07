<template>
    <div>
        <h1>
            User List
        </h1>
        <b-row class="mb-2">
            <b-col>
                <b-form @submit.stop.prevent="filterUserList">
                    <b-form-input
                        v-model="searchTerm"
                        placeholder="Search(city)" />
                </b-form>
            </b-col>
            <b-col>
                <b-button
                    variant="primary"
                    class="float-right"
                    to="/users/new">
                    Create User
                </b-button>
            </b-col>
        </b-row>
        <b-table
            :items="users"
            :fields="fields"
            hover
            striped>
            <template #cell(userId)="row">
                <b-link :to="`/users/${row.item.userId}`">
                    {{ row.item.userId }}
                </b-link>
            </template>
        </b-table>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'UsersIndex',
    data() {
        return {
            searchTerm: '',
            fields: [
                {
                    key: 'userId',
                },
                {
                    key: 'username',
                    sortable: true,
                },
                {
                    key: 'email',
                    sortable: true,
                },
                {
                    key: 'city',
                    sortable: true,
                },
                {
                    key: 'state',
                    sortable: true,
                },
            ],
        };
    },
    computed: {
        ...mapState({
            users: (state) => state.users.list,
        }),
    },
    async mounted() {
        await this.fetchUserList();
    },
    methods: {
        ...mapActions({
            searchUserList: 'users/searchUserList',
            fetchUserList: 'users/fetchUserList',
        }),
        async filterUserList() {
            if (this.searchTerm) {
                await this.searchUserList(this.searchTerm);
            } else {
                await this.fetchUserList();
            }
        },
    },
};
</script>
