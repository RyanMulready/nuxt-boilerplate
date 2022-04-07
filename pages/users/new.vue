<template>
    <div>
        <h1>
            New User
        </h1>
        <UserForm
            :msgs="msgs"
            :form-disabled="formDisabled"
            @on-submit="submitUser">
            <template #leftButtons>
                <b-button
                    to="/users">
                    Back
                </b-button>
            </template>
        </UserForm>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    name: 'UserNew',
    data() {
        return {
            formDisabled: false,
            delayedRedirect: null,
            redirectTimeout: 3000, // 3 Seconds
            msgs: {
                success: '',
                error: '',
            },
        };
    },
    beforeDestroy() {
        clearTimeout(this.redirectTimeout);
    },
    methods: {
        ...mapActions({
            createUser: 'users/createUser',
        }),
        async submitUser(form) {
            this.clearMessages();
            this.formDisabled = true;

            try {
                // Vuex can only accept one parameter so always deconstruct
                const response = await this.createUser({
                    username: form.username,
                    email: form.email,
                    city: form.city,
                    state: form.state,
                });

                // Triggers catch statement below
                if (!response.userId) {
                    throw Error('No userId in response!');
                }

                this.setSuccessMessage('Transaction successful!');
                this.redirect({ path: `/users/${response.userId}` });
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
