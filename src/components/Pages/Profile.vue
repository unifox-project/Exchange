<template>
    <div id="app" class="second-page" data-app="true">
        <header-component />
        <v-container>
            <h1 class="mb-5 mt-5">{{ this.$router.currentRoute.meta.title }}</h1>
            
            <div class="row mb-5">
                <div class="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
                    <div class="row profile-nav">
                        <div class="col-md-4">
                            <router-link to="/profile/" class="profile-nav-item">
                                Osobní údaje
                            </router-link>
                        </div>
                        <div class="col-md-4">
                            <router-link to="/profile/limit/" class="profile-nav-item">
                                Aktuální limit
                            </router-link>
                        </div>
                        <div class="col-md-4">
                            <router-link to="/profile/security/" class="profile-nav-item">
                                Bezpečnost
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
        
        <router-view></router-view>
        
        <footer-component />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AppConfig from '../../config/app';
    import HttpHelper from '../../helpers/http';
    
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
        computed: {
            ...mapGetters('User', [
                'pending', 'profile'
            ])
        },

        methods: {
            ...mapActions('User', [
                'getProfile'
            ]),
        },
    }
</script>