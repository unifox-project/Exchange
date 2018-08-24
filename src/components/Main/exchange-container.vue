<template>
    <v-container exchange-container id="start-exchange" ref="startExchangeRef">
        <div class="row">
            <div class="col-sm-12 col-md-8 col-lg-7 ml-auto text-left text-md-right main-textblock-right" v-if="!exchange.payment || !(exchange.payment && 1==exchange.paymentSuccess)">
                <h2>Nákup / Prodej</h2>
                <p>Vyberte, zda chcete kryptoměnu prodat, <br/>nebo nakoupit.</p>
                <p class="mini mb-4" >Proces probíhá v 5 jednoduchých volbách</p>
                <form ref="formExchange" @submit.prevent="SubmitFormExchange" v-if="!exchange.payment">
                    <v-select
                        v-model="exchange.from"
                        v-on:change="getListTo"
                        :items="list.from"
                        :label="exchange.from && 'Měna, kterou mám' || 'Vyberte, z jaké měny chcete směnit.'"
                        max-height="auto"
                    >
                        <template slot="selection" slot-scope="data">
                            <span>{{data.item.name}}&nbsp;</span>
                            <span class="text-uppercase">({{data.item.currency_suffix}})</span>
                        </template>
                        <template slot="item" slot-scope="data">
                            <template v-if="typeof data.item !== 'object'">
                                <v-list-tile-content v-text="data.item"></v-list-tile-content>
                            </template>
                            <template v-else>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <span>{{data.item.name}}</span>
                                        <span class="text-uppercase font-weight-bold">({{data.item.currency_suffix}})</span>
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </template>
                        </template>
                    </v-select>
                    <v-select
                        v-show="exchange.from"
                        v-model="exchange.to"
                        v-on:change="getListFrom"
                        :items="list.to"
                        :label="exchange.to && 'Měna, kterou chci' || 'Vyberte o co máte zájem.'"
                        max-height="auto"
                        item-value="text"
                    >
                        <template slot="selection" slot-scope="data">
                            <span>{{data.item.name}}&nbsp;</span>
                            <span class="text-uppercase">({{data.item.currency_suffix}})</span>
                        </template>
                        <template slot="item" slot-scope="data">
                            <template v-if="typeof data.item !== 'object'">
                              <v-list-tile-content v-text="data.item"></v-list-tile-content>
                            </template>
                            <template v-else>
                              <v-list-tile-content>
                                  <v-list-tile-title>
                                      <span>{{data.item.name}}</span>
                                      <span class="text-uppercase font-weight-bold">({{data.item.currency_suffix}})</span>
                                  </v-list-tile-title>
                              </v-list-tile-content>
                            </template>
                        </template>
                    </v-select>
                    
                    <div v-show="exchange.from && exchange.to" class="text-sm-right text-xs-center">
                        <!--type="number" step="any" pattern="[0-9]*" inputmode="numeric"-->
                        <div class="row">
                            <div class="col-md-6">
                                <!--v-money="moneyFormat"-->
                                <v-text-field autofocus 
                                    :class="{'text-danger' : exchange.toamount > exchange.to.balance}"
                                    ref="ExchangeAmountRef"
                                    v-model.lazy="exchange.amount"
                                    v-on:keyup="CalculateGetAmount"
                                    :label="exchange.amount && 'Chci směnit' || 'Kolik chcete směnit'"
                                    :suffix="exchange.from.currency_suffix"
                                ></v-text-field>
                            </div>
                            <div class="col-md-6">
                                <p :class="{'disabled' : exchange.toamount > exchange.to.balance}">
                                    Dostanete* 
                                    <span class="d-inline-block">
                                        <strong>
                                            {{exchange.toamount}}
                                            <span class="text-uppercase">{{exchange.to.currency_suffix}}</span>
                                        </strong>
                                    </span>
                                </p>
                                <p class="mini m-0 ">
                                    <small>
                                        * Uvedená částka se může lišit v závislosti na aktuálním kurzu měn. Více informací naleznete v sekci 
                                        <b-link class="font-weight-bold" to="/terms-and-condidtion/" target="_blank">všeobecné obchodní podmínky</b-link>.
                                    </small>
                                </p>
                            </div>
                        </div>
                        <div class="text-sm-left text-xs-center">
                            <p class="mini pl-md-4 d-none" :class="{'disabled' : exchange.toamount > exchange.to.balance}">
                                Transakční poplatek <strong>{{exchange.fee}} <span class="text-uppercase">{{exchange.from.currency_suffix}}</span></strong>
                            </p>
                            
                            <p class="mini pl-md-4 text-danger" v-if="exchange.amount && exchange.clear_amount < exchange.min">
                                Minimální částka je {{exchange.min}} <span class="text-uppercase">{{exchange.from.currency_suffix}}</span>
                            </p>
                            <p class="mini pl-md-4 text-danger" v-else-if="exchange.toamount > exchange.to.balance">
                                Více než je nyní k dispozici <strong><router-link to="/contacts/" class="yellow-link">Kontaktujte nás</router-link></strong>
                            </p>
                            
