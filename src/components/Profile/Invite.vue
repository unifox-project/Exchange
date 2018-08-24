<template>
    <div id="app" class="second-page" data-app="true">
        <header-component />
        <v-container>
            <h1 class="mb-5 mt-5">{{ this.$router.currentRoute.meta.title }}</h1>
        </v-container>
        
        <v-container>
            <div class="row justify-content-between">
                <div class="col-md-6 col-lg-5">
                    <h3>Jak to funguje?</h3>

                    <p class="mini mb-4">
                        Použijte vygenerovaný odkaz a <span class="font-weight-bold">pošlete jej přátelům</span> jako pozvánku do naší směnárny.
                    </p>
                    <p class="mini mb-4">
                        Náš systém rozpozná, že Váš partner přišel na stránku skrze Váš odkaz a automaticky Vám <span class="font-weight-bold">přičte provizi</span>, kterou můžete vybrat na svojí peněženku.
                    </p>
                    
                    <p class="mini mb-4">
                        Máte další otázky? Podívejte se do sekce
                        <b-link class="yellow-link font-weight-bold" to="/faq/">
                            FAQ
                        </b-link> nebo kontaktujte 
                        <b-link class="yellow-link font-weight-bold" to="/contacts/">
                            technickou podporu.
                        </b-link>
                    </p>

                    <h3 class="mt-5">Odkaz k doporučení</h3>

                    <div class="input-group mb-3">
                        <input v-model="join_link" id="join_link" type="text" class="form-control"/>
                        <div class="input-group-append">
                            <button type="button" class="input-group-text" @click="copyToClipboard()">Copy</button>
                        </div>
                    </div>
                    <p class="my-5">Vaše aktuální  provize z poplatků : <span class="d-inline-block font-weight-bold">10 %</span></p>
                    <!--<v-text-field class="mb-5" v-model="join_link"></v-text-field>-->
                </div>
                <div class="col-md-6 col-lg-6">
                    <h3>Kumulovaný limit k výběru</h3>

                    <p class="font-weight-bold mb-5">
                        {{profile.ref_balance | currency}} Kč 
                        <b-link class="yellow-link font-weight-bold ml-5" v-if="profile.ref_balance>0"  v-b-modal.modal-withdraw @click='setDataWithdraw()'>
                            Vybrat provizi
                        </b-link>
                    </p>
                    
                    <div class="my-md-5">&nbsp;</div>
                    
                    <h4 class="font-weight-normal mt-5 mb-4">Seznam zaregistrovaných partnerů</h4>

                    <div class="referrers-container">
                        <v-data-table
                            v-bind:headers="Referrers.headers"
                            v-bind:items="Referrers.Items"
                            :pagination.sync="pagination"
                            :total-items="Referrers.totalItems"
                            :rows-per-page-items="Referrers.perPage"
                            no-data-text="Není k dispozici"
                            hide-actions
                        >
                            <template slot="items" slot-scope="props">
                                <tr>
                                    <td class="text-capitalize" v-html="!props.item.name && !props.item.family && 'UN' || (props.item.name? props.item.name.substring(0,1):'') + (props.item.family ? props.item.family.substring(0,1):'')">
                                    </td>
                                    <td>
                                        {{props.item.date.date | moment('DD.MM.YYYY HH:ss')}}
                                    </td>
                                    <td>{{props.item.total_exchange>0?"Směnil":"Nesmenil"}}</td>
                                    <td>
                                        {{props.item.total_exchange | currency}} Kč
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>

                        <div class="text-xs-center p-2 mb-3" v-if="Referrers.Items.length>Referrers.perPage[0]">
                            <v-pagination v-model="pagination.page" :length="pagesReferrers" :total-visible="7"></v-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
        
        <b-modal size="lg" ref="modalWithdrawRef" centered hide-header hide-footer id="modal-withdraw">
            <div  class="p-md-3">
                <h2 class="mb-md-5 text-center">Vyber provizi</h2>

                <form ref="formWithdraw" @submit.prevent="SubmitFormWithdraw" class="formWithdraw px-md-5">
                    <v-text-field type="number" step="any" pattern="[0-9]*" inputmode="numeric" 
                        :class="{'text-danger' : (withdraw.amount&&withdraw.amount<=0) || withdraw.amount > profile.ref_balance}"
                        v-model="withdraw.amount" required
                        :label="withdraw.amount && 'Chci vybtat' || 'Kolik chcete vybtat'"
                        :error-messages="withdraw.errors && withdraw.errors.amount ? withdraw.errors.amount : []"
                        :error="withdraw.errors && !!withdraw.errors.amount"
                    ></v-text-field>
                    
                    <v-text-field
                        v-model="withdraw.payee.name" required
                        :label="withdraw.payee.name && 'Jmeno prijemce' || 'Zadejte jmeno prijemce'"
                        :error-messages="withdraw.errors && withdraw.errors.name ? withdraw.errors.name : []"
                        :error="withdraw.errors && !!withdraw.errors.name"
                    ></v-text-field>
