<template>
    <div class="nuxt-error">
        {{ error.statusCode }}
        {{ error.message }}
    </div>
</template>
<script>

export default {
    name: 'ErrorLayout',
    layout: 'default',
    props: {
        error: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
};
</script>
