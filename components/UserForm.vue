<template>
    <b-form
        @submit.stop.prevent="$emit('on-submit', form)">
        <b-card
            footer-tag="footer">
            <b-card-text>
                <b-form-group
                    id="input-group-1"
                    label="Username:"
                    label-for="username">
                    <b-form-input
                        id="username"
                        v-model="form.username"
                        type="text"
                        :disabled="formDisabled"
                        placeholder="Enter username(not email)"
                        required />
                </b-form-group>
                <b-form-group
                    id="input-group-2"
                    label="Email:"
                    label-for="email">
                    <b-form-input
                        id="email"
                        v-model="form.email"
                        :disabled="formDisabled"
                        type="email"
                        placeholder="Enter email"
                        required />
                </b-form-group>
                <b-form-group
                    id="input-group-3"
                    label="City:"
                    label-for="city">
                    <b-form-input
                        id="password"
                        v-model="form.city"
                        :disabled="formDisabled"
                        type="text"
                        placeholder="Enter city" />
                </b-form-group>
                <b-form-group
                    id="input-group-4"
                    label="State:"
                    label-for="state">
                    <b-form-input
                        id="state"
                        v-model="form.state"
                        :disabled="formDisabled"
                        type="text"
                        placeholder="Enter state" />
                </b-form-group>
                <div class="d-inline-block invalid-feedback w-auto">
                    {{ msgs.error }}
                </div>
                <div class="d-inline-block valid-feedback w-auto">
                    {{ msgs.success }}
                </div>
            </b-card-text>
            <template #footer>
                <b-row>
                    <b-col>
                        <slot
                            name="leftButtons" />
                    </b-col>
                    <b-col>
                        <b-button
                            class="float-right"
                            type="submit"
                            :disabled="formDisabled"
                            variant="primary">
                            Submit
                        </b-button>
                        <slot name="rightButtons" />
                    </b-col>
                </b-row>
            </template>
        </b-card>
    </b-form>
</template>
<script>
export default {
    name: 'UserForm',
    props: {
        user: {
            type: Object,
            required: false,
            default: () => {},
        },
        formDisabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        msgs: {
            type: Object,
            required: false,
            default: () => ({
                error: '',
                success: '',
            }),
        },
    },
    data() {
        return {
            form: {
                username: this.user?.username || '',
                email: this.user?.email || '',
                city: this.user?.city || '',
                state: this.user?.state || '',
            },
        };
    },
};
</script>
