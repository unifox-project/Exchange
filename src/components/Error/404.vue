<template>
    <div class="error-page">
	<v-container grid-list-md text-xs-center class="error-container py-5 text-center">
		<v-layout row wrap>
			<v-flex xs12 sm2 md2 class="hidden-md-and-down error-gif">
				<!--<img height="150px" src="../../../static/img/401.gif">-->
			</v-flex>
			<v-flex xs12 sm8 md8 class="error-title">
				<h1 class="display-1">404</h1>
				<h3 class="subheading">
					This is Not the Page You're Looking For
				</h3>
			</v-flex>

			<v-flex xs12 class="error-text">
                            Ooops! Looks like we took a wrong turn somewhere. 
                            <br/>Please try going back to Dashboard, and if that doesn't help – click the 'Log Out' button below to relogin.
			</v-flex>

<!--			<div class="my-5">
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
			</div>-->
		</v-layout>
	</v-container>
    </div>
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