<!--                    <v-text-field
                        v-model="withdraw.payee.address" required
                        :label="withdraw.payee.address && 'Adresa prijemce' || 'Zadejte adresu prijemce'"
                    ></v-text-field>
                    <v-text-field
                        v-model="withdraw.payee.country" required
                        :label="withdraw.payee.country && 'Stat' || 'Zadejte stat prijemce'"
                    ></v-text-field>-->
                    <v-text-field
                        v-model="withdraw.payee.iban" required
                        :label="withdraw.payee.iban && 'IBAN' || 'Zadejte IBAN prijemce'"
                        :error-messages="withdraw.errors && withdraw.errors.iban ? withdraw.errors.iban : []"
                        :error="withdraw.errors && !!withdraw.errors.iban"
                    ></v-text-field>
                    <v-text-field
                        v-model="withdraw.payee.bic_swift" 
                        :label="withdraw.payee.bic_swift && 'BIC/SWIFT' || 'Zadejte BIC/SWIFT prijemce'"
                        :error-messages="withdraw.errors && withdraw.errors.bic_swift ? withdraw.errors.bic_swift : []"
                        :error="withdraw.errors && !!withdraw.errors.bic_swift"
                    ></v-text-field>
                    <v-text-field
                        v-model="withdraw.payee.bank_name" 
                        :label="withdraw.payee.bank_name && 'Nazev banky' || 'Zadejte nazev banky'"
                        :error-messages="withdraw.errors && withdraw.errors.bank_name ? withdraw.errors.bank_name : []"
                        :error="withdraw.errors && !!withdraw.errors.bank_name"
                    ></v-text-field>
                    <v-text-field
                        v-model="withdraw.payee.bank_address" 
                        :label="withdraw.payee.bank_address && 'Adresa banky' || 'Zadejte adresu banky'"
                        :error-messages="withdraw.errors && withdraw.errors.bank_address ? withdraw.errors.bank_address : []"
                        :error="withdraw.errors && !!withdraw.errors.bank_address"
                    ></v-text-field>
                    <v-text-field
                        v-model="withdraw.payee.bank_country" 
                        :label="withdraw.payee.bank_country && 'Stat banky' || 'Zadejte stat banky'"
                        :error-messages="withdraw.errors && withdraw.errors.bank_country ? withdraw.errors.bank_country : []"
                        :error="withdraw.errors && !!withdraw.errors.bank_country"
                    ></v-text-field>

                    <h2 class="text-center">
                        <button v-bind="{ 'disabled': pending || !withdraw.amount || withdraw.amount<=0 || withdraw.amount > profile.ref_balance}" class="yellow-link">
                            Poslat ziadost
                        </button>
                    </h2>
                </form>
            </div>
        </b-modal>
        <b-modal size="lg" ref="modalWithdrawSuccessRef" centered hide-header hide-footer id="modal-withdraw-success">
            <div  class="p-md-3">
                <h2 class="mb-md-5 text-center">Gratulujeme!</h2>

                <div class="text-center">
                    <p class="green--text">Uspěšně</p>
                    <p class="mini">Vaše poziadavka proběhla úspěšně! Skor Vam bude odeslano provizi.</p>
                </div>
            </div>
        </b-modal>
        
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
                join_link: 'https://mujprvnibitcoin.cz/join/',
                withdraw:{
                    amount: '',
                    payee: {
                        name: '',

                        iban: '',
                        bic_swift: '',

                        bank_name: '',
                        bank_address: '',
                        bank_country: '',
                    },
                    errors:[]
                },
                Referrers: {
                    headers: [
                        { text: 'Jméno a příjmení', value: 'name'},
                        { text: 'Datum registrace', value: 'date.date'},
                        { text: 'Stav', value: 'status'},
                        { text: 'Příjem', value: 'total_exchange'},
                    ],
                    Items: [],
                    TotalItems: null,
                    perPage: [ 5, 10, 15, {text: 'All', value: -1} ],
                },
                pagination: {
                    sortBy: 'date.date',
                    descending: true, 
                },
            }
        },
        components: {
            HeaderComponent,
            FooterComponent,
        },
        computed: {
            ...mapGetters('User', [
                'pending', 'profile', 'referrers', 'referrerCount'
            ]),
            pagesReferrers () {
                if (this.pagination.rowsPerPage == null ||
                  this.pagination.totalItems == null
                ) return 0

                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
            }
        },

        methods: {
            ...mapActions('User', [
                'ReferrerList', 'getProfile','ReferWithdrawRequest'
            ]),
            setDataWithdraw(){
                this.withdraw.amount = this.profile.ref_balance;
                if(this.profile.name||this.profile.family) this.withdraw.payee.name = (this.profile.name + ' '+ this.profile.family).trim();
            },
            SubmitFormWithdraw() {
                this.ReferWithdrawRequest({
                    amount: this.withdraw.amount,
                    name: this.withdraw.payee.name,

                    iban: this.withdraw.payee.iban,
                    bic_swift: this.withdraw.payee.bic_swift,

                    bank_name: this.withdraw.payee.bank_name,
                    bank_address: this.withdraw.payee.bank_address,
                    bank_country: this.withdraw.payee.bank_country,
//                    out_payee: this.withdraw.payee
                }).then(response => {
                    this.withdraw.errors = [];
                    
                    this.withdraw.payee.iban = '';
                    this.withdraw.payee.bic_swift = '';
                    this.withdraw.payee.bank_name = '';
                    this.withdraw.payee.bank_address = '';
                    this.withdraw.payee.bank_country = '';
                    
                    this.$root.$emit('bv::show::modal','modal-withdraw-success');
                }).catch(errors => {
                    this.withdraw.errors = errors.errors;
                });
            },
            getReferrers() {
                this.ReferrerList().then(() => {
                    this.Referrers.Items = this.referrers;
                    this.Referrers.TotalItems = this.referrerCount;
                });
            },
            setJoinLink() {
                this.join_link += this.decimalToHex(this.profile.id + 123456789, 8); 
            },
            copyToClipboard() {
                document.getElementById('join_link').select();
                document.execCommand('copy');
            },
            decimalToHex(d, padding) { //Преобразование числа в шестнадцатеричную строку
                var hex = Number(d).toString(16);
                padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
                while (hex.length < padding) hex = "0" + hex;
                return hex;
            }
        },
        mounted() {
            this.setJoinLink();
            this.getReferrers();
        },
    }
</script>