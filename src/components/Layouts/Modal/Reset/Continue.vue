<template>
    <b-modal ref="modalResetContinueRef" id="modal-reset-continue" size="md" centered hide-header hide-footer>
        <v-form ref="formConfirmReset" class="p-md-5" @submit.prevent="confirmPasswordReset">
            <h3 class="mb-md-5 text-center">Resetovat heslo?</h3>
            <v-text-field
                    label="Zadejte nové heslo"
                    v-model="reset.password"
                    :append-icon="visiblePassword ? 'visibility_off' : 'visibility'"
                    :append-icon-cb="() => (visiblePassword = !visiblePassword)"
                    :type="visiblePassword ? 'password' : 'text'"
                    required
                    :error-messages="errors && errors.password ? errors.password : []"
                    :error="errors && !!errors.password"
            ></v-text-field>
            <v-text-field
                    label="Zadejte heslo opakovaně"
                    v-model="reset.rePassword"
                    :append-icon="visiblePassword ? 'visibility_off' : 'visibility'"
                    :append-icon-cb="() => (visiblePassword = !visiblePassword)"
                    :type="visiblePassword ? 'password' : 'text'"
                    required
                    :error-messages="errors && errors.rePassword ? errors.rePassword : []"
                    :error="errors && !!errors.rePassword"
            ></v-text-field>
            <p class="mini ml-4 text-danger" v-if="reset.password && reset.rePassword && reset.password!=reset.rePassword">
                Hesla se neshodují
            </p>
            <h2 class="mt-5 text-center">
                <button class="yellow-link" 
                    :class="{'loading':pending}"
                    :disabled="pending || !reset.password || !reset.rePassword || reset.password!=reset.rePassword"
                >
                    Resetovat
                </button>
            </h2>
        </v-form>
    </b-modal>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data () {
            return {
                reset:{
                    hash:'',
                    password:'',
                    rePassword:'',
                },
                visiblePassword: true,
                errors: [],
            }
        },
        computed: {
            ...mapGetters('User', ['pending'])
        },
        methods: {
            ...mapActions('User', ['confirmResetPassword']),
            showResetForm(form) {
                if('modal-reset-continue'===form && sessionStorage.getItem('resetHash')){
                    this.reset.hash = sessionStorage.getItem('resetHash');
                }
            },
            confirmPasswordReset() {
                this.confirmResetPassword(this.reset).then(() => {
                    this.errors = [];
                    this.$root.$emit('bv::show::modal','modal-auth');
                    sessionStorage.removeItem('resetHash');
                })
                .catch(errors => {
                    this.errors = errors.errors;
                });
            }
        },
        mounted: function () {
            this.$root.$on('bv::show::modal', this.showResetForm);
        }
    }
</script>


