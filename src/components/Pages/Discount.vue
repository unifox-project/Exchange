<template>
    <div id="app" class="second-page" data-app="true">
        <header-component />
        <v-container>
            <h1 class="mb-5 mt-5">{{ this.$router.currentRoute.meta.title }}</h1>
        </v-container>
        
        <v-container class="discount-container">
            <div class="row justify-content-between mb-4 text-md-left text-center">
                <div class="col-lg-3 col-md-4">
                    <p class="discount-item">
                        Sleva <span class="font-weight-bold">0%</span> 
                    </p>
                </div>
                <div class="col-md-4">
                    <p class="pt-md-2">
                        Limit <span class="font-weight-bold">0 Kč</span> 
                    </p>
                </div>
            </div>
            <div class="row justify-content-between mb-4 text-md-left text-center">
                <div class="col-lg-4 col-md-5">
                    <p class="discount-item">
                        Sleva <span class="font-weight-bold">5%</span> 
                    </p>
                </div>
                <div class="col-md-4">
                    <p class="pt-md-2">
                        Limit <span class="font-weight-bold">20 000 Kč</span> 
                    </p>
                </div>
            </div>
            <div class="row justify-content-between mb-4 text-md-left text-center">
                <div class="col-lg-5 col-md-6">
                    <p class="discount-item">
                        Sleva <span class="font-weight-bold">10%</span> 
                    </p>
                </div>
                <div class="col-md-4">
                    <p class="pt-md-2">
                        Limit <span class="font-weight-bold">200 000 Kč</span> 
                    </p>
                </div>
            </div>
            <div class="row justify-content-between mb-4 text-md-left text-center">
                <div class="col-lg-6 col-md-7">
                    <p class="discount-item">
                        Sleva <span class="font-weight-bold">15%</span> 
                    </p>
                </div>
                <div class="col-md-4">
                    <p class="pt-md-2">
                        Limit <span class="font-weight-bold">2 000 000 Kč</span> 
                    </p>
                </div>
            </div>
            <div class="row justify-content-between mb-4 text-md-left text-center">
                <div class="col-md-8">
                    <p class="discount-item">
                        Sleva <span class="font-weight-bold">20%</span> 
                    </p>
                </div>
                <div class="col-md-4">
                    <p class="pt-md-2">
                        Limit <span class="font-weight-bold">20 000 000 Kč</span> 
                    </p>
                </div>
            </div>
        </v-container>
        <v-container v-if="isLogin">
            <h3 class="mb-4">Kumulovaná částka</h3>
            <div class="row">
                <div class="col-md-5">
                    <p class="font-weight-bold">
                        {{total_exchange | currency}} Kč
                    </p>
                </div>
                <div class="col-md-7">
                    <p v-if="show_todiscount">
                        Do nabytí slevy <span class="font-weight-bold">{{discount | currency}}%</span> stačí směnit <span class="font-weight-bold">{{todiscount | currency}} Kč</span> 
                    </p>
                </div>
            </div>
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
                total_exchange:0,
                discount:0,
                todiscount:0,
                show_todiscount:true,
                discounts:{
                    0:{percent: 5, amount: 20000},
                    5:{percent: 10, amount: 200000},
                    10:{percent: 15, amount: 2000000},
                    15:{percent: 20, amount: 20000000},
                }
            }
        },
        computed: {
            ...mapGetters('User', [
                'pending', 'isLogin', 'profile'
            ])
        },
        components: {
            HeaderComponent,
            FooterComponent,
        },
        methods: {
            ...mapActions('User', [
                'getProfile'
            ]),
            calcDiscounts(){
                if(this.isLogin && this.profile){
                    this.total_exchange = parseFloat(this.profile.total_exchange) || 0;
                    
                    if(this.discounts[this.profile.discount]){
                        this.discount = this.discounts[this.profile.discount].percent;
                        this.todiscount = this.discounts[this.profile.discount].amount - this.total_exchange;
                    }else {
                        this.show_todiscount = false;
                    }
                }
            },
        },
        mounted() {
            this.calcDiscounts();
            if(this.isLogin) this.getProfile({include: 'roles'}).then(()=>{
                this.calcDiscounts();
            });
        }
    }
</script>