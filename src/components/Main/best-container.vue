<template>
    <v-container best-container text-center>
        <h2 class="my-5">Výhody</h2>
            <div class="row">
                <div class="col-md-4">
                    <img src="../../../static/img/icons/proccess.png" class="img-fluid mb-3" alt="">
                    <p class="mini font-weight-bold">Jednoduchá směna</p>
                    <p class="mini mb-3">
                        Směna v rychlých a jednoduchých krocích, díky kterým se nákup Vaší kryptoměny stává pouhou hračkou : ).
                    </p>
                </div>
                <div class="col-md-4">
                    <img src="../../../static/img/icons/security.png" class="img-fluid mb-3" alt="">
                    <p class="mini font-weight-bold">Bezpečnost</p>
                    <p class="mini mb-3">
                        Spolehlivá platforma, která díky Anti DDoS ochraně, SSL certifikátu a dalším ochranným prostředkům zajistí maximální bezpečnost.
                    </p>
                </div>
                <div class="col-md-4">
                    <img src="../../../static/img/icons/support.png" class="img-fluid mb-3" alt="">
                    <p class="mini font-weight-bold">Zákaznická podpora</p>
                    <p class="mini mb-3">
                        Nevíte si s něčím rady? Naše zákaznická podpora Vám zodpoví veškeré dotazy a vyřeší veškeré potíže, které Vás zastihnou.
                    </p>
                </div>
            </div>
    </v-container>
</template>
<script>
    export default {
        data: () => ({
            drawer: false
        })
    }
</script>