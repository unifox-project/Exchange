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
            this.setJoinHex();
        },
        methods: {
            setJoinHex() {
                let id = parseInt(this.$route.params.hex, 16) - 123456789; //Преобразование шестнадцатеричной строки в число
                if(id && id > 0 && !this.profile) localStorage.setItem('refer', id);
                
                this.$router.push({path: '/'});
            },
        },
    }
</script>