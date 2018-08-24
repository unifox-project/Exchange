<template>
    <b-modal ref="modalVerifyRef" size="md" centered hide-header hide-footer id="modal-verify">
        <div v-if="!isLogin & verify.isRegistered">
            <!--Verification Email After register-->
            <v-form ref="formVerifyEmail" class="p-md-4 p-3" @submit.prevent="submitVerifyEmail">
                <h2 class="mb-md-3 text-center">Verifikace</h2>

                <p class="mini mb-3 text-center">
                    <strong>Zkontrolujte si svůj email.</strong> Klikněte na aktivační odkaz nebo zkopírujte aktivační kód a <strong>pokračujte.</strong>
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
                    <b-link class="font-weight-bold" v-on:click="ResendVerifyEmailCode(verify.email)">Znovu zaslat</b-link>
                    aktivační kód
                </p>
            </v-form>
        </div>
        <div v-else-if="!isLogin">
            <!--Login Form-->
            <v-form ref="formLogin" class="p-md-4 p-3" @submit.prevent="singIn">
                <h2 class="mb-md-5 text-center">Verifikace</h2>
                
                <p class="mini mb-3 text-center">
                    Vstupní částka <strong>přesáhla limit</strong> a je <strong>vyžadováno přihlášení.</strong> 
                    Pokud účet nemáte, klikněte na <strong>Zaregistrujte se.</strong>
                </p>
                
                <v-text-field
                        v-model="auth.email"
                        label="Email"
                        :class="{'text-danger' : auth.errors && auth.errors.email}"
                        :error-messages="auth.errors && auth.errors.email ? auth.errors.email : []"
                        :error="auth.errors && !!auth.errors.email"
                        required
                ></v-text-field>
                <v-text-field
                        label="Heslo"
                        v-model="auth.password"
                        :class="{'text-danger' : auth.errors && auth.errors.password}"
                        :append-icon="auth.visiblePassword ? 'visibility_off' : 'visibility'"
                        :append-icon-cb="() => (auth.visiblePassword = !auth.visiblePassword)"
                        :type="auth.visiblePassword ? 'password' : 'text'"
                        required
                        :error-messages="auth.errors && auth.errors.password ? auth.errors.password : []"
                        :error="auth.errors && !!auth.errors.password"
                ></v-text-field>

                <p class="mini ml-4">
                    <b-link v-b-modal.modal-reset>Zapomněli jste heslo?</b-link>
                </p>

                <h2 class="mt-5 text-center">
                    <button class="yellow-link" 
                        :class="{'loading':pending}"
                        :disabled="pending || !auth.email || !auth.password"
                    >
                        Přihlásit se
                    </button>
                </h2>

                <p class="mini text-center">
                    Nemáte účet? 
                    <b-link v-b-modal.modal-register class="font-weight-bold">Zaregistrujte se.</b-link>
                </p>
            </v-form>
        </div>
        <div v-else>
            <!--Verification Email where Email not verified-->
            <v-form ref="formVerifyEmail" class="p-md-5 p-3" @submit.prevent="submitVerifyEmail" v-if="!profile.activation">
                <h2 class="mb-md-3 text-center">Verifikace</h2>

                <p class="mini mb-3 text-center">
                    <strong>Zkontrolujte si svůj email.</strong> Klikněte na aktivační odkaz nebo zkopírujte aktivační kód a <strong>pokračujte.</strong>
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
            <v-form ref="formVerifyPhone" class="p-md-5 p-3" @submit.prevent="" v-else-if="!profile.verification_phone_ok">
                <h2 class="mb-md-3 text-center">Verifikace</h2>

                <p class="mini mb-4 text-center">
                    Pro získání limitu směny <span class="d-inline-block font-weight-bold">{{limit[0] | currency}} - {{limit[1]-1 | currency}} Kč</span> 
                    potřebujeme <span class="font-weight-bold">ověřit</span> Vase <span class="font-weight-bold">telefonní číslo</span>
                </p>

                <v-form ref="PhoneForm" @submit.prevent="SubmitVerificationPhone">
                    <div class="row">
                        <div class="col-sm-12">
                            <vue-tel-input @onInput="onInputPhone" ref="phoneNumberRef"
                                :placeholder="phone.number && 'Vaše tel. číslo' || 'Zadejte Vaše tel. číslo'"
                                v-model="phone.number" 
                                :disabled="pending"
                                :error-messages="errors && errors.phone"
                                :error="errors && !!errors.phone"
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
                                :label="phone.code && 'Aktivační kód' || 'Zadejte aktivační kód'"
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
            </v-form>
            <v-form ref="formVerifyPassport" class="p-md-4 p-3" @submit.prevent="" v-else-if="!profile.verification_ok">
                <h2 class="mb-md-3 text-center">Verifikace</h2>
                
                <div v-if="profile.verification_front && profile.verification_back && profile.verification_address" class="text-center">
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
                    <p class="mini">
                        <small><span class="font-weight-bold">Soubor</span> byl úspěšně nahrán, ale zatím <span class="font-weight-bold">nebyl ověřen</span> moderátorem. Po úspěšném ověření souboru Vám <span class="font-weight-bold">zašleme upozornění emailem</span>, který jste uvedli při registraci.</small>
                    </p>
                </div>
                <v-form ref="PassortForm" @submit.prevent="SubmitVerificationPasport" v-else>
                    <p class="mini mb-5 text-center">
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
                            <v-text-field
                                label="Adresa"
                                v-model="pasport.address"
                                :disabled="pending"
                                :error-messages="errors && errors.address ? errors.address[0] : []"
                                :error="errors && !!errors.address"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-md-12">
                            <v-text-field
                                label="Město"
                                v-model="pasport.city"
                                :disabled="pending"
                                :error-messages="errors && errors.city ? errors.city[0] : []"
                                :error="errors && !!errors.city"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-md-12">
                            <v-select
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
            </v-form>
            <v-form ref="formVerifyKYC" class="p-md-5 p-3" @submit.prevent="" v-else-if="!profile.verification_kyc_ok">
                <h2 class="mb-md-3 text-center">Verifikace</h2>
                
                <div v-if="profile.verification_kyc" class="text-center">
                    <h4>KYC formulář byl nahrán!</h4>
                    <p class="mini mb-5">
                        Odkaz na <b-link class="font-weight-bold yellow-link" :to="profile.verification_kyc" target="_blank">soubor</b-link>
                    </p>
                    <p class="mini">
                        <small><span class="font-weight-bold">Soubor</span> byl úspěšně nahrán, ale zatím <span class="font-weight-bold">nebyl ověřen</span> moderátorem. Po úspěšném ověření souboru Vám <span class="font-weight-bold">zašleme upozornění emailem</span>, který jste uvedli při registraci.</small>
                    </p>
                </div>
                <v-form ref="KYCForm" @submit.prevent="SubmitVerificationKYC" v-else>
                    <p class="mini mb-4 text-center">
                        Pro pokračování <span class="d-inline-block font-weight-bold">vyplňte KYC dotazník.</span>
                    </p>
                    <p class="mini mb-4 text-center">
                        <span class="d-inline-block font-weight-bold">1. Stáhněte</span> KYC dotazník
                        <br/><span class="d-inline-block font-weight-bold">2. Vyplňte</span> potřebné informace
                        <br/><span class="d-inline-block font-weight-bold">3. Nahrajte</span> soubor s vyplněným
                        <br/>KYC dotazníkem
                    </p>

                    <h4 class="text-center font-weight-normal mb-4">
                        Stáhněte <b-link class="font-weight-bold yellow-link" to="/static/documents/KYC-new.pdf" target="_blank">KYC dotazník</b-link>
                    </h4>
                    
                        <div class="row">
                            <div class="col-sm-12">
                                <!--hint="Podporované formáty: .pdf, .jpeg, .jpg, .png"-->
                                <v-text-field
                                    :label="verification_kyc && 'KYC dotazník' || 'KYC dotazník'"
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
                                    >
                                        Vybrat soubor
                                    </file-upload>
                                </p>
                            </div>
                            <div class="col-sm-12">
                                <h2 class="my-5 text-center">
                                    <button class="yellow-link" 
                                        :class="{'loading':pending}"
                                        :disabled="pending || !verification_kyc || !KYCFile[0] || !KYCFile[0].file"
                                    >
                                        Nahrát KYC
                                    </button>
                                </h2>
                            </div>
                        </div>
                    </v-form>
            </v-form>
            <div class="text-center" v-else>
                <p>Gratulujeme!</p>
                <p class="font-weight-bold mini">Overili jsme vsechny potrebne udaje.</p>
                <p class="mb-5 mini">Nini muzete pokracovat vo vasi transakci</p>
                
                <h2 class="my-5 text-center">
                    <b-link class="yellow-link" @click="$refs.modalVerifyRef.hide()">Pokracovat</b-link>
                </h2>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    
    import FileUpload from 'vue-upload-component';
    import countryByCzech from '../../../config/countryByCzech';
    
    export default {
        data: () => ({
            auth:{
                visiblePassword: true,
                email:'',
                password:'',
                errors: [],
            },
            verify:{
                isRegistered:'',
                email:'',
                hash:'',
                code:0,
                errors: [],
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
        }),
        components: {
            FileUpload,
        },
        mounted(){
            this.$root.$on('bv::show::modal', this.showVerifyForm);
            this.$root.$on('setVerifyData', this.setVerifyData);
        },
        computed: {
            ...mapGetters({
                isLogin: 'User/isLogin',
                profile: 'User/profile',
                pending: 'User/pending',
                limit: 'Exchange/limit',
            })
        },
        methods: {
            ...mapActions('User', [
                'login','getProfile', 'updateProfile','VerificationEmail','ReVerificationEmail','sendPhoneCode', 'VerificationPhoneCode','VerificationPasport','VerificationKYC'
            ]),
            setVerifyData(data,isRegistered) {
                if(isRegistered){
                    if(data.email) this.verify.email = data.email;
                    this.verify.isRegistered = isRegistered;
                }
                
                if(data.verify_code) this.verify.code = data.verify_code;
            },
            showVerifyForm(form) {
                if('modal-verify'===form && this.isLogin) this.getUserProfile();
            },
            submitVerifyEmail: function (e) {
                e.preventDefault();
                this.VerificationEmail(this.verify.hash).then(response => {
                    this.verify.errors = [];
                    this.$refs.modalVerifyRef.hide();
                    this.$root.$emit('bv::show::modal','modal-auth');
                }).catch(errors => {
                    this.verify.errors = errors.errors;
                    // Nesprávný aktivační kód
                });
            },
            ResendVerifyEmailCode(email) {
                this.ReVerificationEmail(email);
            },
            singIn() {
                this.login({email: this.auth.email, password: this.auth.password}).then(() => {
                    this.auth.errors = [];
                    this.getUserProfile();
                })
                .catch(errors => {
                    this.auth.errors = errors.errors;
                });
            },
            getUserProfile () {
                this.getProfile({include: 'roles'}).then(() => {
                    if(this.profile.phone) this.phone.number = this.profile.phone;
                    
                    if(this.profile.address) this.pasport.address = this.profile.address;
                    if(this.profile.city) this.pasport.city = this.profile.city;
                    if(this.profile.country) this.pasport.country = this.profile.country;
//                    if(this.profile.verification_image) this.verification_image = this.profile.verification_image;

                     // test verification form
    //                this.profile.verification_phone_ok = false;
    //                this.profile.verification_ok = true;
    //                this.profile.verification_kyc_ok = true;
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
                    this.errors = errors.errors;
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
                    // Nesprávný formát čísla
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
                var fileLength = this.pasportFile[0].size / 1024 / 1024;
                
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
    }
</script>