<template>
    <v-container>
        <v-form ref="profileForm" @submit.prevent="profileSave">
            <div class="row">
                <div class="col-md-3">
                    <picture-input
                        @change="onChangeAvatarImage"
                        ref="pictureInput"
                        :margin="pictureInput.margin"
                        :accept="pictureInput.accept"
                        :size="pictureInput.size"
                        :prefill="currentProfile.avatar_link"
                        :buttonClass="pictureInput.buttonClass.button"
                        :zIndex="pictureInput.zIndex"
                        :removeButtonClass="pictureInput.buttonClass.button"
                        :removable="pictureInput.removable"
                        :customStrings="pictureInput.customStrings"
                    >
                    </picture-input>
                </div>
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-6">
                            <v-text-field
                                label="Jméno"
                                v-model="currentProfile.name"
                                :disabled="pending"
                                :error-messages="errors && errors.name ? errors.name[0] : []"
                                :error="errors && !!errors.name"
                            ></v-text-field>
                        </div>
                        <div class="col-md-6">
                            <v-text-field
                                label="Příjmení"
                                v-model="currentProfile.family"
                                :disabled="pending"
                                :error-messages="errors && errors.family ? errors.family[0] : []"
                                :error="errors && !!errors.family"
                            ></v-text-field>
                        </div>
                        
                        <div class="col-md-12">
                            <v-text-field
                                label="Email"
                                v-model="currentProfile.email"
                                :disabled="pending"
                                required
                                :error-messages="errors && errors.email ? errors.email[0] : []"
                                :error="errors && !!errors.email"
                            ></v-text-field>
                        </div>
                        <div class="col-md-12">
                            <label style="margin-left: 20px;">Vaše tel. číslo</label>
                            <vue-tel-input ref="phoneNumberRef" class="mb-4"
                                :placeholder="currentProfile.phone && 'Vaše tel. číslo' || 'Zadejte Vaše tel. číslo'"
                                v-model="currentProfile.phone" 
                                :disabled="pending"
                                :error-messages="errors && errors.phone"
                                :error="errors && !!errors.phone"
                            >
                            </vue-tel-input>
                        </div>
                        <div class="col-md-12">
                            <v-text-field
                                label="Adresa"
                                v-model="currentProfile.address"
                                :disabled="pending"
                                :error-messages="errors && errors.address ? errors.address[0] : []"
                                :error="errors && !!errors.address"
                            ></v-text-field>
                        </div>
                        <div class="col-md-7">
                            <v-text-field
                                label="Město"
                                v-model="currentProfile.city"
                                :disabled="pending"
                                :error-messages="errors && errors.city ? errors.city[0] : []"
                                :error="errors && !!errors.city"
                            ></v-text-field>
                        </div>
                        <div class="col-md-5">
<!--                            <v-text-field
                                label="Stát"
                                v-model="currentProfile.country"
                                :disabled="pending"
                                :error-messages="errors && errors.country ? errors.country[0] : []"
                                :error="errors && !!errors.country"
                            ></v-text-field>-->
                            <v-select
                                v-model="currentProfile.country"
                                :items="country"
                                label="Stát"
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
                    </div>
                    
                    <h2 class="text-center mt-5">
                        <button class="yellow-link"
                            :class="{'loading':pending}"
                            :disabled="pending"
                        >
                            Uložit změny
                        </button>
                    </h2>
                </div>
            </div>
            
            
        </v-form>
    </v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AppConfig from '../../config/app';
    import HttpHelper from '../../helpers/http';
    import countryByCzech from '../../config/countryByCzech';
    import PictureInput from 'vue-picture-input';
    
    import HeaderComponent from '@/components/Layouts/Header.vue';
    import FooterComponent from '@/components/Layouts/Footer.vue';

    export default {
        data() {
            return {
                errors: [],
                pagination: {
                    include: 'roles'
                },
                pictureInput: AppConfig.pictureInput,
                currentProfile: {},
                avatarImageChanged: false,
                country: countryByCzech.country
            }
        },
        components: {
            PictureInput,
            HeaderComponent,
            FooterComponent,
        },
        mounted() {
            this.getUserProfile();
        },
        computed: {
            ...mapGetters('User', [
                'pending', 'profile'
            ])
        },
        methods: {
            ...mapActions('User', [
                'updateProfile', 'getProfile'
            ]),
            onChangeAvatarImage() {
            	this.avatarImageChanged = true;
            },
            getUserProfile () {
                this.getProfile(this.pagination).then(() => {
                    this.currentProfile = this.setCurrentProfile();
                    if(this.profile.phone) this.$refs.phoneNumberRef.phone = this.profile.phone;
                });
            },
            setCurrentProfile() {
              	return {
              	    name: this.profile.name,
                    family: this.profile.family,
                    email: this.profile.email,
                    phone: this.profile.phone,
                    address: this.profile.address,
                    city: this.profile.city,
                    country: this.profile.country,
                    
                    logo_64_base: '',
                    avatar_link: this.profile.avatar_link
                }
            },
            profileSave() {
                if (this.$refs.pictureInput.image && this.avatarImageChanged) this.currentProfile.logo_64_base = this.$refs.pictureInput.image;

                this.updateProfile(this.currentProfile).then(response => {
                    this.errors = [];
                    this.getUserProfile();
                    this.$router.push({path: '/profile/'});
                }).catch(errors => {
                    this.errors = errors;
                });
            }
        }
    }
</script>