import access from '../config/access'
import AuthGuard from '../router/guard'

export default [
    {
        path: '/',
        name: 'main',
        component: () => import('@/components/Pages/Main'),
        meta: {
            role: [
                access.user
            ],
            title: 'Nakupujte a prodávejte Bitcoiny snadno a bezpečně.',
            h1: 'Směnárna',
            menuName: 'Směnárna',
            menuIcon: 'mdi-view-main',
            metaTags: [
                {
                    name: 'description',
                    content: 'The about page of our example app.'
                },
                {
                    property: 'og:description',
                    content: 'The about page of our example app.'
                }
            ]
        },
        menu: true
    },
    {
        path: '/news/',
        name: 'news',
        component: () => import('@/components/Pages/News'),
        meta: {
            role: [
                access.user
            ],
            title: 'Novinky',
            h1: 'Novinky',
            menuName: 'Novinky',
            menuIcon: 'mdi-view-news'
        },
        menu: true
    },
    {
        path: '/faq/',
        name: 'faq',
        component: () => import('@/components/Pages/Faq'),
        meta: {
            role: [
                access.user
            ],
            title: 'FAQ',
            h1: 'Často klazené otázky',
            menuName: 'FAQ',
            menuIcon: 'mdi-view-faq'
        },
        menu: true
    },
    {
        path: '/contacts/',
        name: 'contacts',
        component: () => import('@/components/Pages/Contacts'),
        meta: {
            role: [
                access.user
            ],
            title: 'Kontakt',
            h1: 'Kontakt',
            menuName: 'Kontakt',
            menuIcon: 'mdi-view-contacts'
        },
        menu: true
    },
    {
        path: '/profile/',
        component: () => import('@/components/Pages/Profile'),
        beforeEnter: AuthGuard,
        menu: false,
        children: [
            {
                path: '/profile/',
                name: 'profile',
                component: () => import('@/components/Profile/Main'),
                beforeEnter: AuthGuard,
                meta: {
                    role: [
                        access.user
                    ],
                    title: 'Nastavení profilu'
                },
            },
            {
                path: 'edit',
                name: 'edit',
                component: () => import('@/components/Profile/Edit'),
                beforeEnter: AuthGuard,
                meta: {
                    role: [
                        access.user
                    ],
                    title: 'Nastavení profilu'
                }, 
            },
            {
                path: 'limit',
                name: 'limit',
                component: () => import('@/components/Profile/Limit'),
                beforeEnter: AuthGuard,
                meta: {
                    role: [
                        access.user
                    ],
                    title: 'Nastavení profilu'
                }
            },
            {
                path: 'security',
                name: 'security',
                component: () => import('@/components/Profile/Security'),
                beforeEnter: AuthGuard,
                meta: {
                    role: [
                        access.user
                    ],
                    title: 'Nastavení profilu'
                }
            },
        ]
    },
    {
        path: '/activation/:hash',
        name: 'activation',
        component: () => import('@/components/Profile/Activation'),
//        beforeEnter: AuthGuard,
        meta: {
            role: [
                access.user
            ],
            title: 'Aktivace',
            h1: 'Aktivace',
            menuName: 'Aktivace',
            menuIcon: 'mdi-view-activation'
        },
        menu: false
    },

    {
        path: '/transactions/',
        component: () => import('@/components/Pages/Transactions'),
        meta: {
            role: [
                access.user
            ],
            title: 'Historie transakcí',
            h1: 'Historie transakcí',
        },
        children: [
            {
                path: '/transactions/',
                name: 'transactions',
                component: () => import('@/components/Transactions/List'),
                beforeEnter: AuthGuard,
                meta: {
                    role: [
                        access.user
                    ],
                    title: 'Historie transakcí',
                },
            },
            {
                path: ':transactionHash',
                name: 'transaction',
                component: () => import('@/components/Transactions/Transaction'),
                meta: {
                    role: [
                        access.user
                    ],
                    title: 'Detail transakce'
                }
            },
        ],
        menu: false
    },

    {
        path: '/invite/',
        name: 'invite',
        component: () => import('@/components/Profile/Invite'),
        beforeEnter: AuthGuard,
        meta: {
            role: [
                access.user
            ],
            title: 'Pozvi přítele',
            h1: 'Pozvi přítele',
            menuName: 'Pozvi přítele',
        },
        menu: false
    },
    {
        path: '/join/:hex',
        name: 'join',
        component: () => import('@/components/Profile/Join'),
        meta: {
            role: [
                access.user
            ],
            title: 'join',
            h1: 'join',
            menuName: 'join',
        },
        menu: false
    },
    
    {
        path: '/partners/',
        name: 'partners',
        component: () => import('@/components/Pages/Partners'),
        meta: {
            role: [
                access.user
            ],
            title: 'Staňte se partnerem',
            h1: 'Staňte se partnerem',
            menuName: 'Staňte se partnerem',
        },
        menu: false
    },
    
    {
        path: '/discounts/',
        name: 'discount',
        component: () => import('@/components/Pages/Discount'),
        meta: {
            role: [
                access.user
            ],
            title: 'Slevový program',
            h1: 'Slevový program',
            menuName: 'Sleva',
        },
        menu: false
    },
    
    {
        path: '/fees/',
        name: 'fees',
        component: () => import('@/components/Pages/Fees'),
        meta: {
            role: [
                access.user
            ],
            title: 'Poplatky',
            h1: 'Poplatky',
            menuName: 'Poplatky',
        },
        menu: false
    },
    {
        path: '/terms-and-condidtion/',
        name: 'terms',
        component: () => import('@/components/Pages/Terms/Terms'),
        meta: {
            role: [
                access.user
            ],
            title: 'Obchodními podmínki',
            h1: 'Obchodními podmínki',
            menuName: 'Obchodními podmínki',
        },
        menu: false
    },
    {
        path: '/privacy-policy/',
        name: 'privacy',
        component: () => import('@/components/Pages/Terms/Privacy'),
        meta: {
            role: [
                access.user
            ],
            title: 'Podmínki ochrany osobních údajů',
            h1: 'Podmínki ochrany osobních údajů',
            menuName: 'Podmínki ochrany osobních údajů',
        },
        menu: false
    },
//    {
//        path: '/gdpr-rules/',
//        name: 'gdpr',
//        component: () => import('@/components/Pages/Terms/GDPR'),
//        meta: {
//            role: [
//                access.user
//            ],
//            title: 'Podmínki GDPR',
//            h1: 'Podmínki GDPR',
//            menuName: 'Podmínki GDPR',
//        },
//        menu: false
//    },
    
    {
        path: '/reset/:hash',
        name: 'reset',
        component: () => import('@/components/Profile/Reset'),
        meta: {
            role: [
                access.user
            ],
            title: 'reset',
            h1: 'reset',
            menuName: 'reset',
        },
        menu: false
    },

    {
        path: '*',
        name: '404',
        component: () => import('@/components/Error/404'),
        meta: {
            role: [
                access.admin,
                access.operator
            ],
            title: 'Not Found',
            isErrorPage: true
        },
        menu: false,
    },
    {
        path: '/401',
        name: '401',
        template: null,
        component: () => import('@/components/Error/401'),
        meta: {
            role: [
                access.admin,
                access.operator
            ],
            title: 'Access Denied',
            isErrorPage: true
        },
        menu: false
    },
    {
        path: '/500',
        name: '500',
        template: null,
        component: () => import('@/components/Error/500'),
        meta: {
            title: 'System Error in Server',
            isErrorPage: true
        },
        menu: false
    }
]
