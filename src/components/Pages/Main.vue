<template>
    <div id="app" data-app="true">
        <header-component />

        <v-container my-container-main-first>
            <div class="row">
                <div class="col-lg-7">
                    <h2>
                        Nakupujte a prodávejte 
                        Bitcoiny snadno a bezpečně.
                    </h2>
                    <p>
                        Nakupujte za
                        <b-link class="yellow-link" v-on:click="$root.$emit('setExchange', { id: 5, currency: 'btc'}, { id: 1, currency: 'czk'}, true);" v-scroll-to="'#start-exchange'">{{buy | currency('', ' ', 2 , '.', 'front', false)}} Kč</b-link>
                    </p>
                    <p>
                        a prodávejte za
                        <b-link class="yellow-link" v-on:click="$root.$emit('setExchange', { id: 1, currency: 'czk'}, { id: 5, currency: 'btc'}, true);" v-scroll-to="'#start-exchange'">{{sale | currency('', ' ', 2 , '.', 'front', false)}} Kč</b-link>
                    </p>
                </div>
            </div>
        </v-container>
        
        <exchange-component />
        <slider-component />
        <reviews-component />
        <analytics-component />
        <best-component />
        <footer-component />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    import HeaderComponent from '@/components/Layouts/Header.vue';
    import ExchangeComponent from '@/components/Main/exchange-container.vue';
    import SliderComponent from '@/components/Main/slider-container.vue';
    import ReviewsComponent from '@/components/Main/review-container.vue';
    import AnalyticsComponent from '@/components/Main/analytics-container.vue';
    import BestComponent from '@/components/Main/best-container.vue';
    import FooterComponent from '@/components/Layouts/Footer.vue';

    export default {
        data: () => ({
            buy: 210590,
            sale: 205207,
            exchange: {
                from: [],
                to: []
            }
        }),
        components: {
            HeaderComponent,
            ExchangeComponent,
            SliderComponent,
            ReviewsComponent,
            AnalyticsComponent,
            BestComponent,
            FooterComponent,
        },
        computed: {
            ...mapGetters({
                summary: 'Exchange/summary',
                limit: 'Exchange/limit',
//                getToList: 'Exchange/getToList',
//                getFromList: 'Exchange/getFromList',
            })
        },
        methods: {
            ...mapActions({
                getLimits: 'Exchange/getLimits',
            }),
            checkHashOpenForm(){
                this.checkHash(this.$router.currentRoute.hash);
                window.addEventListener("hashchange", this.checkHash(this.$router.currentRoute.hash), false);
            },
            checkHash(hash){
                if('#modal-auth' === hash){
                    this.$root.$emit('bv::show::modal','modal-auth');
                }else if('#reset-continue' === hash){
                    if(!sessionStorage.getItem('resetHash')){
                        sessionStorage.setItem('resetFail', 'Reset session is not found');
                        this.$root.$emit('bv::show::modal','modal-reset-fail');
                    }else this.$root.$emit('bv::show::modal','modal-reset-continue');
                    this.$router.push({path: '/'});
                }else if('#reset-fail' === hash){
                    this.$root.$emit('bv::show::modal','modal-reset-fail');
                    this.$router.push({path: '/'});
                }else if('#activation-success' === hash){
                    this.$root.$emit('bv::show::modal','modal-activation-success');
                    this.$router.push({path: '/'});
                }else if('#activation-fail' === hash){
                    this.$root.$emit('bv::show::modal','modal-activation-fail');
                    this.$router.push({path: '/'});
                }
            },
            CalculateCources(){
                /*this.exchange.to = {id: 5, currency: 'btc'};
                this.exchange.from = {id: 1, currency: 'czk'};
                
                
                this.exchange.to = this.getToList.find(this.FindTo);
                this.exchange.from = this.getFromList.find(this.FindFrom);
                
                console.log(this.exchange.to, this.exchange.from);
                console.log(this.exchange.to.course, this.exchange.to.currency, this.exchange.to.commission);*/
                
                
                
//                this.exchange.fee = amount * this.exchange.to.commission / 100;
//                this.exchange.discount = this.profile && this.profile.discount?(this.exchange.fee * this.profile.discount / 100):0;
                
                this.buy = this.summary.cources.btcczk * 1.01;
                this.sale = this.summary.cources.btcczk * 0.99;
            },
            FindFrom(element) {return element.id === this.exchange.from.id && element.currency === this.exchange.from.currency;},
            FindTo(element) {return element.id === this.exchange.to.id && element.currency === this.exchange.to.currency;},
        },
        mounted: function () {
            this.checkHashOpenForm();
            this.CalculateCources();
            if(!this.limit) this.getLimits({currency:'czk'});
            setTimeout(()=>{
                this.CalculateCources();
            },1500);
        }
    }

</script>