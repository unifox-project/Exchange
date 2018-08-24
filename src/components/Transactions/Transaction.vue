<template>
    <v-container transaction-container>
        <div>
            
            <div class="row mb-5 text-center">
                <div class="col-md-4  font-weight-bold">
                    <p class="disabled mb-4 mt-4">Poslali jste</p>
                    <div class="transaction-nav-item mb-4">
                        {{transactionItem.in_amount}} <span class="text-uppercase">({{transactionItem.in_prefix}})</span>
                    </div>
                </div>
                <div class="col-md-4 text-center" v-if="errors">
                    <p class="red--text">{{errors}}</p>
                </div>
                <div class="col-md-4" v-else>
                    <p class="">ID transakce</p>
                    <p class="mini font-weight-bold break-word">{{transactionItem.id}}</p>

                    <img class="mt-3 mb-3" src="/static/img/icons/double-arrows.png"/>

                    <p class="mini d-none">
                        <small>
                            Transakční poplatek
                            <span class="font-weight-bold">
                                {{transactionItem.in_fee}} <span class="text-uppercase">{{transactionItem.in_prefix}}</span>
                            </span>
                            Sleva <span class="font-weight-bold">{{transactionItem.in_discount}}%</span>
                        </small>
                    </p>
                </div>
                <div class="col-md-4 font-weight-bold">
                    <p class="disabled mb-4 mt-4">Dostanete*</p>
                    <div class="transaction-nav-item mb-4">
                        {{transactionItem.out_amount}} <span class="text-uppercase">({{transactionItem.out_prefix}})</span>
                    </div>
                    <p class="mini m-0 ">
                        <small>
                            * Uvedená částka se může lišit v závislosti na aktuálním kurzu měn. Více informací naleznete v sekci 
                            <b-link class="font-weight-bold" to="/terms-and-condidtion/" target="_blank">všeobecné obchodní podmínky</b-link>.
                        </small>
                    </p>
                </div>
            </div>

            <h4 class="font-weight-normal text-center mt-3 mb-5 title-lined">Informace o platbě</h4>

            <div class="row mb-5">
                <div class="col-lg-10 offset-lg-1">
                    <div class="row text-md-left text-center">
                        <div class="col-md-6" v-if="'bank'===transactionItem.out_payment">
                            <div v-if="transactionItem.out_payee.name">
                                <p class="mini">Jméno příjemce</p>
                                <p class="font-weight-bold break-word">{{transactionItem.out_payee.name}}</p>
                            </div>
                            <div v-if="'czk'===transactionItem.out_currency">
                                <div v-if="transactionItem.out_payee.account_number">
                                    <p class="mini">Číslo účtu</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.out_payee.account_number}}</p>
                                </div>
                                <div v-if="transactionItem.out_payee.bank_code">
                                    <p class="mini">Kód banky</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.out_payee.bank_code}}</p>
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="transactionItem.out_payee.iban">
                                    <p class="mini">IBAN</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.out_payee.iban}}</p>
                                </div>
                                <div v-if="transactionItem.out_payee.bic_swift">
                                    <p class="mini">BIC/SWIFT</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.out_payee.bic_swift}}</p>
                                </div>
                                <div v-if="transactionItem.out_payee.bank_name">
                                    <p class="mini">Nazev banky</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.out_payee.bank_name}}</p>
                                </div>
                                <div v-if="transactionItem.out_payee.bank_address">
                                    <p class="mini">Adresa banky</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.out_payee.bank_address}}</p>
                                </div>
                                <div v-if="transactionItem.out_payee.bank_country">
                                    <p class="mini">Stat banky</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.out_payee.bank_country}}</p>
                                </div>
                            </div>
                            
                            <div v-if="transactionItem.out_payee.bank_name">
                                <p class="mini">Váš email</p>
                                <p class="font-weight-bold">{{transactionItem.out_payee.email}}</p>
                            </div>
                        </div>
                        <div class="col-md-6" v-else>
                            <p class="mini">Číslo Vaší peněženky</p>
                            <p class="font-weight-bold break-word">{{(transactionItem.out_payee && transactionItem.out_payee.wallet) || transactionItem.out_payee}}</p>
                        </div>
                        
                        <div class="col-md-6" v-if="'bank'===transactionItem.in_payment">
                            <div v-if="transactionItem.in_payee.name">
                                <p class="mini">Držitel účtu</p>
                                <p class="font-weight-bold break-word">{{transactionItem.in_payee.name}}</p>
                            </div>
                            <div v-if="transactionItem.in_payee.address">
                                <p class="mini">Adresa majitele účtu</p>
                                <p class="font-weight-bold break-word">{{transactionItem.in_payee.address}}</p>
                            </div>
                            
                            <div v-if="'czk'===transactionItem.in_currency">
                                <div v-if="transactionItem.in_payee.account_number">
                                    <p class="mini">Číslo účtu</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.in_payee.account_number}}</p>
                                </div>
                                <div v-if="transactionItem.in_payee.bank_code">
                                    <p class="mini">Kód banky</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.in_payee.bank_code}}</p>
                                </div>
                                <div v-if="transactionItem.in_payee.bank_code">
                                    <p class="mini">Poznámka – číslo objednávky</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.id}}</p>
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="transactionItem.in_payee.iban">
                                    <p class="mini">IBAN</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.in_payee.iban}}</p>
                                </div>
                                <div v-if="transactionItem.in_payee.bic_swift">
                                    <p class="mini">BIC/SWIFT</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.in_payee.bic_swift}}</p>
                                </div>
                                <div v-if="transactionItem.in_payee.bank_name">
                                    <p class="mini">Nazev banky</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.in_payee.bank_name}}</p>
                                </div>
                                <div v-if="transactionItem.in_payee.bank_address">
                                    <p class="mini">Adresa banky</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.in_payee.bank_address}}</p>
                                </div>
                                <div v-if="transactionItem.in_payee.bank_country">
                                    <p class="mini">Stat banky</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.in_payee.bank_country}}</p>
                                </div>
                                <div v-if="transactionItem.in_payee.bank_code">
                                    <p class="mini">Poznámka – číslo objednávky</p>
                                    <p class="font-weight-bold break-word">{{transactionItem.id}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6" v-else>
                            <p class="mini">Číslo naší peněženky</p>
                            <p class="font-weight-bold break-word">{{transactionItem.in_payee}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <h4 class="font-weight-normal mt-3 mb-5 title-lined">Aktuální stav</h4>

                <p class="mini yellow-text mb-3" v-if="transactionItem.status==1">1. Čekáme na přijetí Vaší platby</p>
                <p class="mini yellow-text mb-3" v-else-if="transactionItem.status==2">2. Čekáme na ověření transakce</p>
                <p class="mini green--text mb-3" v-else-if="transactionItem.status==3">3. Transakce proběhla úspěšně</p>

                <div class="row mb-5">
                    <div class="col-md-8 offset-md-2">
                        <div class="row">
                            <div class="col-md-4">
                                <p class="mini" :class="transactionItem.status >=1 && 'font-weight-bold' || 'disabled'">
                                    <span v-if="transactionItem.status===1">V procesu</span>
                                    <span v-else>Přijetí platby</span>

                                    <i class="material-icons green--text" v-if="transactionItem.status>1">
                                        done
                                    </i>
                                </p>
                            </div>
                            <div class="col-md-4">
                                <p class="mini" :class="transactionItem.status >=2 && 'font-weight-bold' || 'disabled'">
                                    <span v-if="transactionItem.status===2">V procesu</span>
                                    <span v-else>Ověření transakce</span>

                                    <i class="material-icons green--text" v-if="transactionItem.status>2">
                                        done
                                    </i>
                                </p>
                            </div>
                            <div class="col-md-4">
                                <p class="mini" :class="transactionItem.status >=3 && 'font-weight-bold' || 'disabled'">
                                    <span>Úspěšná transakce</span>

                                    <i class="material-icons green--text" v-if="transactionItem.status>=3">
                                        done
                                    </i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    
    export default {
        data() {
            return {
                transactionItem: {},
                intervalid1:null,
                errors:""
            }
        },
        computed: {
            ...mapGetters({
                transaction: 'Exchange/transaction',
                profile: 'User/profile',
            }),
        },

        methods: {
            ...mapActions({
                getExchangeByHash: 'Exchange/getExchangeByHash',
            }),
            getTransaction(transactionHash) {
                this.getExchangeByHash(transactionHash).then((response) => {
                    this.transactionItem = this.transaction;
                    
//                    if('bank'===this.transaction.out_payment) this.transactionItem.out_payee = this.transaction.out_payee.iban;
                    
                    if(this.intervalid1 && 3==this.transaction.status) clearInterval(this.intervalid1);
                }).catch(errors => {
                    this.transactionItem = {};
                    
                    this.errors = errors.message;
                });
            },
            getTransactionInterval: function(seconds){  
                if(seconds && seconds>0){
                    let self = this;          
                    this.intervalid1 = setInterval(function(){
                        self.getTransaction(self.$route.params.transactionHash);
                    }, seconds*1000);
                }
            }
        },
        mounted() {
            this.getTransaction(this.$route.params.transactionHash);
            this.getTransactionInterval(15);
        },
        destroyed () {
            clearInterval(this.intervalid1);
        },
    }
</script>