<template>
    <div id="app" class="second-page" data-app="true">
        <header-component />

        <v-container mt-5 mb-5>
            <h2 class="mb-5">
                {{ this.$router.currentRoute.meta.h1 }}
            </h2>
            
            <div class="row">
                <div class="col-md-5">
                    <h3>
                        MUJPB s.r.o.
                    </h3>
                    <p class="mb-5">
                        Durďákova 336/29
                        <br/>613 00 Brno
                        <br/>IČ: 6957901
                    </p>
                    <p>
                        e-mail:
                        <a class="yellow-link" href="mailto:info@mujprvnibitcoin.cz">
                            info@mujprvnibitcoin.cz
                        </a>
                    </p>
                    <p>
                        tel:
                        <a class="yellow-link" href="tel:+420777423423">
                            +420 777 423 423
                        </a>
                    </p>
                    
                </div>
                <div class="col-md-7">
                    <h3>
                        Napište nám
                    </h3>
                    
                    <v-form ref="formContacts" @submit.prevent="sendFeedbackForm">
                        <v-text-field
                            v-model="contact.name"
                            :label="contact.name && 'Jméno' || 'Vaše jméno'"
                            :error-messages="contact.errors && contact.errors.name ? contact.errors.name : []"
                            :error="contact.errors && !!contact.errors.name"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="contact.email"
                            data-vv-name="email"
                            :label="contact.email && 'Email' || 'Váš email'"
                            :error-messages="contact.errors && contact.errors.email ? contact.errors.email : []"
                            :error="contact.errors && !!contact.errors.email"
                            required
                        ></v-text-field>
                        <v-text-field
                            :rules="[(v) => v.length <= 1500 || 'Max 1500 characters']"
                            :counter="1500"
                            v-model.lazy="contact.msg"
                            label="Zpráva"
                            :error-messages="contact.errors && contact.errors.msg ? contact.errors.msg : []"
                            :error="contact.errors && !!contact.errors.msg"
                            required
                            multi-line
                            rows="8"
                        ></v-text-field>
                        <h2 class="text-right">
                            <button class="yellow-link"
                                :class="{'loading':pending}"
                                :disabled="pending || !contact.name || !contact.email || !contact.msg || !messLength(1500)"
                            >
                                Odeslat
                            </button>
                        </h2>
                    </v-form>
                </div>
            </div>
        </v-container>
        <footer-component />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    
    import HeaderComponent from '@/components/Layouts/Header.vue';
    import FooterComponent from '@/components/Layouts/Footer.vue';

    export default {
        data: () => ({
            contact:{
                name:'',
                email:'',
                msg:'',
                errors: [],
            },
        }),
        components: {
            HeaderComponent,
            FooterComponent,
        },
        computed: {
            ...mapGetters({
                profile: 'User/profile',
                pending: 'Contacts/pending'
            }),
        },
        mounted() {
            this.setUserdata();
        },
        methods: {
            ...mapActions('Contacts', [
                'sendFeedback'
            ]),
            messLength(max){
                return this.contact.msg.length <= max || false;
            },
            setUserdata(){
                if(this.profile){
                    this.contact.name = this.profile.name;
                    this.contact.email = this.profile.email;
                }
            },
            sendFeedbackForm(){
                this.sendFeedback({
                    name: this.contact.name,
                    email: this.contact.email,
                    msg: this.contact.msg
                }).then((response) => {
                    this.contact.msg = '';
                    this.contact.errors = [];
                }).catch(errors => {
                    this.contact.errors = errors.errors;
                });
                
            }
        },
    }
</script>