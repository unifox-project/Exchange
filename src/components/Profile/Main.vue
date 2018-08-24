<template>
    <v-container>
        <div class="row text-xs-center text-md-left" v-if="isLogin">
            <div class="col-md-3">
                <img :src="profile.avatar_link+'/300'" class="img-fluid avatar" alt="" />
            </div>
            <div class="col-md-7 offset-md-1">
                <div class="row">
                    <div class="col-md-12" v-if="profile.name">
                        <p class="mini">Jméno a příjmení</p>
                        <p class="font-weight-bold mb-3">{{profile.name}} {{profile.family}}</p>
                    </div>
                </div>
                <div class="row">    
                    <div class="col-md-12" v-if="profile.email">
                        <p class="mini">Email</p>
                        <p class="font-weight-bold mb-3">{{profile.email}}</p>
                    </div>
                    <div class="col-md-12" v-if="profile.phone">
                        <p class="mini">Tel. cislo</p>
                        <p class="font-weight-bold mb-3">{{profile.phone}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12" v-if="profile.address">
                        <p class="mini">Adresa</p>
                        <p class="font-weight-bold mb-3">{{profile.address}}</p>
                    </div>
                    <div class="col-md-6" v-if="profile.city">
                        <p class="mini">Město</p>
                        <p class="font-weight-bold mb-3">{{profile.city}}</p>
                    </div>
                    <div class="col-md-6" v-if="profile.country">
                        <p class="mini">Stát</p>
                        <p class="font-weight-bold mb-3">{{profile.country}}</p>
                    </div>
                </div>
                
                <p class="mini my-5">
                    <b-link class="font-weight-bold  line-link" to="/profile/edit/">
                        Změnit
                    </b-link>
                    osobní údaje
                </p>
            </div>
        </div>

        
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                
            }
        },
        computed: {
            ...mapGetters('User', [
                'pending', 'profile', 'isLogin'
            ])
        },
        methods: {
            ...mapActions('User', [
                'getProfile'
            ])
        }
    }
</script>