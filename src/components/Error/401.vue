<template>
	<v-container grid-list-md text-xs-center class="error-container">
		<v-layout row wrap>
			<v-flex xs12 sm2 md2 class="hidden-md-and-down error-gif">
				<!--<img height="150px" src="../../../static/img/401.gif">-->
			</v-flex>
			<v-flex xs12 sm8 md8 class="error-title">
				<div class="display-1">401</div>
				<div class="subheading">
					You do not have permission to this page
				</div>
			</v-flex>

			<v-flex xs12 class="error-text">
				Ooops! Looks like we took a wrong turn somewhere. Please try going back to Dashboard, and if that doesn't help – click the 'Log Out' button below to relogin.
			</v-flex>

			<v-flex xs12 style="text-align: left">
				<v-btn
						color="blue-grey lighten-3"
						@click="singOut()"
						:loading="pending"
						:disabled="pending"
				>
					<span class="white--text">Log Out</span>
					<span slot="loader">Sending...</span>
				</v-btn>
				<v-btn
						color="teal lighten-1"
						@click="goBackToDashboard()"
						:loading="pending"
						:disabled="pending"
				>
					<span class="white--text">Dashboard</span>
					<span slot="loader">Sending...</span>
				</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters('User', [
                'pending'
            ])
        },
        methods: {
            ...mapActions('User', [
                'logout'
            ]),
            goBackToDashboard() {
                this.$router.push({
                    name: 'dashboard'
                });
            },
            singOut () {
                this.logout();
            }
        }
    }
</script>