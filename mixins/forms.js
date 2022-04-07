/*  https://v2.vuejs.org/v2/guide/mixins.html?redirect=true
*   Mixins contain reusable definitions across components
*   Any methods or computed properties should only reference things defined
*   inside the mixin itself
*/
export default {
    data() {
        return {
            formDisabled: true,
            redirectTimeout: null,
            redirectWait: 3000, // 3 Seconds
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
        // TODO: This should likely be in a global mixin instead
        delayedRedirect({ path }) {
            this.redirectTimeout = setTimeout(() => {
                this.$router.push({ path });
            }, this.redirectWait);
        },
    },
};
