<template>
    <div>
        <v-alert class="m-0"
            :value="AlertCookies" type="warning" transition="scale-transition"
        >
            <span class="d-inline-block text-black-50">
                Používáme cookie, abychom mohli upravit naše stránky tak, aby vám co nejvíce vyhovovaly. Pokud budete naše stránky nadále používat bez toho, že byste si změnili nastavení, budeme to považovat za váš souhlas s používáním cookies na stránkách Unicash.
                <b-link class="yellow-link" to="/privacy-policy/">Více</b-link>
            </span>
            <p class="mini mt-sm-3 mt-5 text-sm-right text-center">
                <b-link class="yellow-link" @click="AcceptedCookies()">Souhlasím</b-link>
            </p>
        </v-alert>
        <b-navbar toggleable="md">
            <b-link :to="'/'" class="navbar-brand nav-logo-img">
                    <!--<img src="/static/img/logo.png" class="nav-logo-img" alt="MPB Logo" />-->
            </b-link>

            <b-collapse is-nav id="nav_collapse">
                <menu-component />

                <b-navbar-nav class="ml-xl-5 ml-lg-0" v-if="!isLogin">
                    <b-nav-item v-b-modal.modal-register >Registrace</b-nav-item>
                    <b-nav-item class="login-link" v-b-modal.modal-auth>Přihlášení</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-xl-5 ml-lg-0 user-info" v-if="isLogin">
                    <b-nav-item-dropdown :text="!profile.name && !profile.family && profile.email || (profile.name?profile.name:'') + (profile.family ? ' ' + profile.family:'')" extra-toggle-classes="nav-link-custom" right>
                        
<!--                        <b-dropdown-item to="/dashboard/" v-if="$router.options.can({role:['admin','operator']})">Dashboard</b-dropdown-item>-->
                        <b-dropdown-item to="/profile/">Nastavení</b-dropdown-item>
                        <b-dropdown-item to="/transactions/">Historie transakcí</b-dropdown-item>
                        <b-dropdown-item to="/invite/">Pozvi přítele</b-dropdown-item>
                        <b-dropdown-item @click="UserLogOut()" class="mt-3 yellow-text">Odhlásit se</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item class="profile-avatar" v-if="profile.avatar_link">
                        <img :src="profile.avatar_link+'/50'" class="avatar" alt="" />
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>

            <b-navbar-toggle target="nav_collapse" class="mob-nav-button" ></b-navbar-toggle>
        </b-navbar>
        <div class="modal-forms" v-if="!isLogin">
            <register-modal-component/>
            <auth-modal-component />
            <forgot-modal-component />
            <reset-continue-modal-component />
            <reset-fail-modal-component />
        </div>
        
        <verify-modal-component />
        <activation-success-modal-component />
        <activation-fail-modal-component />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    
    import MenuComponent from '@/components/Layouts/Menu.vue';
    import RegisterModalComponent from '@/components/Layouts/Modal/Register.vue';
    import AuthModalComponent from '@/components/Layouts/Modal/Auth.vue';
    import ForgotModalComponent from '@/components/Layouts/Modal/Forgot.vue';
    
    import VerifyModalComponent from '@/components/Layouts/Modal/Verify.vue';
    import ResetContinueModalComponent from '@/components/Layouts/Modal/Reset/Continue.vue';
    import ResetFailModalComponent from '@/components/Layouts/Modal/Reset/Fail.vue';
    
    import ActivationSuccessModalComponent from '@/components/Layouts/Modal/Activation/Success.vue';
    import ActivationFailModalComponent from '@/components/Layouts/Modal/Activation/Fail.vue';
    
    export default {
        data: () => ({
            drawer: false,
            AlertCookies: false,
        }),
        components: {
            MenuComponent,
            RegisterModalComponent,
            AuthModalComponent,
            ForgotModalComponent,
            VerifyModalComponent,
            ResetContinueModalComponent,
            ResetFailModalComponent,
            ActivationSuccessModalComponent,
            ActivationFailModalComponent
        },
        computed: {
            ...mapGetters('User', [
                'isLogin', 'profile', 'pending'
            ])
        },
        methods: {
            ...mapActions({
                getProfile: 'User/getProfile',
                logout: 'User/logout',
            }),
            getUserProfile() {
                if(this.isLogin){
                    this.getProfile({include: 'roles'});
                }
            },
            UserLogOut() {
                this.logout().then(()=>{
                    this.$router.push({
                        path: '/#modal-auth'
                    });
                });
            },
            
            setAcceptCookies() {
                this.AlertCookies = null == localStorage.getItem('AcceptCookies');
            },
            AcceptedCookies() {
                localStorage.setItem('AcceptCookies', true);
                this.setAcceptCookies();
            },
        },
        mounted: function () {
            this.getUserProfile();
            this.setAcceptCookies();
//            localStorage.removeItem('AcceptCookies')
        }
    }
</script>