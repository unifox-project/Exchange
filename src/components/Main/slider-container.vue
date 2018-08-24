<template>
    <v-container my-slider>
        <h2 class="my-slider-header mb-5" >Jak to funguje?</h2>

        <div id="tinyslider">
            <div class="my-slider-item" v-for="(slider,index) in sliders">
                <div class="row">
                    <div class="col-sm-5 order-1"><img :src="slider.img" class="my-slider-mainimg img-fluid"/></div>
                    <div class="col-sm-7 order-0 order-md-2 my-slider-number-container">
                        <div :class="'my-slider-number number-'+(index+1)"></div>
                        <div class="my-slider-text">
                            <h3>{{slider.title}}</h3>
                            <p v-html="slider.text" class="mini"></p>
                            
                            <v-runtime-template :template="slider.footer"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="slider-navi my-slider-nav tns-nav my-5"><div v-for="slider in sliders"></div></div>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { tns } from "tiny-slider/src/tiny-slider";
    import VRuntimeTemplate from "v-runtime-template";
    
    export default {
        data: () => ({
            drawer: false,
            slider: null,
            sliders:[
                {
                    img: "/static/img/slider/slider-3.png",
                    title: "Registrace emailem",
                    text: "Emailová adresa je určena k zaslání potvrzení o přijetí objednávky a potvrzení o odeslání zásilky a pro případnou vzájemnou komunikaci.",
                    footer: "<p><b-link class=\"yellow-link\" v-b-modal.modal-register v-if=\"!profile\">Registrovat se</b-link></p>",
                },
                {
                    img: "/static/img/slider/slider-1.png",
                    title: "Založení peneženky",
                    text: "Částečná identifikace je základní úrovní účtu mojeID  a spočívá v ověření správnosti e-mailové adresy a čísla mobilního telefonu, které uživatel vyplňuje do registračního formuláře.",
                    footer: "<p>Založit <b-link href=\"https://www.blockchain.com/wallet\" class=\"yellow-link\" target=\"_blank\">peněženku</b-link></p>",
                },
                {
                    img: "/static/img/slider/slider-2.png",
                    title: "Jednoduchá směna",
                    text: "Vytvořite objednávku směny bitcoinů. Snažíme se směnu udělat tak jednoduchou, jak je to jen možné. Vyžádáme si od Vás pouze minimum informací, které potřebujeme nebo musíme dle českých a evropských zákonů.",
                    footer: "<p>Začít <b-link class=\"yellow-link\" href=\"#start-exchange\" v-on:click=\"$root.$emit('setExchange', { id: 5, currency: 'btc'}, { id: 1, currency: 'czk'}, true);\" v-scroll-to=\"'#start-exchange'\">směnu</b-link></p>",
                },
            ]
        }),
        components: {
            VRuntimeTemplate
        },
        computed: {
            ...mapGetters('User', [
                'pending', 'profile'
            ])
        },
        mounted: () => {
            this.slider = tns({
                container: '#tinyslider',
                items: 1,
                gutter: 20,
                autoplay: true,
                nav: true,
                controls: false,
                navContainer: '.slider-navi'
            });
        }
    }
</script>