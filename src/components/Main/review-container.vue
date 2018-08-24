<template>
    <v-container review-container >
        <h4 class="my-5 text-center font-weight-normal">
            Směnili jsme bitcoiny v hodnotě
            <br>
            <span class="yellow-header" >{{exchangeSummary | currency}} Kč</span>
        </h4>
        
        <div class="review-slider">
<!--            <div class="review-controli d-none d-md-block">
                <a class="review-controli-prev"><img :src="getAvatarImg(reviews[0].img)" class="rounded-circle" :alt="reviews[0].name"/></a>
                <a class="review-controli-next"><img :src="getAvatarImg(reviews[2].img)" class="rounded-circle" :alt="reviews[2].name"/></a>
            </div>-->
            <div id="tinyslider2">
                <div class="review-slider-item" v-for="review in reviews">
                    <div class="review-slider-content">
                        <!--<img :src="getAvatarImg(review)" class="review-avatar rounded-circle"/>-->
                        <div class="review-slider-text">
                            <p class="mini">{{review.comment}}</p>
                            <p class="mini font-weight-bold">{{review.name}}, {{review.old}} let</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="review-navi my-slider-nav tns-nav my-4"><div v-for="review in reviews"></div></div>
        </div>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { tns } from "tiny-slider/src/tiny-slider";
    export default {
        data: () => ({
            exchangeSummary: 0,
            reviews_slider: null,
            reviews: [
                {
                    img: "",
                    name: "David",
                    old: 21,
                    gender: "m",
                    comment: "Za mě asi zatím nejlepší zkušenost ze všech českých směnáren, kde jsem směňoval kryptoměny. Velmi pěkná a hlavně jednoduchá na ovládání.",
                },
                {
                    img: "",
                    name: "Jana",
                    old: 26,
                    gender: "f",
                    comment: "Při potížích při směně mi vaše zákaznická podpora v chatu pomohla vyřešit problém během chvilky. U ostatních směnáren jsem musela čekat až několik dnů, než mi někdo odpověděl na email.",
                },
                {
                    img: "",
                    name: "Dominik",
                    old: 22,
                    gender: "m",
                    comment: "Na vašem portálu jsem začal směňovat pravidelně, a to nejen díky jednoduchosti, ale i vašemu slevovému programu. Těším se na další výhody.",
                },
                {
                    img: "",
                    name: "Kryštof",
                    old: 32,
                    gender: "m",
                    comment: "Dlouho jsem si říkal, kdy se objeví na českým trhu směnárna, která bude mít opravdu pěkný design webových stránek a bude jednoduchá na ovládání. Ostatní jsou buď škaredé nebo nepřehledné. A u žádné jsem neviděl ani LIVE CHAT.",
                }
            ]
        }),
        
        
        computed: {
            ...mapGetters({
                summary: 'Exchange/summary',
            })
        },
        methods: {
            ...mapActions({
                getSummary: 'Exchange/getSummary',
            }),
            getAvatarImg(review){
                return review.img || (review.gender=='f' ? '/static/img/avatar/no-female.jpg' : '/static/img/avatar/no-male.jpg')
            }
        },
        mounted: function () {
            this.reviews_slider = tns({
                container: '#tinyslider2',
                items: 1,
                startIndex:1,
                gutter: 20,
                autoplay: true,
                nav: true,
                controls: false,
                controlsContainer: '.review-controli',
                navContainer: '.review-navi'
            });
            /*.events.on('indexChanged', (info)=> {
                var indexPrev = 0 == info.index? info.slideItems.length-1 : info.index-1,
                    indexNext = info.slideItems.length-1 > info.index? info.index+1:0;
                
                info.controlsContainer.getElementsByClassName('review-controli-prev')[0].getElementsByTagName('img')[0].src = info.slideItems[indexPrev].getElementsByTagName('img')[0].src;
                info.controlsContainer.getElementsByClassName('review-controli-next')[0].getElementsByTagName('img')[0].src = info.slideItems[indexNext].getElementsByTagName('img')[0].src;
            });*/
            
            this.getSummary({from: 'btc', to: 'czk'}).then(() => {
                this.exchangeSummary = this.summary.summ;
            });
        }
    }
    
</script>