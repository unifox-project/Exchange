<template>
    <b-modal size="lg" centered hide-header hide-footer id="modal-register">
        <v-form ref="formRegister" id="formRegister" class="p-md-5 mx-md-5" @submit.prevent="submitRegister">
            <h2 class="mb-md-5 text-center">Registrace</h2>
            <v-text-field
                    v-model="reg.email"
                    label="Váš email"
                    :error-messages="reg.errors && reg.errors.email ? reg.errors.email : []"
                    :error="reg.errors && !!reg.errors.email"
                    required
            ></v-text-field>
            <v-text-field
                    label="Zadejte heslo"
                    v-model="reg.password"
                    :append-icon="reg.visiblePassword ? 'visibility_off' : 'visibility'"
                    :append-icon-cb="() => (reg.visiblePassword = !reg.visiblePassword)"
                    :type="reg.visiblePassword ? 'password' : 'text'"
                    required
                    :error-messages="reg.errors && reg.errors.password ? reg.errors.password : []"
                    :error="reg.errors && !!reg.errors.password"
            ></v-text-field>
            <v-text-field
                    label="Zadejte heslo opakovaně"
                    v-model="reg.rePassword"
                    :append-icon="reg.visibleRePassword ? 'visibility_off' : 'visibility'"
                    :append-icon-cb="() => (reg.visibleRePassword = !reg.visibleRePassword)"
                    :type="reg.visibleRePassword ? 'password' : 'text'"
                    required
                    :error-messages="reg.errors && reg.errors.rePassword ? reg.errors.rePassword : []"
                    :error="reg.errors && !!reg.errors.rePassword"
            ></v-text-field>

            <p class="mini ml-4 text-danger" v-on:keyup.enter="singUp()" v-if="reg.password && reg.rePassword && reg.password!=reg.rePassword">
                Hesla se neshodují
            </p>
            <p class="mini text-left">
                Registrací souhlasíte s
            </p>
            <p class="mini text-left">
                <v-checkbox class="text-center" v-model="reg.terms" color="success" hide-details row="true" :error-messages="reg.errors && reg.errors.terms ? reg.errors.terms : []" :error="reg.errors && !!reg.errors.terms">
                    <b-link slot="label" class="font-weight-bold" to="/terms-and-condidtion/" target="_blank">Obchodními podmínkami</b-link>
                </v-checkbox>
                <v-checkbox class="text-center" v-model="reg.privacy" color="success" hide-details row="true" :error-messages="reg.errors && reg.errors.privacy ? reg.errors.privacy : []" :error="reg.errors && !!reg.errors.privacy">
                    <b-link slot="label" class="font-weight-bold" to="/privacy-policy/" target="_blank">Podmínkami ochrany osobních údajů</b-link>
                </v-checkbox>
            </p>
            
            <div class="text-center mt-4">
                <vue-recaptcha class="recaptcha"
                    ref="recaptcha"
                    @verify="onCaptchaVerified"
                    @expired="onCaptchaExpired"
                    sitekey="6Lcr010UAAAAAIJOV5sT8h773yR7RkPUE70Gismw"
                    >
                </vue-recaptcha>
                <div v-if='reg.errors && reg.errors.recaptchaToken'>
                    <div class="input-group__messages input-group__error red--text" v-for="er in reg.errors.recaptchaToken">{{er}}</div>
                </div>
            </div>
            
            <h2 class="mt-5 text-center">
                <button class="yellow-link"
                    :class="{'loading':pending}"
                    :disabled="pending || !reg.email || !reg.password || !reg.rePassword || reg.password!=reg.rePassword || !reg.recaptchaToken"
                >
                    Registrovat
                </button>
            </h2>
            <p class="mini text-center">
                Máte účet? 
                <b-link v-b-modal.modal-auth class="font-weight-bold">Přihlaste se.</b-link>
            </p>
        </v-form>
    </b-modal>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import VueRecaptcha from 'vue-recaptcha';
    
    export default {
        data: () => ({
            reg:{
                visiblePassword: true,
                visibleRePassword: true,
                errors: [],
                
                email:'',
                password:'',
                rePassword:'',
                recaptchaToken:'',
                
                terms:false,
                privacy:false,
                GDPR:false
            },
        }),
        components: {
            VueRecaptcha
        },
        computed: {
            ...mapGetters('User', ['pending'])
        },
        methods: {
            ...mapActions('User', ['register']),
            submitRegister: function () {
                this.register({
                    email: this.reg.email, 
                    password: this.reg.password, 
                    rePassword: this.reg.rePassword,
                    recaptchaToken: this.reg.recaptchaToken,
                    terms: this.reg.terms,
                    privacy: this.reg.privacy,
                    GDPR: this.reg.GDPR
                }).then((response) => {
                    // Генерируем событие на глобальном уровне
                    this.$root.$emit('setVerifyData', {email: this.reg.email}, 1);
                    
                    this.reg.email = '';
                    this.reg.password = '';
                    this.reg.rePassword = '';

                    this.$refs.recaptcha.reset();
                    this.reg.recaptchaToken = '';
                    
                    this.$root.$emit('bv::show::modal','modal-auth');
                })
                .catch(errors => {
                    this.reg.errors = errors.errors;
                    this.$refs.recaptcha.reset();
                    this.reg.recaptchaToken = '';
                });
            },
            onCaptchaVerified: function (recaptchaToken) {
                this.reg.recaptchaToken = recaptchaToken;
            },
            onCaptchaExpired: function () {
                this.$refs.recaptcha.reset();
            },
//            VerifyData: function () {
//                this.$root.$emit('setVerifyData', this.reg);
//            }
        },
    }
</script>