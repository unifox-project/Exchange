<template>
    <v-app id="inspire">
        <div v-if="isErrorPage()" class="errors-container" style="margin: 20px">
            <router-view />
        </div>
        <div v-else>
            <div class="app-content" v-if="isLogin">
                <header-component/>

                <mobile-component/>
                <desktop-component/>
            </div>

            <div :class="{'footer blue-grey--text text--lighten-2': isLogin, 'footer teal darken-1': !isLogin}">
                Copyright {{ new Date().getFullYear() }}, Smartex
            </div>
        </div>
    </v-app>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import HeaderComponent from '@/components/Dashboard/Blocks/Header.vue';
    
    import MobileComponent from '@/components/Dashboard/Blocks/Mobile.vue';
    import DesktopComponent from '@/components/Dashboard/Blocks/Desktop.vue';

    export default {
        data: () => ({
            drawer: false,
            offsetTop: 50
        }),
        components: {
            HeaderComponent,
//            MenuComponent,
            MobileComponent,
            DesktopComponent,
        },
        computed: {
            ...mapGetters('User', [
                'isLogin', 'profile', 'pending'
            ])
        },
        methods: {
            isErrorPage() {
                return this.$router.currentRoute.meta.isErrorPage !== undefined && this.$router.currentRoute.meta.isErrorPage;
            },
            onScroll (e) {
                this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
            }
        }
	}
</script>

<style>
	#inspire {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		background-color: white !important;
	}
	#inspire .app-content {
		min-height: calc(100vh - 70px);
	}
	#inspire .card--flex-toolbar {
		margin-top: 15px;
	}
	#inspire .menu .user-menu {
		margin-top: -2px;
		height: 50px !important
	}
	#inspire .fio {
		margin-left: 10px;
		font-size: 11px;
	}
	#inspire .role {
		margin-left: 10px;
		font-size: 7px;
	}
	#inspire .fr-element ul, ol {
		padding-left: 30px;
	}
	#inspire div.fr-element .fr-view {
		padding-left: 40px;
	}
	#inspire .dialog--fullscreen .toolbar__content, .dialog--fullscreen form {
		max-width: 1300px !important;
		padding: 0px 9px !important;
		margin: 0px auto !important;
		position: relative;
	}
	#inspire .pending {
		height: 5px;
		position: absolute !important;
		top: 0;
		margin-top: 58px !important;
	}
	#inspire a.breadcrumbs-link {
		text-decoration: none;
	}
	#inspire .table-list-data {
		cursor: pointer;
		font-size: 14px !important;
	}
	#inspire .table-list-actions {
		float: right;
	}
	#inspire .clear-filter-button {
		float: right;
		margin: -20px 0 0 0 !important;
	}
	#inspire .footer {
		width: 100%;
		padding: 50px;
		height: 50px;
		background: rgba(14,14,14,0.95);
		background-color: white !important;
		justify-content: center;
	}
	#inspire .error-container {
		max-width: 600px !important;
		padding: 0px 9px !important;
		margin: 50px auto !important;
		position: relative;

	}
	#inspire .errors-container {
		padding: 20px;
	}
	#inspire .error-container .error-gif {
		text-align: right
	}
	#inspire .error-container .error-title {
		text-align: left;
		margin-top: 20px
	}
	#inspire .error-container .error-text {
		text-align: justify;
		margin-top: 20px
	}
        
        
        
        
        #inspire .flex-menu-container {
		height: 100%;
		width: 100%;
	}
	#inspire .flex-menu-container .fixed {
		position: fixed;
		min-width: 207px !important;
		z-index: 100;
		top: 0;
		margin-top: 5px;
		/*margin-right: 4px;*/
	}
	#inspire .flex-menu-container .card {
		min-width: 207px !important;
	}
/*	#inspire .desktop-container {
		max-width: 1300px !important;
		padding: 0px 9px !important;
		margin: 0px auto !important;
		position: relative;
	}*/
</style>
