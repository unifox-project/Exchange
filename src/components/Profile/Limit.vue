<template>
    <v-container class="text-center limit-container">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <h4 class="title-lined mb-4">
                    <i class="material-icons green--text">
                        done
                    </i>
                    <small>Směna do</small> <span class="d-inline-block">{{limit[0]-1 | currency}} Kč</span>
                </h4>
                <h4 class="title-lined mb-4" v-b-toggle.collapsePhone>
                    <i class="material-icons green--text" v-if="profile.activation && profile.verification_phone_ok">
                        done
                    </i>
                    <small>Směna</small> <span class="d-inline-block">{{limit[0] | currency}} - {{limit[1]-1 | currency}} Kč</span>
                </h4>
                <b-collapse id="collapsePhone" :visible="!profile.activation || !profile.verification_phone_ok">
                    <p class="mini mb-4 mt-5">
                        Pro získání limitu směny <span class="d-inline-block font-weight-bold">{{limit[0] | currency}} – {{limit[1]-1 | currency}} Kč</span>
                        potřebujeme <span class="font-weight-bold">ověřit</span> Vaše <span class="font-weight-bold">telefonní číslo</span> a <span class="font-weight-bold">Email</span>.
                    </p>
                    <div class="row">
                        <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <v-form ref="formVerifyEmail" class="p-md-5 p-3" @submit.prevent="submitVerifyEmail" v-if="!profile.activation">
                                <p class="mini mb-3 text-center">
                                    <strong>Zkontrolujte si svůj email.</strong>
                                    Klikněte na aktivační odkaz nebo zkopírujte aktivační kód a <strong>pokračujte.</strong>
                                </p>
                                <v-text-field
                                    class="mb-5"
                                    :label="verify.hash && 'Aktivační kód' || 'Zadejte aktivační kód'"
                                    v-model="verify.hash"
                                    :error-messages="verify.errors && verify.errors ? verify.errors : []"
                                    :error="verify.errors && !!verify.errors"
                                ></v-text-field>
                                <h2 class="mt-5 text-center">
                                    <button class="yellow-link"
                                        :class="{'loading':pending}"
                                        :disabled="pending || !verify.hash"
                                    >
                                        Aktivovat
                                    </button>
                                </h2>
                                <p class="mini text-center">
                                    <b-link class="font-weight-bold" v-on:click="ResendVerifyEmailCode(profile.email)">Znovu zaslat</b-link>
                                    aktivační kód
                                </p>
                            </v-form>
                            <div v-else>
                                <h4 class="mt-3">{{profile.email}}</h4>
                                <p class="mini mb-5">
                                    Vaš email byl úspěšně ověřen!
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <v-form class="py-md-5 py-3" ref="PhoneForm" @submit.prevent="SubmitVerificationPhone" v-if="!profile.verification_phone_ok">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <vue-tel-input @onInput="onInputPhone" ref="phoneNumberRef"
                                            :placeholder="phone.number && 'Vaše tel. číslo' || 'Zadejte Vaše tel. číslo'"
                                            v-model="phone.number" 
                                            :disabled="pending"
                                        >
                                        </vue-tel-input>
                                        <p class="mini text-right mt-0">
                                            <b-link class="font-weight-bold yellow-link" 
                                                :disabled="pending || !phone.isValid"  
                                                @click="sendVerificationPhoneCode"
                                            >
                                                <span v-if="phone.code_sended">Znovu poslat kód</span>
                                                <span v-else>Poslat kód</span>
                                            </b-link>
                                        </p>
                                    </div>
                                    <div class="col-sm-12">
                                        <v-text-field
                                            :label="phone.code && 'Aktivační kód' || 'Aktivační kód'"
                                            v-model="phone.code"
                                            :disabled="pending"
                                            :error-messages="errors && errors.message"
                                            :error="errors && !!errors.message"
                                        ></v-text-field>
                                    </div>
                                    <div class="col-sm-12">
                                        <h2 class="my-5 text-center">
                                            <button class="yellow-link" 
                                                :class="{'loading':pending}"
                                                :disabled="pending || !phone || !phone.code"
                                            >
                                                Ověřit telefon
                                            </button>
                                        </h2>
                                    </div>
                                </div>
                            </v-form>
                            <div v-else-if="profile.verification_phone_ok">
                                <h4 class="mt-3">{{profile.phone}}</h4>
                                <p class="mini mb-5">
                                    Vaš telefonní číslo bylo úspěšně ověřeno!
                                </p>
                            </div>
                        </div>
                    </div>
                </b-collapse>
                
                <h4 class="title-lined mb-4" v-b-toggle.collapsePasport :class="(!profile.activation || !profile.verification_phone_ok) && 'disabled' || ''">
                    <i class="material-icons green--text" v-if="profile.activation && profile.verification_phone_ok && profile.verification_ok">
                        done
                    </i>
                    <small>Směna</small> <span class="d-inline-block">{{limit[1] | currency}} – {{limit[2]-1 | currency}} Kč</span>
                </h4>
                <b-collapse id="collapsePasport" :visible="profile.activation && profile.verification_phone_ok && !profile.verification_ok">
                    <div class="row">
                        <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <v-form ref="PassortForm" @submit.prevent="SubmitVerificationPasport" v-if="!profile.verification_ok && (!profile.verification_front || !profile.verification_back || !profile.verification_address)" :class="(!profile.activation || !profile.verification_phone_ok) && 'disabled' || ''">
                                <p class="mini mb-5">
                                    Pro získání limitu v rozmezí <span class="d-inline-block font-weight-bold">{{limit[1] | currency}} – {{limit[2]-1 | currency}} Kč</span> potřebujeme <span class="font-weight-bold">ověřit</span> Váš <span class="font-weight-bold">průkaz totožnosti</span> a potvrdit <span class="font-weight-bold">Vaši adresu</span>
                                </p>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <v-text-field
                                            label="Fotografie přední strany Vašeho průkazu"
                                            v-model="pasport.verification.front"
                                            :error-messages="errors && errors.verification_front"
                                            :error="errors && !!errors.verification_front"
                                            disabled
                                        ></v-text-field>

                                        <p class="mini text-right mt-0">
                                            <file-upload
                                                input-id="pasportFrontUpload"
                                                class="font-weight-bold yellow-link "
                                                extensions="gif,jpg,jpeg,png"
                                                accept="image/png,image/gif,image/jpeg"
                                                v-model="pasport.files.front"
                                                @input-filter="inputFilter"
                                                @input-file="inputFrontFile"
                                            >
                                                Vybrat soubor
                                            </file-upload>
                                        </p>
                                    </div>
                                    <div class="col-sm-12">
                                        <v-text-field
                                            label="Fotografie zadní strany Vašeho průkazu"
                                            v-model="pasport.verification.back"
                                            :error-messages="errors && errors.verification_back"
                                            :error="errors && !!errors.verification_back"
                                            disabled
                                        ></v-text-field>

                                        <p class="mini text-right mt-0">
                                            <file-upload
                                                input-id="pasportBackUpload"
                                                class="font-weight-bold yellow-link "
                                                extensions="gif,jpg,jpeg,png"
                                                accept="image/png,image/gif,image/jpeg"
                                                v-model="pasport.files.back"
                                                @input-filter="inputFilter"
                                                @input-file="inputBackFile"
                                            >
                                                Vybrat soubor
                                            </file-upload>
                                        </p>
                                    </div>


                                    <div class="col-md-12">
                                        <v-text-field class="mb-3"
                                            label="Adresa"
                                            v-model="pasport.address"
                                            :disabled="pending"
                                            :error-messages="errors && errors.address ? errors.address[0] : []"
                                            :error="errors && !!errors.address"
                                            required
                                        ></v-text-field>
                                    </div>
                                    <div class="col-md-12">
                                        <v-text-field class="mb-3"
                                            label="Město"
                                            v-model="pasport.city"
                                            :disabled="pending"
                                            :error-messages="errors && errors.city ? errors.city[0] : []"
                                            :error="errors && !!errors.city"
                                            required
                                        ></v-text-field>
                                    </div>
                                    <div class="col-md-12">
                                        <v-select class="mb-3"
                                            v-model="pasport.country"
                                            :items="country"
                                            label="Stát"
                                            required
                                            autocomplete
                                        >
                                            <template slot="selection" slot-scope="data">
                                                <span>{{data.item}}</span>
                                            </template>
                                            <template slot="item" slot-scope="data">
                                                <template>
                                                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                                                </template>
                                            </template>
                                        </v-select>
                                    </div>
                                    <div class="col-sm-12">
                                        <v-text-field
                                            label="Fotografie potvrzující Vaši adresu"
                                            v-model="pasport.verification.address"
                                            :error-messages="errors && errors.verification_address"
                                            :error="errors && !!errors.verification_address"
                                            disabled
                                        ></v-text-field>

                                        <p class="mini text-right mt-0">
                                            <file-upload
                                                input-id="pasportAddressUpload"
                                                class="font-weight-bold yellow-link "
                                                extensions="gif,jpg,jpeg,png"
                                                accept="image/png,image/gif,image/jpeg"
                                                v-model="pasport.files.address"
                                                @input-filter="inputFilter"
                                                @input-file="inputAddressFile"
                                            >
                                                Vybrat soubor
                                            </file-upload>
                                        </p>
                                    </div>

                                    <div class="col-sm-12">
                                        <h2 class="my-5 text-center">
                                            <button class="yellow-link"
                                                :class="{'loading':pending}"
                                                :disabled="pending || !pasport.files.front[0] || !pasport.files.back[0] || !pasport.files.address[0] || !pasport.files.front[0].file || !pasport.files.back[0].file || !pasport.files.address[0].file || !pasport.address || !pasport.city || !pasport.country"
                                            >
                                                Nahrát
                                            </button>
                                        </h2>
                                    </div>
                                </div>
                            </v-form>
                            <div class="text-center" v-else-if="!profile.verification_ok && profile.verification_front && profile.verification_back && profile.verification_address">
                                <h4 class="mt-4">Soubor byl nahrán!</h4>
                                <p class="mini">
                                    Odkaz na soubor <b-link class="font-weight-bold yellow-link" :to="profile.verification_front" target="_blank">přední strany průkazu</b-link>
                                </p>
                                <p class="mini">
                                    Odkaz na soubor <b-link class="font-weight-bold yellow-link" :to="profile.verification_back" target="_blank">zadní strany průkazu</b-link>
                                </p>
                                <p class="mini mb-5">
                                    Odkaz na soubor s <b-link class="font-weight-bold yellow-link" :to="profile.verification_address" target="_blank">potvrzením adresy</b-link>
                                </p>
                                <p class="mini mb-5">
                                    <small><span class="font-weight-bold">Soubor</span> byl úspěšně nahrán, ale zatím <span class="font-weight-bold">nebyl ověřen</span> moderátorem. Po úspěšném ověření souboru Vám <span class="font-weight-bold">zašleme upozornění emailem</span>, který jste uvedli při registraci.</small>
                                </p>
                            </div>
                            <div class="text-center" v-else>
                                <h4>Soubor byl úspěšně ověřeni!</h4>
                                <p class="mini">
                                    Odkaz na soubor <b-link class="font-weight-bold yellow-link" :to="profile.verification_front" target="_blank">přední strany průkazu</b-link>
                                </p>
                                <p class="mini">
                                    Odkaz na soubor <b-link class="font-weight-bold yellow-link" :to="profile.verification_back" target="_blank">zadní strany průkazu</b-link>
                                </p>
                                <p class="mini mb-5">
                                    Odkaz na soubor s <b-link class="font-weight-bold yellow-link" :to="profile.verification_address" target="_blank">potvrzením adresy</b-link>
                                </p>
                                <p class="mini mb-5">
                                    <small>
                                        Váš <span class="font-weight-bold">průkaz totožnosti</span> a <span class="font-weight-bold">doklad potvrzující adresu</span> byly ověřeny.
                                    </small>
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </b-collapse>
                
                <h4 class="title-lined mb-4" v-b-toggle.collapseKYC :class="(!profile.activation || !profile.verification_phone_ok || !profile.verification_ok) && 'disabled' || ''">
                    <i class="material-icons green--text" v-if="profile.activation && profile.verification_phone_ok && profile.verification_ok && profile.verification_kyc_ok">
                        done
                    </i>
                    <small>Směna</small> <span class="d-inline-block">bez limitu</span>
                </h4>
                <b-collapse id="collapseKYC" :visible="profile.activation && profile.verification_phone_ok && profile.verification_ok && !profile.verification_kyc_ok">
                    <div class="row">
                        <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <v-form ref="KYCForm" @submit.prevent="SubmitVerificationKYC" v-if="!profile.verification_kyc_ok && !profile.verification_kyc" :class="(!profile.activation || !profile.verification_phone_ok || !profile.verification_ok) && 'disabled' || ''">
                                <p class="mini mb-4">
                                    Pro odstranění směnového limitu <span class="d-inline-block font-weight-bold">vyplňte KYC dotazník.</span>
                                </p>
                                <p class="mini mb-4 text-center">
                                    <span class="d-inline-block font-weight-bold">1. Stáhněte</span> KYC dotazník
                                    <br/><span class="d-inline-block font-weight-bold">2. Vyplňte</span> potřebné informace
                                    <br/><span class="d-inline-block font-weight-bold">3. Nahrajte</span> fotografii vyplněného <br/>KYC dotazníku
                                </p>
                                <h4 class="text-center font-weight-normal mb-4">
                                    Stáhněte <b-link class="font-weight-bold yellow-link" to="/static/documents/KYC-new.pdf" target="_blank">KYC dotazník</b-link>
                                </h4>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <!--hint="Podporované formáty: .pdf, .jpeg, .jpg, . png"-->
                                        <v-text-field
                                            :label="verification_kyc && 'Fotografie průkazu' || 'Fotografie průkazu'"
                                            v-model="verification_kyc"
                                            :error-messages="errors && errors.verification_kyc"
                                            :error="errors && !!errors.verification_kyc"
                                            disabled
                                        ></v-text-field>
                                        <p class="mini text-right mt-0">
                                            <file-upload
                                                input-id="KYCUpload"
                                                class="font-weight-bold yellow-link "
                                                extensions="gif,jpg,jpeg,png,pdf"
                                                accept="image/png,image/gif,image/jpeg,application/pdf"
                                                v-model="KYCFile"
                                                @input-filter="inputFilter"
                                                @input-file="inputKYCFile"
                                                ref="KYCUpload"
                                                :disabled="!profile.activation || !profile.verification_phone_ok || !profile.verification_ok"
                                            >
                                                Vybrat soubor
                                            </file-upload>
                                        </p>
                                    </div>
                                    <div class="col-sm-12">
                                        <h2 class="my-5 text-center">
                                            <button class="yellow-link" 
                                                :class="{'loading':pending}"
                                                :disabled="pending || !profile.activation || !profile.verification_phone_ok || !profile.verification_ok || !verification_kyc || !KYCFile[0] || !KYCFile[0].file"
                                            >
                                                Nahrát KYC
                                            </button>
                                        </h2>
                                    </div>
                                </div>
                            </v-form>
                            <div v-else-if="!profile.verification_kyc_ok && profile.verification_kyc" class="text-center">
                                <h4>KYC formulář byl nahrán!</h4>
                                <p class="mini mb-5">
                                    Odkaz na <b-link class="font-weight-bold yellow-link" :to="profile.verification_kyc" target="_blank">soubor</b-link>
                                </p>
                                <p class="mini">
                                    <small><span class="font-weight-bold">Soubor</span> byl úspěšně nahrán, ale zatím <span class="font-weight-bold">nebyl ověřen</span> moderátorem. Po úspěšném ověření souboru Vám <span class="font-weight-bold">zašleme upozornění emailem</span>, který jste uvedli při registraci.</small>
                                </p>
                            </div>
                            <div class="text-center" v-else>
                                <h4>KYC formulář byl úspěšně ověřen</h4>
                                <p class="mini mb-5">
                                    Odkaz na <b-link class="font-weight-bold yellow-link" :to="profile.verification_kyc" target="_blank">soubor</b-link>
                                </p>
                            </div>
                        </div>
                    </div>
                </b-collapse>
                
            </div>
        </div>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import HttpHelper from '../../helpers/http';
    import countryByCzech from '../../config/countryByCzech';
