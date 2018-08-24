<template>
    <v-container>
<!--        <div class="row">
            <div class="col-md-10 offset-md-1">-->
                <div class="transactions-container">
                    <v-data-table
                        v-bind:headers="Transactions.headers"
                        v-bind:items="Transactions.Items"
                        :pagination.sync="pagination"
                        :total-items="Transactions.totalItems"
                        :rows-per-page-items="Transactions.perPage"
                        no-data-text="Není k dispozici"
                        hide-actions
                    >
                        <template slot="items" slot-scope="props">
                            <tr @click="goToTransaction(props.item.hash)">
                                <td v-html="props.item.date"></td>
                                <td class="font-weight-bold">
                                    {{props.item.in_amount}} <span class="text-uppercase">({{props.item.in_prefix}})</span>
                                </td>
                                <td class="font-weight-bold">
                                    {{props.item.out_amount}} <span class="text-uppercase">({{props.item.out_prefix}})</span>
                                </td>
                                <td>
                                    <p class="mini disabled m-0" v-if="props.item.status==1">Čeká se, než přijdou peníze</p>
                                    <p class="mini disabled m-0" v-else-if="props.item.status==2">Částka se ověřuje</p>
                                    <p class="mini green--text m-0" v-else-if="props.item.status==3">Úspěšně proběhlo</p>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>

                    <div class="text-xs-center p-2 mt-5" v-if="Transactions.Items.length < Transactions.totalItems">
                        <v-pagination v-model="pagination.page" :length="pagesTransactions" :total-visible="7"></v-pagination>
                    </div>
                </div>
<!--            </div>
        </div>-->
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import HttpHelper from '../../helpers/http';

    export default {
        data() {
            return {
                Transactions: {
                    headers: [
                        { text: 'Datum', value: 'date', 'class':"font-weight-bold",align:'center'},
                        { text: 'Vstupní částka', value: 'in_amount', 'class':"font-weight-bold",align:'center'},
                        { text: 'Výstupní částka', value: 'out_amount', 'class':"font-weight-bold",align:'center'},
                        { text: 'Stav', value: 'status', 'class':"font-weight-bold", align:'center', ordering:false},
                    ],
                    Items: [],
                    TotalItems: null,
                    perPage: [ 10, 15, 20, {text: 'All', value: -1} ],
                },
                pagination: {
//                    sortBy: 'created_at',
//                    descending: true, 
                },
            }
        },
        watch: {
            paginationTransactions(val, oldVal) {
                if (JSON.stringify(val) !== JSON.stringify(oldVal)) this.getListTransactions();
            }
        },
        computed: {
            ...mapGetters({
                transactionsList: 'Exchange/transactionsList',
                meta: 'Exchange/meta'
            }),
            paginationTransactions() {
                return {
                    page: this.pagination.page || null,
                    limit: this.pagination.rowsPerPage || null,
                    sort: this.pagination.sortBy || null,
                    order: this.pagination.descending || null,
                };
            },
            pagesTransactions () {
                if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;

                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
            },
        },
        methods: {
            ...mapActions({
                ExchangesList: 'Exchange/getExchangesByUser',
            }),
            goToTransaction(transactionHash) {
                this.$router.push({
                    path: '/transactions/'+transactionHash+'/',
                });
            },
            getListTransactions() {
                this.ExchangesList(HttpHelper.getPaginationParam(this.pagination)).then(response => {
                    this.Transactions.Items = this.transactionsList;
                    
                    this.Transactions.totalItems = this.meta.count ? this.meta.count : 0;
                }).catch(errors => {
                    this.errors = errors;
                });
            },
        }
    }
</script>