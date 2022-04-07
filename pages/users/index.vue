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
            :items="computedUsers"
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
            filteredUsers: (state) => state.users.filteredList,
        }),
        computedUsers() {
            if (this.searchTerm.trim()) {
                return this.filteredUsers;
            }
            return this.users;
        },
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
            await this.searchUserList(this.searchTerm);
        },
    },
};
</script>
