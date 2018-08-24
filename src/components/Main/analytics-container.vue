<template>
    <v-container analytics-container>
        <div class="row">
            <div class="col-md-7 order-1">
                <rate-highcharts :options="options" ref="lineCharts" class="mt-md-0" />
                <!--<img src="../../../static/img/graph.jpg" class="img-fluid mb-5 mb-md-none" alt="">-->
            </div>
            <div class="col-md-5 order-0 order-md-2">
                <h2 class="mb-4">Vývoj <br/>na trhu</h2>
                <p class="mini mb-3">
                    Bitcoin nemá "jednotnou cenu". Cena na burzách, ve směnárnách i cena CFD se mírně nebo více liší v závislosti na volatilitě.
                </p>
<!--                <p class="mb-md-5">
                    <b-link class="yellow-link" v-on:click="$root.$emit('setExchange', { id: 5, currency: 'btc'}, { id: 1, currency: 'czk'}, true);" v-scroll-to="'#start-exchange'">Buy Bitcoin again</b-link>
                    
                    Dozvědet se <a href="#" class="yellow-link" >více</a> o kurzu
                </p>-->
            </div>
        </div>
    </v-container>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import RateHighcharts from 'vue2-highcharts';
    
    export default {
        data: () => ({
            options: {
                chart: {
                    type: 'spline',
                    height:'300px',
                },
                title: {
                    align: 'left',
                    text: 'BTC na Kc',
                    style: { color: "#CCCCCC", fontWeight: 'bold',fontSize: '14px',fontFamily: 'Work Sans'}
                },
                plotOptions: {
                    spline:{
                        color: "#942C8A",
                        lineWidth:8
                    }
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    crosshairs: [true,true],
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    gridLineColor: '#d6d6d6',
                    gridLineDashStyle: 'Solid',
                    gridLineWidth:1,
                    title:{
                        enabled: false
                    },
                    labels:{
                        style:{
                            color: '#CCC',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            fontFamily: 'Work Sans'
                        },
                        format: '{value:%d.%m<br>%Y}',
                    },
//                    maxPadding:0.3,
                    type: 'datetime',
//                    dateTimeLabelFormats: {
//                        day: '%d.%m<br/>%Y',
//                        week: '%d.%m<br/>%Y'
//                    },
                },
                yAxis: {
                    allowDecimals:false,
                    gridLineColor: '#efefef',
                    gridLineDashStyle: 'LongDash',
                    title:{
                        enabled: false
                    },
                    labels:{
                        style:{
                            color: '#CCC',
                        }
                    },
                },
                series: []
            }
        }),
        components: {
            RateHighcharts
        },
        computed: {
            ...mapGetters('Rates', [
                'periodStatisticsItems', 'periodStatisticsPending'
            ])
        },
        watch: {
            period: function (value) {
                this.refreshRate(value)
            }
        },
        methods: {
            ...mapActions('Rates', [
                'periodStatistics'
            ]),
            refreshRate(period) {
                this.$refs.lineCharts.removeSeries();

                let lineCharts = this.$refs.lineCharts;
                lineCharts.delegateMethod('showLoading', 'Loading...');
                
//                lineCharts.addSeries({
//                    data:[177000, 217000, 224000, 205000, 222000, 205000, 216000],
//                    name: 'Rate',
//                    pointStart: Date.UTC(2018, 1, 12),
//                    pointInterval: 24 * 3600 * 1000 * 7 // one week
//                });
//                lineCharts.hideLoading();

                this.periodStatistics(period).then(() => {
                    //lineCharts.getChart().xAxis[0].setCategories(this.exchangesDynamicItems.categories);
//                    lineCharts.addSeries(this.exchangesDynamicItems.finished);
//                    lineCharts.addSeries(this.exchangesDynamicItems.not);

//                    lineCharts.getChart().xAxis[0].setCategories(this.periodStatisticsItems.date);

//                    console.log(this.periodStatisticsItems.last_date,this.periodStatisticsItems.first_date);
                    lineCharts.addSeries({
                        data:this.periodStatisticsItems.data,
                        name: 'Rate',
                        pointStart: this.parseISOLocal(this.periodStatisticsItems.first_date),
                        pointInterval: 24 * 3600 * 1000// one day
                    });

                    lineCharts.hideLoading();
                }).catch(errors => {
                    lineCharts.hideLoading();
                });
            },
            parseISOLocal(s) {
                var b = s.split(/\D/);
                return Date.UTC(b[0], b[1]-1, b[2], b[3], b[4], b[5]);
            }
        },
        mounted() {
            this.refreshRate(this.period);
        }
    }
</script>
<style>
    .vue-highcharts {
        border: none;
        border-radius: 0;
        box-shadow: none;
        padding: 0;
    }
</style>