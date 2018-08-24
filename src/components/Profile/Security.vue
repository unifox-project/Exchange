<template>
    <v-container>

        <div class="row">
            <div class="col-md-10 offset-md-1">
                <h4 class="font-weight-normal text-center mb-5 title-lined">Poslední přihlášení</h4>
                
                <div class="login-logs-container">
                    <v-data-table
                        v-bind:headers="Logs.headers"
                        v-bind:items="Logs.Items"
                        :pagination.sync="pagination"
                        :total-items="Logs.totalItems"
                        :rows-per-page-items="Logs.perPage"
                        no-data-text="Není k dispozici"
                        hide-actions
                    >
                        <template slot="items" slot-scope="props">
                            <tr>
                                <td v-html="props.item.created_at"></td>
                                <td v-html="props.item.browser"></td>
                                <td v-html="props.item.ip"></td>
                                <td v-html="props.item.geo"></td>
                                <td class="text-right">
                                    <b-link @click="LoginRevoke(props.item.id)">
                                        <i v-if="props.item.active" class="material-icons red--text">
                                            clear
                                        </i>
                                    </b-link>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>

                    <div class="text-xs-center p-2 mb-3" v-if="Logs.Items.length>Logs.perPage[0]">
                        <v-pagination v-model="pagination.page" :length="pagesLoginLogs" :total-visible="7"></v-pagination>
                    </div>
                </div>
                
                
                <h4 class="font-weight-normal text-center mt-3 mb-5 title-lined">Zmena hesla</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <v-form ref="securityForm" @submit.prevent="updatePasswordSave">
                    <div class="row">
                        <div class="col-sm-12">
                            <v-text-field
                                :label="password.current_password && 'Zadejte staré heslo' || 'Zadejte staré heslo'"
                                v-model="password.current_password"
                                :disabled="pending"
                                :append-icon="password.visible ? 'visibility_off' : 'visibility'"
                                :append-icon-cb="() => (password.visible = !password.visible)"
                                :type="password.visible ? 'password' : 'text'"
                                :error-messages="password.errors && password.errors.current_password ? password.errors.current_password[0] : []"
                                :error="password.errors && !!password.errors.current_password"
                            ></v-text-field>
                        </div>
                        <div class="col-sm-12">
                            <v-text-field
                                :label="password.new_password && 'Zadejte nové heslo' || 'Zadejte nové heslo'"
                                v-model="password.new_password"
                                :disabled="pending"
                                :append-icon="password.visible ? 'visibility_off' : 'visibility'"
                                :append-icon-cb="() => (password.visible = !password.visible)"
                                :type="password.visible ? 'password' : 'text'"
                                :error-messages="password.errors && password.errors.new_password ? password.errors.new_password[0] : []"
                                :error="password.errors && !!password.errors.new_password"
                            ></v-text-field>
                        </div>
                        <div class="col-sm-12">
                            <v-text-field
                                :label="password.renew_password && 'Opakujte nové heslo' || 'Opakujte nové heslo'"
                                v-model="password.renew_password"
                                :disabled="pending"
                                :append-icon="password.visible ? 'visibility_off' : 'visibility'"
                                :append-icon-cb="() => (password.visible = !password.visible)"
                                :type="password.visible ? 'password' : 'text'"
                            ></v-text-field>
                        </div>
                    </div>

                    <h2 class="text-center mt-5">
                        <button class="yellow-link"
                            :class="{'loading':pending}"
                            :disabled="pending || !password.current_password  || !password.new_password || !password.renew_password || password.new_password!=password.renew_password"
                        >
                            Změnit heslo
                        </button>
                    </h2>
                </v-form>
            </div>
        </div>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import HttpHelper from '../../helpers/http';
    
    import HeaderComponent from '@/components/Layouts/Header.vue';
    import FooterComponent from '@/components/Layouts/Footer.vue';

    export default {
        data() {
            return {
                password:{
                    current_password:'',
                    new_password:'',
                    renew_password:'',
                    
                    visible: true,
                    errors: [],
                },
                Logs: {
                    headers: [
                        { text: 'Přihlášení', value: 'created_at', 'class':"font-weight-bold"},
                        { text: 'Prohlížeč', value: 'browser', 'class':"font-weight-bold"},
                        { text: 'IP adresa', value: 'ip', 'class':"font-weight-bold"},
                        { text: 'Místo', value: 'geo', 'class':"font-weight-bold"},
                        { text: 'Akce', value: 'active', 'class':"font-weight-bold", align:'right'}
                    ],
                    Items: [],
                    TotalItems: null,
                    perPage: [ 5, 10, 15, {text: 'All', value: -1} ],
                },
                pagination: {
                    sortBy: 'created_at',
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
                'pending', 'profile', 'loginLogsItems'
            ]),
            pagesLoginLogs () {
                if (this.pagination.rowsPerPage == null ||
                  this.pagination.totalItems == null
                ) return 0

                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
            }
        },

        methods: {
            ...mapActions('User', [
                'loginLogs', 'tokenRevoke', 'updatePassword', 'getProfile'
            ]),
            updatePasswordSave() {
                this.updatePassword({
                    current_password:this.password.current_password,
                    new_password:this.password.new_password,
                }).then(response => {
                    this.password.current_password = this.password.new_password = this.password.renew_password = '';
                    
                    this.password.errors = [];
                }).catch(errors => {
                    this.password.errors = errors.errors;
                });
            },
            getLoginLogs() {
                this.loginLogs().then(() => {
                    this.Logs.Items = this.loginLogsItems;
                    this.Logs.TotalItems = this.loginLogsItems.length;
                });
            },
            LoginRevoke(id) {
                this.tokenRevoke(id).then(response => {
                    this.getLoginLogs();
                });
            }
        },
        mounted() {
            this.getLoginLogs();
        },
    }
</script>