<template>
    <div id="app" class="second-page" data-app="true">
        <header-component />
        <v-container>
            <h1 class="mb-5 mt-5">{{ this.$router.currentRoute.meta.title }}</h1>
        </v-container>
        
        <v-container class="fees-container text-center">
            <div class="row mb-4 justify-content-between">
                <div class="col-md-4 col-5">
                    <p class="disabled font-weight-bold">
                        Pošlete
                    </p>
                </div>
                <div class="col-md-4 col-5">
                    <p class="disabled font-weight-bold">
                        Dostane
                    </p>
                </div>
            </div>
            <div class="mb-5 clearfix" v-for="commission in commissions.data">
                <div class="row mb-3" v-for="item in commission.items" v-if="item.value">
                    <div class="col-md-4 col-5">
                        <p class="fee-item font-weight-bold text-uppercase">
                            {{commission.name}}
                        </p>
                    </div>
                    <div class="col-md-4 col-2">
                        <img class="mt-1" src="/static/img/icons/double-arrows.png"/>
                        <p class="font-weight-bold">
                            {{CalculateFee(item.value)}}%
                        </p>
                    </div>
                    <div class="col-md-4 col-5">
                        <p class="fee-item font-weight-bold text-uppercase">
                            {{item.name}}
                        </p>
                    </div>
                </div>
            </div>
            
<!--            <div class="row mb-3">
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        Kč
                    </p>
                </div>
                <div class="col-md-4 col-2">
                    <img class="mt-1" src="/static/img/icons/double-arrows.png"/>
                    <p class="font-weight-bold">
                        {{CalculateFee(3)}}%
                    </p>
                </div>
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        BTC
                    </p>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        Kč
                    </p>
                </div>
                <div class="col-md-4 col-2">
                    <img class="mt-1" src="/static/img/icons/double-arrows.png"/>
                    <p class="font-weight-bold">
                        {{CalculateFee(3)}}%
                    </p>
                </div>
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        ETH
                    </p>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        BTC
                    </p>
                </div>
                <div class="col-md-4 col-2">
                    <img class="mt-1" src="/static/img/icons/double-arrows.png"/>
                    <p class="font-weight-bold">
                        {{CalculateFee(1.5)}}%
                    </p>
                </div>
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        Kč
                    </p>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        ETH
                    </p>
                </div>
                <div class="col-md-4 col-2">
                    <img class="mt-1" src="/static/img/icons/double-arrows.png"/>
                    <p class="font-weight-bold">
                        {{CalculateFee(1.5)}}%
                    </p>
                </div>
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        Kč
                    </p>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        BTC
                    </p>
                </div>
                <div class="col-md-4 col-2">
                    <img class="mt-1" src="/static/img/icons/double-arrows.png"/>
                    <p class="font-weight-bold">
                        {{CalculateFee(3)}}%
                    </p>
                </div>
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        ETH
                    </p>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        ETH
                    </p>
                </div>
                <div class="col-md-4 col-2">
                    <img class="mt-1" src="/static/img/icons/double-arrows.png"/>
                    <p class="font-weight-bold">
                        {{CalculateFee(1.5)}}%
                    </p>
                </div>
                <div class="col-md-4 col-5">
                    <p class="fee-item font-weight-bold text-uppercase">
                        BTC
                    </p>
                </div>
            </div>-->
                
        </v-container>
        
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
        computed: {
            ...mapGetters({
                isLogin: 'User/isLogin',
                profile: 'User/profile',
                commissions: 'Commission/commissions',
            })
        },
        methods: {
            ...mapActions({
//                getProfile: 'User/getProfile',
                pairList: 'Commission/pairList',
            }),
            
            CalculateFee(amount){
                if(!amount) amount = 0;
                
                let discount = this.isLogin && this.profile && this.profile.discount ? (amount * this.profile.discount / 100):0;
                
                return parseFloat((amount-discount).toFixed(2));
            }
        },
        mounted() {
            this.pairList();
//            if(this.isLogin) this.getProfile({include: 'roles'});
        }
    }
</script>