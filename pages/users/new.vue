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
import forms from '@/mixins/forms';

export default {
    name: 'UserNew',
    // Mixin includes common form data and method definitions
    mixins: [forms],
    data() {
        return {
            // Overrides default mixin value
            formDisabled: false,
        };
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
    },

};
</script>
