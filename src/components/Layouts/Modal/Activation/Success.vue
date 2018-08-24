<template>
    <b-modal ref="modalActivationSuccessRef" id="modal-activation-success" size="md" centered hide-header hide-footer>
        <div  class="p-md-3 text-center">
            <h2 class="mb-md-5">Aktivace</h2>

            <p class="text-success">
                Váš účet byl úspěšně aktivován
            </p>
            
            <h4 class="mt-5">
                <b-link v-if="!isLogin" v-b-modal.modal-auth class="yellow-link font-weight-bold">Přihlaste se.</b-link>
                <b-link v-else class="yellow-link" @click="$refs.modalActivationSuccessRef.hide()">
                    Zavřít.
                </b-link>
            </h4>
            <p class="mini mt-3" v-if="!isLogin">
                <b-link class="font-weight-bold" @click="$refs.modalActivationSuccessRef.hide()">
                    Zavřít.
                </b-link>
            </p>
        </div>
    </b-modal>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        data: () => ({}),
        computed: {
            ...mapGetters('User', [
                'isLogin'
            ])
        },
    }
</script>


