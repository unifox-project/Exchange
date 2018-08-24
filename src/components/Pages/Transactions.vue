<template>
    <div id="app" class="second-page" data-app="true">
        <header-component />
        <v-container>
            <h1 class="mb-5 mt-5 text-md-left text-center">{{ this.$router.currentRoute.meta.title }}</h1>
        </v-container>
        
        <router-view></router-view>
        
        <footer-component />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    
    import HeaderComponent from '@/components/Layouts/Header.vue';
    import FooterComponent from '@/components/Layouts/Footer.vue';

    export default {
        data() {
            return {
                
            }
        },
        components: {
            HeaderComponent,
            FooterComponent,
        },
    }
</script>