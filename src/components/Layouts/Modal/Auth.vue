<template>
    <b-modal id="modal-auth" size="md" centered hide-header hide-footer>
        <v-form ref="formLogin" class="p-md-5" @submit.prevent="singIn">
            <h2 class="mb-md-5 text-center">Přihlášení</h2>
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
    </b-modal>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data () {
            return {
                auth:{
                    visiblePassword: true,
                    email:'',
                    password:'',
                    errors: [],
                },
            }
        },
        computed: {
            ...mapGetters('User', ['pending'])
        },
        methods: {
            ...mapActions('User', ['login', 'getProfile']),
            singIn() {
                this.login({email: this.auth.email, password: this.auth.password}).then(() => {
                    this.auth.errors = [];
                    this.getProfile({include: 'roles'}).then(() => {
                        this.$router.push({
                            name: 'main'
                        });
                    });
                })
                .catch(errors => {
                    this.auth.errors = errors.errors;
                    // Zadali jste neexistující email nebo špatné heslo
                });
            }
        }
    }
</script>


