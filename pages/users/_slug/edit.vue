<template>
    <div>
        <h1>
            Edit Details
        </h1>
        <UserForm
            :msgs="msgs"
            :user="user"
            :form-disabled="formDisabled"
            @on-submit="submitUser">
            <template #leftButtons>
                <b-button
                    :to="`/users/${userId}`">
                    Back
                </b-button>
            </template>
            <template #rightButtons>
                <b-button
                    class="float-right mr-2"
                    :disabled="formDisabled"
                    @click="deleteUser">
                    Delete User
                </b-button>
            </template>
        </UserForm>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'UserEdit',
    data() {
        return {
            userId: this.$route.params.slug,
            formDisabled: true,
            delayedRedirect: null,
            redirectTimeout: 3000, // 3 Seconds
            msgs: {
                success: '',
                error: '',
            },
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
        await this.fetchUserById(this.userId);
        this.formDisabled = false;
    },
    beforeDestroy() {
        clearTimeout(this.redirectTimeout);
    },
    methods: {
        ...mapActions({
            fetchUserById: 'users/fetchUserById',
            editUserById: 'users/editUserById',
            deleteUserById: 'users/deleteUserById',
        }),
        async submitUser(form) {
            this.clearMessages();
            this.formDisabled = true;

            try {
                // Vuex can only accept one parameter so always deconstruct
                await this.editUserById({
                    userId: this.userId,
                    username: form.username,
                    email: form.email,
                    city: form.city,
                    state: form.state,
                });

                this.setSuccessMessage('Transaction successful!');
                this.redirect({ path: `/users/${this.userId}` });
            } catch (e) {
                this.formDisabled = false;
                this.setErrorMessage(e);
            }
        },
        async deleteUser() {
            this.clearMessages();
            this.formDisabled = true;

            try {
                await this.deleteUserById(this.userId);
                this.setSuccessMessage('Delete successful!');
                this.redirect({ path: '/users' });
            } catch (e) {
                this.formDisabled = false;
                this.setErrorMessage(e);
            }
        },
        clearMessages() {
            this.formDisabled = false;
            this.msgs.success = '';
            this.msgs.error = '';
        },
        setErrorMessage(e) {
            this.msgs.error = e.message || 'Unknown server error';
        },
        setSuccessMessage(msg) {
            this.msgs.success = msg;
        },
        redirect({ path }) {
            this.delayedRedirect = setTimeout(() => {
                this.$router.push({ path });
            }, this.redirectTimeout);
        },
    },

};
</script>
