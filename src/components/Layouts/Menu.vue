<template>
    <b-navbar-nav class="mr-xl-5 mr-lg-0">
        <b-nav-item 
            v-for="item in $router.options.routes" 
            v-if="item.menu"
            :to="item.path"
            :key="item.meta.menuName"
            :class="{'': $route.name !== item.name, 'active': $route.name === item.name}"
        >
            {{ item.meta.menuName }}
        </b-nav-item>
    </b-navbar-nav>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data: () => ({
            drawer: false
        })
    }
</script>