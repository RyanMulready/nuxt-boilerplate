export default {
    data() {
        return {
            formDisabled: true,
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
