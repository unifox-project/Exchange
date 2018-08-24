<template>
    <v-container text-center>
        <div class="best-container">
            <h2 class="mb-5">
                Chci
                <b-link class="yellow-link" v-if="isExchange()" v-scroll-to="'#start-exchange'">směnit</b-link> 
                <b-link class="yellow-link" href="/#start-exchange" v-else>směnit</b-link> 
                kryptoměnu
            </h2>
        </div>
        <div class="footer-container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2">
                    <div class="row">
                        <div class="col-md-6">
                            <p class="mini">
                                <a class="text-white" href="tel:+420777423423">
                                    +420 777 423 423
                                </a>
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p class="mini">
                                <a class="text-white" href="mailto:info@mujprvnibitcoin.cz">
                                    info@mujprvnibitcoin.cz
                                </a>
                            </p>
                        </div>
                    </div>


                    <div class="border-bottom border-white my-4"></div>

                    <ul class="list-unstyled list-inline mb-5">
                        <li class="list-inline-item">
                            <b-link class="text-white" to="/faq/">FAQ – časté dotazy</b-link>
                        </li>
<!--                        <li class="list-inline-item">
                            <b-link class="text-white" to="/fees/">Poplatky</b-link>
                        </li>-->
                        <li class="list-inline-item">
                            <b-link class="text-white" to="/discounts/">Slevy</b-link>
                        </li>
                        <li class="list-inline-item">
                            <b-link class="text-white" to="/invite/" v-b-modal.modal-auth v-if="!isLogin">Affiliate</b-link>
                            <b-link class="text-white" to="/invite/" v-else>Affiliate</b-link>
                        </li>
                        <li class="list-inline-item">
                            <b-link class="text-white" to="/partners/">Staňte se partnerem</b-link>
                        </li>
                        <li class="list-inline-item">
                            <b-link class="text-white" to="/terms-and-condidtion/">Obchodní podmínky</b-link>
                        </li>
                    </ul>
                    <p class="mini text-white mb-3" style="font-size:inherit;">Všechna práva vyhrazena &copy; {{ CopyRightYear(2018) }} MUJPB s.r.o. <span class="d-inline-block">Design by <span class="text-uppercase">BECHYNSKY</span></span></p>
                </div>
            </div>

        </div>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        data: () => ({
            
        }),
        computed: {
            ...mapGetters('User', ['isLogin'])
        },
        methods: {
            CopyRightYear(y) {
                var year = new Date().getFullYear();
         	return y < year ? y + '-' + year : year;
            },
            isExchange() {
                return '/' === this.$route.path;
            }
        },
    }
</script>