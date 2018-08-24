<template>
    <b-modal ref="modalActivationFailRef" id="modal-activation-fail" size="md" centered hide-header hide-footer>
        <div  class="p-md-3 text-center">
            <h2 class="mb-md-5 text-danger">Něco nevyšlo!</h2>

            <p class="mini">
                {{fail.message}}
            </p>

            <h3 class="mt-5">
                <b-link class="yellow-link" @click="$refs.modalActivationFailRef.hide()">
                    Ok, zavřít.
                </b-link>
            </h3>
        </div>
    </b-modal>
</template>

<script>
    export default {
        data: () => ({
            fail:{
                message:''
            }
        }),
        mounted: function () {
            this.fail.message = sessionStorage.getItem('activationFail') || '';
        }
    }
</script>


