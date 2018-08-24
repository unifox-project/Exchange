<template>
    <div id="app" class="second-page" data-app="true">
        <header-component />

        <v-container mt-5 mb-5 news-container>
            <h2 class="mb-5">
                {{ this.$router.currentRoute.meta.h1 }}
            </h2>

            <div>
                <v-data-table
                    v-bind:items="News.items"
                    :pagination.sync="pagination"
                    :total-items="News.totalItems"
                    :rows-per-page-items="News.perPage"
                    no-data-text="Není k dispozici"
                    hide-headers
                    hide-actions
                >
                    <template slot="items" slot-scope="props">
                        <tr>
                            <td>
                                <div class="news-item">
                                    <h4 class="font-weight-bold mb-0">
                                        {{props.item.title}}
                                    </h4>
                                    <p class="mini font-weight-bold mt-0 mb-3" v-html="props.item.date">{{props.item.date}}</p>
                                    <p class="mini" v-html="props.item.text"></p>
                                </div>
                            </td>
                        </tr>
                    </template>
                </v-data-table>

                <div class="text-xs-center p-2 mb-3" v-if="News.items.length < News.totalItems">
                    <v-pagination v-model="pagination.page" :length="pagesListNews" :total-visible="7"></v-pagination>
                </div>
            </div>

        </v-container>
        <footer-component />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import AppConfig from '../../config/app';
    import HttpHelper from '../../helpers/http';
    
    import HeaderComponent from '@/components/Layouts/Header.vue';
    import FooterComponent from '@/components/Layouts/Footer.vue';

    export default {
        data: () => ({
            pagination: {},
            News: {
                items: [],
                totalItems: null,
                perPage: AppConfig.perPageNews,
            },
        }),
        components: {
            HeaderComponent,
            FooterComponent,
        },
        watch: {
            paginationNews(val, oldVal) {
                if (JSON.stringify(val) !== JSON.stringify(oldVal)) this.getListNews();
            }
        },
        computed: {
            ...mapGetters('News', [
                'pending', 'newsList', 'meta'
            ]),
            paginationNews() {
                return {
                    page: this.pagination.page || null,
                    limit: this.pagination.rowsPerPage || null,
                    sort: this.pagination.sortBy || null,
                    order: this.pagination.descending || null,
                };
            },
            pagesListNews () {
                if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;

                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
            },
        },
        methods: {
            ...mapActions('News', ['list']),
            getListNews() {
                this.list(HttpHelper.getPaginationParam(this.pagination)).then(response => {
                    this.News.items = this.newsList;
                    this.News.totalItems = this.meta.count ? this.meta.count : 0;
                }).catch(errors => {
                    this.errors = errors;
                });
            },
        },
    }

</script>