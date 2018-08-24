<template>
    <b-modal ref="modalResetRef" id="modal-reset" size="md" centered hide-header hide-footer>
        <v-form ref="formReset" class="p-md-5" @submit.prevent="passwordReset" v-if="!reset.send">
            <h3 class="mb-md-5 text-center">Zapomněli jste heslo?</h3>
            <v-text-field
                    v-model="reset.email"
                    label="Email"
                    :error-messages="reset.errors && reset.errors.email ? reset.errors.email : []"
                    :error="reset.errors && !!reset.errors.email"
                    required
            ></v-text-field>

            <h2 class="mt-5 text-center">
                <button class="yellow-link" 
                    :class="{'loading':pending}"
                    :disabled="pending || !reset.email"
                >
                    Resetovat
                </button>
            </h2>
            
            <p class="mini text-center">
                <b-link v-b-modal.modal-auth class="font-weight-bold">Přihlaste se</b-link>
                <br/>nebo 
                <br/><b-link v-b-modal.modal-register class="font-weight-bold">se zaregistrujte</b-link>.
            </p>
        </v-form>
        <div class="p-md-5 text-center" v-else>
            <h2 class="mb-md-5 text-success">Skvěle!</h2>

            <p class="mini">
                Odeslali jsme vám na uvedenou adresu link, který vám umožní změnu vašeho hesla.
            </p>

            <h3 class="mt-5">
                <b-link class="yellow-link" @click="$refs.modalResetRef.hide()">
                    Ok, zavřít.
                </b-link>
            </h3>
        </div>
    </b-modal>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data () {
            return {
                reset:{
                    email:'',
                    errors: [],
                    send:false
                },
            }
        },
        computed: {
            ...mapGetters('User', ['pending'])
        },
        methods: {
            ...mapActions('User', ['resetPassword']),
            passwordReset() {
                this.resetPassword(this.reset.email).then(() => {
                    this.reset.errors = [];
                    this.reset.send = true;
                })
                .catch(errors => {
                    this.reset.errors = errors.errors;
                });
            }
        }
    }
</script>


