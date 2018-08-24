<template></template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data: () => ({}),
        mounted() {
            this.Verification();
        },
        methods: {
            ...mapActions('User', [
                'VerificationEmail'
            ]),
            Verification(hash) {
                this.VerificationEmail(this.$route.params.hash).then(response => {
                    this.$router.push({path: '/#activation-success'});
                }).catch(errors => {
                    sessionStorage.setItem('activationFail', errors.errors);
                    this.$router.push({path: '/#activation-fail'});
                });
            },
        },
    }
</script>