//    import PictureInput from 'vue-picture-input'
    import FileUpload from 'vue-upload-component'

    export default {
        data() {
            return {
                verify:{
                    isRegistered:'',
                    email:'',
                    hash:'',
                    code:0,
                    errors: null,
                },
                phone: {
                    number: '',
                    code:'',
                    code_sended: false,
                    isValid: false,
                    country: {},
                },
                pasport:{
                    address:'',
                    city:'',
                    country:'',
                    verification:{
                        front:'',
                        back:'',
                        address:'',
                    },
                    files:{
                        front:[],
                        back:[],
                        address:[],
                    },
                },
                limitFileSize: 2,
                
                pasportFile: [],
                KYCFile: [],
                
                verification_image: '',
                verification_kyc: '',
                
                errors:[],
                country: countryByCzech.country
            }
        },
        components: {
            FileUpload,
//            PictureInput,
        },
        computed: {
            ...mapGetters({
                pending: 'User/pending',
                profile: 'User/profile',
                limit: 'Exchange/limit',
            })
        },
        methods: {
            ...mapActions({
                getProfile: 'User/getProfile',
                updateProfile: 'User/updateProfile',
                VerificationEmail: 'User/VerificationEmail',
                ReVerificationEmail: 'User/ReVerificationEmail',
                sendPhoneCode: 'User/sendPhoneCode',
                VerificationPhoneCode: 'User/VerificationPhoneCode',
                VerificationPasport: 'User/VerificationPasport',
                VerificationKYC: 'User/VerificationKYC',
                getLimits: 'Exchange/getLimits',
            }),
            submitVerifyEmail: function (e) {
                e.preventDefault();
                this.VerificationEmail(this.verify.hash).then(response => {
                    this.verify.errors = [];
                    this.getUserProfile();
                }).catch(errors => {
                    this.verify.errors = errors.errors;
                });
            },
            ResendVerifyEmailCode(email) {
                this.ReVerificationEmail(email);
            },
            getUserProfile () {
                this.getProfile({include: 'roles'}).then(()=>{
                    if(this.profile.phone){ 
//                        this.phone.number = this.profile.phone;
//                        if(this.$refs.phoneNumberRef && this.profile.phone) this.$refs.phoneNumberRef.phone = this.profile.phone;
                    }
                    if(this.profile.address) this.pasport.address = this.profile.address;
                    if(this.profile.city) this.pasport.city = this.profile.city;
                    if(this.profile.country) this.pasport.country = this.profile.country;
                });
            },
            onInputPhone({ number, isValid, country}) {
                this.phone.isValid = isValid;
                this.phone.country = country;
            },
            sendVerificationPhoneCode() {
                this.sendPhoneCode(this.phone).then(response => {
                    this.phone.code_sended = true;
                    this.errors = [];
                }).catch(errors => {
                    this.errors = errors.data.errors;
                });
            },
            SubmitVerificationPhone() {
                this.VerificationPhoneCode(this.phone).then(response => {
                    if(response.data.data.success){
                        this.errors = [];
                        
                        this.updateProfile({
                            email: this.profile.email,
                            phone: this.phone.number,
                            verification_phone_ok: this.phone.isValid,
                        }).then(response => {
                            this.getUserProfile();
                        });
                    }else{
                        this.errors = response.data.data.errors;
                    }
                }).catch(errors => {
                    this.errors = errors.errors;
                });
            },

            SubmitVerificationPasport() {
                var fileFrontLength = this.pasport.files.front[0].size / 1024 / 1024;
                var fileBackLength = this.pasport.files.back[0].size / 1024 / 1024;
                var fileAddressLength = this.pasport.files.address[0].size / 1024 / 1024;
                
                this.errors = {};
                
                if(fileFrontLength > this.limitFileSize ) {
                    this.errors.verification_front = fileFrontLength.toFixed(3) +' Mb is more than max upload file size '+this.limitFileSize+' Mb';
                }
                if(fileBackLength > this.limitFileSize ) {
                    this.errors.verification_back = fileBackLength.toFixed(3) +' Mb is more than max upload file size '+this.limitFileSize+' Mb';
                }
                if(fileAddressLength > this.limitFileSize ) {
                    this.errors.verification_address = fileAddressLength.toFixed(3) +' Mb is more than max upload file size '+this.limitFileSize+' Mb';
                }
                
                if(this.errors.verification_front || this.errors.verification_back || this.errors.verification_address) return;
                
                this.VerificationPasport({
                    address: this.pasport.address,
                    city: this.pasport.city,
                    country: this.pasport.country,
                    verification_front: this.pasport.files.front[0].base64data,
                    verification_back: this.pasport.files.back[0].base64data,
                    verification_address: this.pasport.files.address[0].base64data
                }).then(response => {
                    this.getUserProfile();
                }).catch(errors => {
                    this.errors = errors.errors;
                });
            },
            SubmitVerificationKYC() {
                var fileLength = this.KYCFile[0].size / 1024 / 1024;
                
                if(fileLength > this.limitFileSize ) {
                    this.errors = {
                        verification_kyc: fileLength.toFixed(3) +' Mb is more than max upload file size '+this.limitFileSize+' Mb'
                    } 
                    return;
                }
                else this.errors = [];
                
                this.VerificationKYC(this.KYCFile[0].base64data).then(response => {
                    this.getUserProfile();
                }).catch(errors => {
                    this.errors = errors.errors;
                });
            },
            
            
            inputFilter(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                        return prevent()
                    }
                    if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                        return prevent()
                    }
                }
                
                // Create a blob field
                newFile.blob = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file);
        
                    var reader = new FileReader();
                    reader.readAsDataURL(newFile.file); 
                    reader.onloadend = function() {
                        newFile.base64data = reader.result;                
                    }
                }
            },
            inputFrontFile(newFile, oldFile) {
                if (newFile && !oldFile) {
                    // add
                    this.pasport.verification.front = newFile.name;
                }
                if (newFile && oldFile) {
                    // update
                    this.pasport.verification.front = newFile.name;
                }
                if (!newFile && oldFile) {
                    // remove
                }
            },
            inputBackFile(newFile, oldFile) {
                if (newFile && !oldFile) {
                    // add
                    this.pasport.verification.back = newFile.name;
                }
                if (newFile && oldFile) {
                    // update
                    this.pasport.verification.back = newFile.name;
                }
                if (!newFile && oldFile) {
                    // remove
                }
            },
            inputAddressFile(newFile, oldFile) {
                if (newFile && !oldFile) {
                    // add
                    this.pasport.verification.address = newFile.name;
                }
                if (newFile && oldFile) {
                    // update
                    this.pasport.verification.address = newFile.name;
                }
                if (!newFile && oldFile) {
                    // remove
                }
            },
            inputKYCFile(newFile, oldFile) {
                if (newFile && !oldFile) {
                    // add
                    this.verification_kyc = newFile.name;
                }
                if (newFile && oldFile) {
                    // update
                    this.verification_kyc = newFile.name;
                }
                if (!newFile && oldFile) {
                    // remove
                }
            },
        },
        mounted(){
            this.getUserProfile();
            this.getLimits({currency:'czk'});
        },
    }
</script>