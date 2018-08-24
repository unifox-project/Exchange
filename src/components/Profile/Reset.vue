<template>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    
    export default {
        data: () => ({}),
        computed: {
            ...mapGetters('User', [
                'profile'
            ])
        },
        mounted() {
            this.CheckPermissionReset();
        },
        methods: {
            ...mapActions('User', [
                'checkResetPassword'
            ]),
            CheckPermissionReset() {
                this.checkResetPassword(this.$route.params.hash).then(response => {
                    sessionStorage.setItem('resetHash', this.$route.params.hash);
                    this.$router.push({path: '/#reset-continue'});
                }).catch(errors => {
                    sessionStorage.setItem('resetFail', errors.message);
                    this.$router.push({path: '/#reset-fail'});
                });
            },
        },
    }
</script>