<!--                            <p class="mini pl-md-4 text-danger mb-4" v-if="exchange.amount && !isLogin && ('bank'===exchange.to.code || 'bank'===exchange.from.code)">
                                Jednou z platebních metod je banka. Je 
                                <strong>
                                    <b-link class="yellow-link" v-b-modal.modal-verify>nutná verifikace</b-link>
                                </strong>
                            </p>-->
                            <p class="mini pl-md-4 text-danger mb-4" v-if="exchange.amount && exchange.verify_code">
                                Pokračujte. Pro tuto částku je 
                                <strong>
                                    <b-link class="yellow-link" v-b-modal.modal-verify>nutná verifikace</b-link>
                                </strong>
                            </p>
                        </div>
                        <h2 v-show="exchange.from && exchange.to && !exchange.verify_ok">
                             <!--|| (!isLogin && ('bank'===exchange.to.code || 'bank'===exchange.from.code))-->
                            <button v-bind="{ 'disabled': !exchange.amount || exchange.clear_amount < exchange.min || exchange.toamount > exchange.to.balance}" class="yellow-link">
                                Směnit
                            </button>
                        </h2>
                    </div>
                </form>
                <div class="text-sm-left text-xs-center" v-else>
                    <p class="mini disabled m-0">
                        <small>Měna, kterou mám</small>
                    </p>
                    <p class="mb-3 disabled">
                        <span class="font-weight-bold">{{exchange.from.name}} (<span class="text-uppercase">{{exchange.from.currency_suffix}}</span>)</span>
                    </p>
                    
                    <p class="mini disabled m-0">
                        <small>Měna, kterou chci</small>
                    </p>
                    <p class="mb-3 disabled">
                        <span class="font-weight-bold">{{exchange.to.name}} (<span class="text-uppercase">{{exchange.to.currency_suffix}}</span>)</span>
                    </p>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <p class="mini disabled m-0">
                                <small>Chci směnit</small>
                            </p>
                            <p class="m-0">
                                <span class="font-weight-bold">{{exchange.clear_amount}} <span class="text-uppercase">{{exchange.from.currency_suffix}}</span></span>
                            </p>
                            <p class="mini disabled  m-0">
                                Transakční poplatek <strong>{{exchange.fee}} <span class="text-uppercase">{{exchange.from.currency_suffix}}</span></strong>
                            </p>
                        </div>
                        <div class="col-md-6 text-center text-md-right">
                            <p class="mini disabled m-0 ">
                                <small>Dostanete</small>
                            </p>
                            <p>
                                <span class="font-weight-bold">
                                    {{exchange.toamount}}
                                    <span class="text-uppercase">{{exchange.to.currency_suffix}}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                
                <form ref="formExchangeWallet" @submit.prevent="SubmitFormExchangeWallet" class="formExchangeWallet" v-if="!exchange.payment">
                    <div v-if="exchange.from && exchange.to && exchange.verify_ok" class="text-sm-right text-xs-center" >
                        <div class="row mt-5">
                            
                            <div class="col-md-12" v-if="'bank'===exchange.to.code">
                                <v-text-field
                                    v-model="exchange.payee.name" required
                                    :label="exchange.payee.name && 'Jméno příjemce' || 'Jméno příjemce'"
                                ></v-text-field>
                                <div v-if="'czk'===exchange.to.currency">
                                    <div class="row">
                                        <div class="col-md-7">
                                            <v-text-field
                                                v-model="exchange.payee.account_number" required
                                                :label="exchange.payee.account_number && 'Číslo účtu' || 'Číslo účtu'"
                                            ></v-text-field>
                                        </div>
                                        <div class="col-md-5">
                                            <v-text-field
                                                v-model="exchange.payee.bank_code" required
                                                :label="exchange.payee.bank_code && 'Kód banky' || 'Kód banky'"
                                            ></v-text-field>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <v-text-field
                                        v-model="exchange.payee.address" required
                                        :label="exchange.payee.address && 'Adresa příjemce' || 'Adresa příjemce'"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="exchange.payee.country" required
                                        :label="exchange.payee.country && 'Stát' || 'Stát'"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="exchange.payee.iban" required v-mask="IbanFormat"
                                        :label="exchange.payee.iban && 'IBAN' || 'IBAN'"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="exchange.payee.bic_swift" v-mask="SwiftBicMask"
                                        :label="exchange.payee.bic_swift && 'BIC/SWIFT' || 'BIC/SWIFT'"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="exchange.payee.bank_name" 
                                        :label="exchange.payee.bank_name && 'Název banky' || 'Název banky'"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="exchange.payee.bank_address" 
                                        :label="exchange.payee.bank_address && 'Adresa banky' || 'Adresa banky'"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="exchange.payee.bank_country" 
                                        :label="exchange.payee.bank_country && 'Stát banky' || 'Stát banky'"
                                    ></v-text-field>
                                </div>
                            </div>
                            <div class="col-md-12" v-else>
                                <v-text-field
                                    v-model="exchange.payee.wallet" 
                                    :label="exchange.payee.wallet && 'Vaše peněženka' || 'Zadejte adresu Vaší peněženky'"
                                ></v-text-field>
                                
                                <div class="showWalletTooltip" v-if="'btc'===exchange.to.code">
                                    <button type="button" class="btn--icon" id="showWalletTooltip"><v-icon large>help</v-icon></button>

                                    <b-tooltip target="showWalletTooltip" placement="left">
                                        <p class="mini">
                                            Vedle oficiální bitcoinové peněženky existuje mnoho dalších alternativ, které můžete využít. Oficiální peněženka má tu nevýhodu, že si sebou bere celý blockchain, který má několik desítek GB.
                                        </p>
                                        <p class="mini">
                                            Založit <b-link class="font-weight-bold yellow-link" href="https://www.blockchain.com/wallet" target="_blank">peněženku</b-link>
                                        </p>
                                    </b-tooltip>
                                </div>
                                <div class="showWalletTooltip" v-else-if="'dsh'===exchange.to.code">
                                    <button type="button" class="btn--icon" id="showWalletTooltip"><v-icon large>help</v-icon></button>

                                    <b-tooltip target="showWalletTooltip" placement="left">
                                        <p class="mini">
                                            Vedle oficiální dashcoinove peněženky existuje mnoho dalších alternativ, které můžete využít. Oficiální peněženka má tu nevýhodu, že si sebou bere celý blockchain, který má několik desítek GB.
                                        </p>
                                        <p class="mini">
                                            Založit <b-link class="font-weight-bold yellow-link">peněženku</b-link>
                                        </p>
                                    </b-tooltip>
                                </div>
                            </div>
                            
                            <div class="col-md-12" v-if="'bank'!==exchange.from.code">
                                <v-text-field
                                    v-model="exchange.payee.wallet_from" 
                                    :label="exchange.payee.wallet_from && 'Vaše '+exchange.from.code+' peněženka' || 'Zadejte adresu Vaší '+exchange.from.code+' peněženky'"
                                ></v-text-field>
                            </div>
                            <div class="col-md-12">
                                <v-text-field v-if="'bank'===exchange.to.code" v-model="exchange.payee.email" v-bind="{ 'disabled': isLogin}" required
                                    :label="exchange.payee.email && 'Email příjemce' || 'Email příjemce'"
                                ></v-text-field>
                                <v-text-field v-else v-model="exchange.payee.email" v-bind="{ 'disabled': isLogin}" required
                                    :label="exchange.payee.email && 'Váš email' || 'Zadejte Váš email'"
                                ></v-text-field>
                            </div>
                            <div class="col-md-12" v-if="!isLogin">
                                <v-checkbox class="text-center" v-model="term.terms" color="success" hide-details row="true" :error-messages="term.errors && term.errors.terms ? term.errors.terms : []" :error="term.errors && !!term.errors.terms">
                                    <span slot="label">
                                        Souhlasím s 
                                        <b-link class="font-weight-bold" to="/terms-and-condidtion/" target="_blank">obchodními podmínkami</b-link>
                                    </span>
                                </v-checkbox>
                                <v-checkbox class="text-center" v-model="term.privacy" color="success" hide-details row="true" :error-messages="term.errors && term.errors.privacy ? term.errors.privacy : []" :error="term.errors && !!term.errors.privacy">
                                    <span slot="label">
                                        Souhlasím s 
                                        <b-link class="font-weight-bold" to="/privacy-policy/" target="_blank">podmínkami ochrany osobních údajů</b-link>
                                    </span>
                                </v-checkbox>
                            </div>
                            <div class="col-md-12">
                                <v-checkbox class="text-center" v-model="term.schedule" color="success" hide-details row="true" :error-messages="term.errors && term.errors.schedule ? term.errors.schedule : []" :error="term.errors && !!term.errors.schedule">
                                    <span slot="label">
                                        Seznámil jsem se s aktuálním 
                                        <b-link class="font-weight-bold" to="/" target="_blank">sazebníkem poplatků</b-link>
                                    </span>
                                </v-checkbox>
                            </div>
                            <div class="col-md-12">
                                <h2 class="mt-4">
                                    <button v-bind="{ 'disabled': !exchange.payee.email || !exchange.verify_ok || ('bank'===exchange.to.code && 'czk'===exchange.to.currency && (!exchange.payee.name || !exchange.payee.account_number || !exchange.payee.bank_code)) || ('bank'===exchange.to.code && 'czk'!=exchange.to.currency && (!exchange.payee.name || !exchange.payee.address || !exchange.payee.country || !exchange.payee.iban)) || ('bank'!==exchange.to.code && !exchange.payee.wallet)}" class="yellow-link">
                                        Transakce
                                    </button>
                                </h2>
                            </div>
                        </div>
                    </div>
                </form>
                
                <div class="text-sm-left text-xs-center mt-5" v-else>
                    <div v-if="'bank'===exchange.to.code">
                        <p class="mini disabled m-0">
                            <small>Jméno příjemce</small>
                        </p>
                        <p class="mb-3 disabled font-weight-bold">
                            {{exchange.payee.name}}
                        </p>
                        
                        <div v-if="'czk'===exchange.to.currency">
                            <p class="mini disabled m-0">
                                <small>Číslo účtu</small>
                            </p>
                            <p class="mb-3 disabled font-weight-bold">
                                {{exchange.payee.account_number}}
                            </p>
                            
                            <p class="mini disabled m-0">
                                <small>Kód banky</small>
                            </p>
                            <p class="mb-3 disabled font-weight-bold">
                                {{exchange.payee.bank_code}}
                            </p>
                        </div>
                        <div v-else>
                            <p class="mini disabled m-0">
                                <small>Adresa příjemce</small>
                            </p>
                            <p class="mb-3 disabled font-weight-bold">
                                {{exchange.payee.address}}
                            </p>

                            <p class="mini disabled m-0">
                                <small>Stát</small>
                            </p>
                            <p class="mb-3 disabled font-weight-bold">
                                {{exchange.payee.country}}
                            </p>

                            <p class="mini disabled m-0">
                                <small>IBAN</small>
                            </p>
                            <p class="mb-3 disabled font-weight-bold">
                                {{exchange.payee.iban}}
                            </p>

                            <div v-if="exchange.payee.bic_swift">
                                <p class="mini disabled m-0">
                                    <small>BIC/SWIFT</small>
                                </p>
                                <p class="mb-3 disabled font-weight-bold">
                                    {{exchange.payee.bic_swift}}
                                </p>
                            </div>

                            <div v-if="exchange.payee.bank_name">
                                <p class="mini disabled m-0">
                                    <small>Název banky</small>
                                </p>
                                <p class="mb-3 disabled font-weight-bold">
                                    {{exchange.payee.bank_name}}
                                </p>
                            </div>

                            <div v-if="exchange.payee.bank_address">
                                <p class="mini disabled m-0">
                                    <small>Adresa banky</small>
                                </p>
                                <p class="mb-3 disabled font-weight-bold">
                                    {{exchange.payee.bank_address}}
                                </p>
                            </div>

                            <div v-if="exchange.payee.bank_country">
                                <p class="mini disabled m-0">
                                    <small>Stát banky</small>
                                </p>
                                <p class="mb-3 disabled font-weight-bold">
                                    {{exchange.payee.bank_country}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p class="mini disabled m-0">
                            <small>Vaše peněženka</small>
                        </p>
                        <p class="mb-3 disabled font-weight-bold">
                            {{exchange.payee.wallet}}
                        </p>
                    </div>

                    <p class="mini disabled m-0" v-if="'bank'===exchange.to.code">
                        <small>Email příjemce</small>
                    </p>
                    <p class="mini disabled m-0" v-else>
                        <small>Váš email</small>
                    </p>
                    <p class="mb-3 disabled font-weight-bold">
                        {{exchange.payee.email}}
                    </p>
                    
                    <div class="row mt-5">
                        <div class="col-md-6">
                            <p class="mini text-center text-md-left">
                                <span class="font-weight-bold" v-if="exchange.payment.id">ID objednávky: #{{exchange.payment.id}}</span>
                                <br/>
                                <small>Před platbou zkontrolujte své platební údaje</small>
                                
                                <br/><b-link class="font-weight-bold line-link" @click="exchange.payment=null">Změnit</b-link> údaje
                            </p>
                        </div>
                        <div class="col-md-6">
                            <h2 class="text-center text-md-right">
                                <b-link class="yellow-link" @click="$refs.modalPaymentRef.show()">
                                    Zaplatit
                                </b-link>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-7 ml-auto text-center text-md-right main-textblock-right" v-else>
                <h2>Nákup / Prodej</h2>
                <p>Vyberte, zda chcete kryptoměnu prodat, <br/>nebo nakoupit.</p>
                <p class="mini mb-5" >Proces probíhá v 5 jednoduchých volbách</p>
                
                <h3 class="mb-md-4">
                    Vaše transakce proběhla úspěšně!<br/>Děkujeme za projevenou důvěru.
                </h3>
                
                <p class="mini">
                    Stav transakce můžete <span class="font-weight-bold">sledovat</span> 
                    <span class="" v-if="exchange.payment && exchange.payment.hash">
                        přes tento <span class="font-weight-bold">odkaz</span>
                        <br/><b-link class="yellow-link font-weight-bold break-word" :to="'/transactions/'+exchange.payment.hash+'/'">
                            https://mujprvnibitcoin.cz/transactions/{{exchange.payment.hash}}/
                        </b-link>
                        <br/>nebo 
                    </span>
                    <b-link class="yellow-link font-weight-bold" to="/transactions/">
                        v historii transakcí
                    </b-link> ve svém účtu.
                </p>
            </div>
        </div>
        
        
        
        <b-modal ref="modalPaymentRef" size="lg" centered hide-header hide-footer id="modal-payment">
            <div  class="p-md-5">
                <h2 class="mb-md-5 text-center" v-if="'btc'===exchange.from.code">Odeslání Vašich BTC</h2>
                <h2 class="mb-md-5 text-center" v-else-if="'uxc'===exchange.from.code">Odeslání Vašich UXC</h2>
                <h2 class="mb-md-5 text-center" v-else-if="'bank'===exchange.from.code">Příkaz k úhradě - SEPA platba</h2>
                <h2 class="mb-md-5 text-center" v-else>Příkaz k úhradě</h2>

                <p class="mini text-center mb-4">
                    <strong>Pošlete částku</strong> dle níže uvedených <strong>platebních údajů</strong>. Dbejte na <strong>potvrzení</strong> odeslání až v momentu, kdy budou finance <strong>skutečně odeslány</strong>.
                </p>
                <p class="mini text-center">
                    <small>Posílaná částka</small>
                </p>
                <p class="text-center">
                    <strong>{{exchange.clear_amount}}</strong> <span class="font-weight-bold text-uppercase">{{exchange.from.currency_suffix}}</span>
                </p>


                <div class="row my-5 payment-info" v-if="'btc'===exchange.from.code">
                    <div class="col-md-12">
                        <p class="mini mb-4">
                            <small>Bitcoin QR platba</small>
                            <br/>
                            <span class="font-weight-bold">Naskenujte kód pro odeslání vašich BTC.</span>
                        </p>
                    </div>
                    <div class="col-md-3">
                        <img class="img-fluid" :src="'//qrcode.tec-it.com/API/QRCode?data='+(exchange.payment && exchange.payment.params[0].value)+'&amp;backcolor=%23ffffff'" alt=""/>
                    </div>
                    <div class="col-md-1">

                    </div>
                    <div class="col-md-8">
                        <p class="mini">
                            <small>Adresa naší BTC peněženky</small>
                            <br/>
                            <span class="font-weight-bold">{{exchange.payment && exchange.payment.params[0].value}}</span>
                        </p>
                        <p class="mini">
                            <small>Na platbu Vám zbývá</small>
                            <br/>
                            <countdown v-bind:auto-start="false" :time="DefaultTimerPayment()" :leading-zero="false" ref="PaymentCountdown" class="font-weight-bold">
                                <template slot-scope="props">
                                    {{props.minutes}} minut a {{props.seconds}} vterin
                                    <!--Time Remaining：{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds.-->
                                </template>
                            </countdown>
                        </p>
                    </div>
                </div>
                <div class="row my-5 payment-info" v-else-if="'uxc'===exchange.from.code">
                    <div class="col-md-12">
                        <p class="mini mb-4">
                            <small>Unicash QR platba</small>
                            <br/>
                            <span class="font-weight-bold">Naskenujte kód pro odeslání vašich UXC.</span>
                        </p>
                    </div>
                    <div class="col-md-3" v-if="exchange.payment">
                        <img class="img-fluid" :src="'//qrcode.tec-it.com/API/QRCode?data='+(exchange.payment && exchange.payment.params[0].value)+'&amp;backcolor=%23ffffff'" alt=""/>
                    </div>
                    <div class="col-md-1">

                    </div>
                    <div class="col-md-8">
                        <p class="mini">
                            <small>Adresa naší UXC peněženky</small>
                            <br/>
                            <span class="font-weight-bold">{{exchange.payment && exchange.payment.params[0].value}}</span>
                        </p>
                        <p class="mini">
                            <small>Na platbu Vám zbývá</small>
                            <br/>
                            <countdown v-bind:auto-start="false" :time="DefaultTimerPayment()" :leading-zero="false" ref="PaymentCountdown" class="font-weight-bold">
                                <template slot-scope="props">
                                    {{props.minutes}} minut a {{props.seconds}} vterin
                                    <!--Time Remaining：{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds.-->
                                </template>
                            </countdown>
                        </p>
                    </div>
                </div>
                <div class="my-5 payment-info" v-else-if="'bank'===exchange.from.code">
                    <div v-if="'czk'===exchange.from.currency">
                        <div class="row">
                            <div class="col-lg-6 offset-lg-3">
                                <div class="row">
                                    <div class="col-md-12">
                                        <p class="mini">
                                            <small>Držitel účtu</small>
                                            <br/>
                                            <span class="font-weight-bold">{{exchange.payment && exchange.payment.bank && exchange.payment.bank.name}}</span>
                                        </p>
                                    </div>
                                    <div class="col-md-7">
                                        <p class="mini">
                                            <small>Číslo účtu</small>
                                            <br/>
                                            <span class="font-weight-bold">{{exchange.payment && exchange.payment.bank && exchange.payment.bank.account_number}}</span>
                                        </p>
                                    </div>
                                    <div class="col-md-5">
                                        <p class="mini">
                                            <small>Kód banky</small>
                                            <br/>
                                            <span class="font-weight-bold">{{exchange.payment && exchange.payment.bank && exchange.payment.bank.bank_code}}</span>
                                        </p>
                                    </div>
                                    <div class="col-md-12">
                                        <p class="mini">
                                            <small>Poznámka – číslo objednávky</small>
                                            <br/>
                                            <span class="font-weight-bold">{{exchange.payment && exchange.payment.id}}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="row">
                            <div class="col">
                                <p class="mini">
                                    <small>Držitel účtu</small>
                                    <br/>
                                    <span class="font-weight-bold">{{exchange.payment && exchange.payment.bank && exchange.payment.bank.name}}</span>
                                </p>
                                <p class="mini">
                                    <small>Adresa majitele účtu</small>
                                    <br/>
                                    <span class="font-weight-bold">{{exchange.payment && exchange.payment.bank && exchange.payment.bank.address}}</span>
                                </p>
                            </div>
                            <div class="col">
                                <p class="mini">
                                    <small>IBAN</small>
                                    <br/>
                                    <span class="font-weight-bold text-uppercase">{{exchange.payment && exchange.payment.bank && exchange.payment.bank.iban}}</span>
                                </p>
                                <p class="mini">
                                    <small>BIC/SWIFT</small>
                                    <br/>
                                    <span class="font-weight-bold text-uppercase">{{exchange.payment && exchange.payment.bank && exchange.payment.bank.bic_swift}}</span>
                                </p>
                            </div>
                            <div class="col">
                                <p class="mini">
                                    <small>Název banky</small>
                                    <br/>
                                    <span class="font-weight-bold">{{exchange.payment && exchange.payment.bank && exchange.payment.bank.bank_name}}</span>
                                </p>
                                <p class="mini">
                                    <small>Adresa banky</small>
                                    <br/>
                                    <span class="font-weight-bold">{{exchange.payment && exchange.payment.bank && exchange.payment.bank.bank_address}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <p class="mini">
                                    <small>Poznámka – číslo objednávky</small>
                                    <br/>
                                    <span class="font-weight-bold">{{exchange.payment && exchange.payment.id}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row my-5 payment-info" v-else>
                    <div class="col-md-6">
                        <p class="mini">
                            <small>Adresa nasej penezenky</small>
                            <br/>
                            <span class="font-weight-bold">{{exchange.payment && exchange.payment.params[0].value}}</span>
                        </p>
                    </div>
                    <div class="col-md-6">
                        <p class="mini">
                            <small>Na platbu Vam zbyva</small>
                            <br/>
                            <countdown v-bind:auto-start="false" :time="DefaultTimerPayment()" :leading-zero="false" ref="PaymentCountdown" class="font-weight-bold">
                                <template slot-scope="props">
                                    {{props.minutes}} minut a {{props.seconds}} vterin
                                    <!--Time Remaining：{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds.-->
                                </template>
                            </countdown>
                        </p>
                    </div>
                </div>

                <p class="mini text-center">
                    Pokud nedodržíte platební instrukce, transakce může trvat déle.
                    <br/>Na tlačítko <span class="yellow-text font-weight-bold">"Peníze odeslány"</span> klikněte až v momentu, kdy jsou peníze z vašeho účtu <span class="text-danger font-weight-bold">skutečně odeslány.</span>
                </p>
                <h2 class="mt-5 text-center">
                    <b-link class="yellow-link"
                        @click="$refs.modalPaymentConfirmRef.show();"
                    >
                        <span v-if="'btc'===exchange.from.code">BTC odeslány</span>
                        <span v-else-if="'uxc'===exchange.from.code">UXC odeslány</span>
                        <span v-else>Peníze odeslány</span>
                    </b-link>
                </h2>
            </div>
        </b-modal>
        <b-modal size="lg" ref="modalPaymentConfirmRef" centered hide-header hide-footer id="modal-payment-confirm">
            <div  class="p-md-5">
                <h2 class="mb-md-5 text-center">Opravdu jste částku odeslal?</h2>

                <h2 class="mt-5 text-center">
                    <b-link class="yellow-link"
                        :class="{'loading':pendingPayment}"
                        :disabled="pendingPayment"
                        @click="confirmPayment"
                    >
                        Ano, odeslal
                    </b-link>
                </h2>
                <h2 class="mt-5 text-center">
                    <b-link class="font-weight-normal line-link"
                        @click="$refs.modalPaymentConfirmRef.hide()"
                    >
                        Ne, neodeslal
                    </b-link>
                </h2>
            </div>
        </b-modal>
        <b-modal ref="modalPaymentSuccessRef" centered hide-header hide-footer id="modal-payment-success">
            <div  class="p-md-3 text-center">
                <h2 class="mb-md-5">Gratulujeme!<br/>Odesláno</h2>
                
                <p class="mini">
                    Stav transakce můžete <span class="font-weight-bold">sledovat</span> 
                    <span class="" v-if="exchange.payment && exchange.payment.hash">
                        přes tento <span class="font-weight-bold">odkaz</span>
                        <br/><b-link class="yellow-link font-weight-bold break-word" :to="'/transactions/'+exchange.payment.hash+'/'">
                            https://mujprvnibitcoin.cz/transactions/{{exchange.payment.hash}}/
                        </b-link>
                        <br/>nebo 
                    </span>
                    <b-link class="yellow-link font-weight-bold" to="/transactions/">
                        v historii transakcí
                    </b-link> na svém účtu
                </p>

                <h2 class="mt-5">
                    <b-link class="yellow-link" :to="'/transactions/'+(exchange.payment && exchange.payment.hash? exchange.payment.hash+'/' : '')">
                        Přejít na odkaz
                    </b-link>
                </h2>
                <p class="mini">
                    Uskutečnit 
                    <b-link class="font-weight-bold">
                        novou směnu
                    </b-link>
                </p>
            </div>
        </b-modal>
        <b-modal ref="modalPaymentErrorRef" centered hide-header hide-footer id="modal-payment-error">
            <div  class="p-md-3 text-center">
                <h2 class="mb-md-5 text-danger">Něco nevyšlo!</h2>
                
                <p class="mini mt-5 mb-3">
                    V průběhu transakce nastala <span class="font-weight-bold">neidentifikovatelná chyba</span>
                </p>
                <p class="mini">
                    Kontaktujte, prosím, 
                    <b-link class="yellow-link font-weight-bold" to="/contacts/">
                        technickou podporu.
                    </b-link>
                </p>

                <h2 class="mt-5">
                    <b-link class="yellow-link" @click="$refs.modalPaymentErrorRef.hide()">
                        Ok, zavřít.
                    </b-link>
                </h2>
            </div>
        </b-modal>
        <b-modal ref="modalBestExchangeRef" id="modal-best-exchange" size="md" centered hide-header hide-footer>
            <div class="p-md-4 text-center">
                <h3 class="mb-md-4">Směňuj výhodněji!</h3>
                <p class="mini mb-5">
                    Ještě nemáte <span class="font-weight-bold">vlastní účet?</span> Zdarma <span class="font-weight-bold">zaregistrujte</span> svůj účet a získejte pohodlný přístup k historii Vašich transakcí a dalším <span class="font-weight-bold">benefitům</span>.
                </p>
                <h3 class="mb-4">
                    <b-link v-b-modal.modal-register class="yellow-link font-weight-bold">Zaregistrujte se</b-link>
                </h3>
                <p class="mini">
                    nebo
                </p>
                <h3 class="mt-4 mb-5">
                    <b-link v-b-modal.modal-auth class="yellow-link font-weight-bold">Přihlaste se</b-link>
                </h3>
                <p class="mini mt-4">
                    <b-link class="font-weight-bold" @click="continueWithoutAuth();">Pokračujte</b-link> bez přihlášení.
                </p>
            </div>
        </b-modal>
    </v-container>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    
//    import {VMoney} from 'v-money';
    import {mask} from 'vue-the-mask';
    import Countdown from '@xkeshi/vue-countdown'; // https://github.com/xkeshi/vue-countdown
    
    export default {
        data: () => ({
            list:{
                to: [],
                from: [],
            },
            exchange:{
                to: '',
                from: '',
                amount: '',
                clear_amount: '',
                toamount: '',
                
                payee: {
                    wallet:'',
                    wallet_from:'',
                    
                    name: '',
                    address: '',
                    country: '',
                    
                    iban: '',
                    bic_swift: '',
                    
                    account_number : '',
                    bank_code: '',
                    bank_name: '',
                    bank_address: '',
                    bank_country: '',
                    
                    email: '',
                },
                payment:null,
                paymentSuccess: 0,
                
                min: 1,
                fee: 0,
                discount: 0,
                verify_code: false,
                verify_ok: false
            },
            term:{
                terms: false,
                privacy: false,
                schedule: false,
                errors: []
            },
            moneyFormat: {
                decimal: '.',
                thousands: '',
                prefix: '',
                suffix: '',
                precision: 0,
                masked: false /* doesn't work with directive */
            },
            tokensFormat: {
                '#': {pattern: /\d/},
                'X': {pattern: /[0-9a-zA-Z]/},
                'U': {pattern: /[0-9a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
                'S': {pattern: /[a-zA-Z]/},
                'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
                'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
                '!': {escape: true}
            },
            IbanFormat: {
                mask: 'AA## XXXX #### #### #### #### #### ###',
                tokens: {
                    '#': {pattern: /\d/},
                    'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
                    'X': {pattern: /[0-9a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
                },
            },
            SwiftBicMask: {
                mask: 'AAAAAAXXXXX',
                tokens: {
                    'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
                    'X': {pattern: /[0-9a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
                },
            },
            showWalletTooltip:false,
            showBestExchange:false
        }),
        directives: {
            mask: mask,
//            money: VMoney
        },
        components: {
            Countdown,
        },
        computed: {
            ...mapGetters({
                getToList: 'Exchange/getToList',
                getFromList: 'Exchange/getFromList',
                
                isLogin: 'User/isLogin',
                profile: 'User/profile',
                
                pendingPayment: 'Payment/pending',
            })
        },
        mounted() {
            this.$root.$on('setExchange', this.setExchange);
            this.getListFrom();
//            this.getListTo();
        },
        methods: {
            ...mapActions({
                ExchangeToList: 'Exchange/ExchangeToList',
                ExchangeFromList: 'Exchange/ExchangeFromList',
                ExchangeCan: 'Exchange/ExchangeCan',
                ExchangeAdd: 'Exchange/ExchangeAdd',
                
                confirmByUser: 'Payment/confirmByUser',
            }),
            setExchange(to, from, refresh) {
                if(refresh) {
                    this.exchange.to = '';
                    this.exchange.from = '';
                    this.getListFrom().then(()=>{
                        this.setExchange(to, from);
                    });
                    console.log('Refresh Exchange');
                    return false;
                }
                if(to && from){
                    this.exchange.from = {
                        id: from && from.id || 0,
                        currency: from && from.currency || '',
                    };
                    this.exchange.from = this.list.from.find(this.FindFrom);
                    
                    this.getListTo(this.exchange.from).then(()=>{
                        this.exchange.to = {
                            id: to && to.id || 0,
                            currency: to && to.currency || '',
                        };
                        this.exchange.to = this.list.to.find(this.FindTo);
                        this.getListFrom(this.exchange.to);
                    });
                }else if(to){
                    this.exchange.to = {
                        id: to && to.id || 0,
                        currency: to && to.currency || '',
                    };
                    
                    this.exchange.to = this.list.to.find(this.FindTo);
                    this.getListFrom(this.exchange.to);
                }else if(from){
                    this.exchange.from = {
                        id: from && from.id || 0,
                        currency: from && from.currency || '',
                    };
                    
                    this.exchange.from = this.list.from.find(this.FindFrom);
                    this.getListTo(this.exchange.from);
                }
            },
            async getListTo(data) {
                var SendParam = {};
                if(data && data.currency)
                    SendParam.filters = JSON.stringify({
                        payment_system:data.id,
                        currency:data.currency
                    });
                
                return this.ExchangeToList(SendParam || {}).then(response => {
                    this.list.to = this.getToList;
                    
                    if(this.exchange.to.currency) this.exchange.to = this.list.to.find(this.FindTo);
                    this.CalculateGetAmount();
                    return true;
                });
            },
            async getListFrom(data) {
                var SendParam = {};
                if(data && data.currency)
                    SendParam.filters = JSON.stringify({
                        payment_system:data.id,
                        currency:data.currency
                    });
                return this.ExchangeFromList(SendParam || {}).then(response => {
                    this.list.from = this.getFromList;
                    
                    if(this.exchange.from.currency) this.exchange.from = this.list.from.find(this.FindFrom);
//                    if(this.exchange.amount) 
                    this.CalculateGetAmount();
                    return true;
                });
            },
            SubmitFormExchange(e) {
                this.ExchangeCan({
                    amount: this.exchange.clear_amount, 
                    currency: this.exchange.from.currency,
                    bank: ('bank'===this.exchange.to.code || 'bank'===this.exchange.from.code)
                }).then(response => {
                    if(response.data.errors){
                        this.exchange.verify_code = response.data.errors.code;
                        this.exchange.verify_ok = false;
                    }else{
                        this.exchange.verify_code = false;
                        this.exchange.verify_ok = true;
                        if(this.isLogin){
                            if(this.profile.email) this.exchange.payee.email = this.profile.email;
                            if(this.profile.name||this.profile.family) this.exchange.payee.name = ((this.profile.name||'') + ' '+ (this.profile.family||'')).trim();
                            if(this.profile.address) this.exchange.payee.address = this.profile.address;
                            if(this.profile.country) this.exchange.payee.country = this.profile.country;
                        }
                    }
                    
                    this.$root.$emit('setVerifyData', { verify_code: this.exchange.verify_code});
                });
            },
            SubmitFormExchangeWallet(e) {
                this.term.errors = [];
                if(this.isLogin && !this.term.schedule){
                    this.term.errors.schedule = ['Must be accepted.'];
                    return;
                }else if(!this.isLogin && (!this.term.terms || !this.term.privacy || !this.term.schedule)){
                    if(!this.term.terms) this.term.errors.terms = ['Terms must be accepted.'];
                    if(!this.term.privacy) this.term.errors.privacy = ['Privacy Policy must be accepted.'];
                    if(!this.term.schedule) this.term.errors.schedule = ['Must be accepted.'];
                    return;
                }
                
                if(!this.isLogin && !this.showBestExchange){
                    this.$root.$emit('bv::show::modal','modal-best-exchange');
                    return;
                }
                
                let data = {
                    commission_id : this.exchange.to.commission_id,
                    in_amount : this.exchange.clear_amount,
                    email : this.exchange.payee.email,
                    out_payee : JSON.stringify(this.exchange.payee),
                };
                
                this.ExchangeAdd(data).then(response => {
                    if(response.data.errors){
                        
                        
                    }else{
                        this.exchange.payment = response.data.data;
                        if('bank'===this.exchange.from.code && this.exchange.payment.params[0]){
                            
                            this.exchange.payment.bank = JSON.parse(this.exchange.payment.params[0].value);
                        }
                        
                        
                        this.$root.$emit('bv::show::modal','modal-payment');
                        
                        if(this.$refs.PaymentCountdown) this.$refs.PaymentCountdown.start();
                    }
                }).catch(errors => {
                    this.$root.$emit('bv::show::modal','modal-payment-error');
                });
            },
            confirmPayment: function (e) {
                if(this.exchange.payment.id){
                    this.confirmByUser(this.exchange.payment.id).then(response => {
                        this.exchange.paymentSuccess = 1;
                        this.$root.$emit('bv::show::modal','modal-payment-success');
                    }).catch(errors => {
                        this.$root.$emit('bv::show::modal','modal-payment-error');
                    });
                }else{ 
                    this.exchange.paymentSuccess = 1;
                    this.$root.$emit('bv::show::modal','modal-payment-success');
                }
                
                if(this.$refs.PaymentCountdown) this.$refs.PaymentCountdown.stop();
            },
            
            continueWithoutAuth: function () {
                this.$refs.modalBestExchangeRef.hide();
                this.showBestExchange = true;
            },
            
            FindFrom(element) {return element.id === this.exchange.from.id && element.currency === this.exchange.from.currency;},
            FindTo(element) {return element.id === this.exchange.to.id && element.currency === this.exchange.to.currency;},
            CalculateGetAmount() {
                this.exchange.verify_ok = false;
                if(!this.exchange.to || !this.exchange.from) return 0;
                
                this.exchange.clear_amount = this.exchange.amount.replace(/[^0-9.]/g, "");
                
                if(this.exchange.from){
                    this.moneyFormat.suffix = ' '+this.exchange.from.currency_suffix;
                    if('btc'===this.exchange.from.currency || 'dsh'===this.exchange.from.currency || 'uxc'===this.exchange.from.currency || 'fox'===this.exchange.from.currency)
                        this.moneyFormat.precision = 6;
                    else this.moneyFormat.precision = 0;
                }
                
                this.exchange.fee = (this.exchange.clear_amount * this.exchange.to.commission / 100);
                this.exchange.discount = this.profile && this.profile.discount?(this.exchange.fee * this.profile.discount / 100):0;
                
                this.exchange.toamount = ((this.exchange.clear_amount - this.exchange.fee + this.exchange.discount) * this.exchange.to.course).toFixed(8);
                
                if('czk' == this.exchange.from.currency && 'btc' == this.exchange.to.currency) this.exchange.min = 2000;
                else if('eur' == this.exchange.from.currency) this.exchange.min = 80;
                else if('uxc' == this.exchange.from.currency) this.exchange.min = 80;
                else if('btc' == this.exchange.from.currency) this.exchange.min = 0.01;
                else if('dsh' == this.exchange.from.currency) this.exchange.min = 0.01;
                else this.exchange.min = 1;
                
                if(process.env.NODE_ENV === 'development') {
                    console.log(
                        'Exchange: ' + this.exchange.from.currency + ' - ' + this.exchange.to.currency+
                        ' | amount: ' + this.exchange.amount +

                        ' | rate: ' + this.exchange.to.course+
                        ' | fee: ' + this.exchange.fee+' ('+this.exchange.to.commission+'%)'+
                        ' | discount: ' + this.exchange.discount+' ('+(this.profile?this.profile.discount:0)+'%)'+
                        ' | get: ' + this.exchange.toamount +

                        ' | balance: ' + this.exchange.to.balance+
                        ' | min amount: ' + this.exchange.min 
                    );
                }
                
         	return this.exchange.toamount;
            },
            DefaultTimerPayment() {
                return 900000; // 15 min
            }
        }
    }
</script>