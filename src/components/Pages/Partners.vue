<template>
    <div id="app" class="second-page" data-app="true">
        <header-component />
        <v-container>
            <h1 class="mb-5 mt-5">{{ this.$router.currentRoute.meta.title }}</h1>
        </v-container>
        
        <v-container class="partners-container">
            <div class="row mb-5">
                <div class="col-lg-10 offset-lg-1">
                    <div class="partners-nav-item">
                        <div class="row">
                            <div class="col-md-4">
                                <a href="#" v-scroll-to="'#become-a-recommendation'">Staňte se<br/>doporučitelem</a>
                            </div>
                            <div class="col-md-4">
                                <a href="#" class="d-block border-h-v-purple" v-scroll-to="'#become-a-large-customer'">Staňte se<br/>velkoodběratelem</a>
                            </div>
                            <div class="col-md-4">
                                <a href="#" v-scroll-to="'#open-exchange-office'">Otevřete si<br/>směnárnu</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
        <v-container>
            <div class="row justify-content-between mb-5 mt-md-5">
                <div class="col-md-6 col-lg-5">
                    <h3 class="mb-5" id="become-a-large-customer">Staňte se<br/>velkoodběratelem</h3>

                    <p class="mini mb-4">
                        Fungujete již jako směnárna nebo burza? Zásadním úkolem směnárny je vyřešit tok financí a Unicash Vám s tím díky široké sítě platebních služeb může pomoci.
                    </p>
                    <p class="mini mb-4">
                        Podívejte se, jak Unicash funguje a v případě zájmu o velkoobchodní ceny nás kontaktujte.
                    </p>

                    <p class="my-5">
                        <b-link class="yellow-link" href="mailto:info@mujprvnibitcoin.cz">
                            info@mujprvnibitcoin.cz
                        </b-link>
                    </p>
                </div>
                <div class="col-md-6 col-lg-6">
                    <img src="/static/img/unicash/unicash-logo.png" class="float-none mr-3 float-md-left"/>
                    <h4 class="mb-0">
                        Ozkoušeno tisíci zákazníky
                    </h4>
                    <p class="font-weight-normal mt-0" style="font-size: 15px">Verifikovaný partner bezpečné a stabilní sítě směnáren</p>
                    
                    <img src="/static/img/unicash/unicash-banner.png" class="mt-4 img-fluid" />
                </div>
            </div>
        </v-container>
        <v-container>
            <div class="row justify-content-between mt-md-5">
                <div class="col-md-6 col-lg-5">
                    <h3 class="mb-5" id="become-a-recommendation">Staňte se<br/>doporučitelem</h3>

                    <p class="mini mb-4">
                        Po registraci se Vám vygeneruje unikátní odkaz, který můžete poslat jako pozvánku do naší směnárny.
                    </p>
                    <p class="mini mb-4">
                        Náš systém rozpozná, že Váš partner přišel na stránku skrze Váš odkaz a automaticky Vám přičte provizi, kterou můžete vybrat na svojí peněženku.
                    </p>

                    <p class="mt-5">
                        <b-link class="yellow-link" v-b-modal.modal-register v-if="!isLogin">
                            Vytvořit účet
                        </b-link>
                        <b-link class="yellow-link" to="/invite/" v-else>
                            Pozvi přítele
                        </b-link>
                    </p>
                </div>
                <div class="col-md-6 col-lg-6">
                    <h3 class="mb-5" id="open-exchange-office">Otevřete si <br/>směnárnu</h3>
                    
                    <p class="mini mb-4">
                        Každá směnárna na trhu je důležitá služba pro uživatele kryptoměn, jelikož napomáhá budovat infrastrukturu a srovnávat cenovou hladinu.
                    </p>
                    <p class="mini mb-4">
                        Žádaná služba dnes znamená garanci zajímavého zisku.
                    </p>
                    <p class="mini mb-4">
                        Nabízíme možnost získat partnerskou směnárnu, která by byla naším partnerem, jelikož poptávka po naších službách často převyšuje naše kapacity.
                    </p>
                    <p class="mini mb-4">
                        Přečtěte si více o partnerské směnárně zde, a v případě zájmu nám napište.
                    </p>
                    
                    <p class="my-5">
                        <b-link class="yellow-link" href="mailto:info@mujprvnibitcoin.cz">
                            info@mujprvnibitcoin.cz
                        </b-link>
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
                
            }
        },
        computed: {
            ...mapGetters('User', [
                'isLogin','profile'
            ])
        },
        components: {
            HeaderComponent,
            FooterComponent,
        },
    }
</script>