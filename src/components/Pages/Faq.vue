<template>
    <div id="app" class="second-page faq-page" data-app="true">
        <header-component />

        <v-container mt-5 mb-5>
            <h2 class="mb-5">
                {{ this.$router.currentRoute.meta.h1 }}
            </h2>
            
            <div class="faq-section mb-5" v-for="cat in faqs">
                <h3 class="mb-4">
                    {{cat.name}}
                </h3>
                <div class="faq-answer">
                    <div class="faq-answer-item mb-4" v-for="faq in cat.list">
                        <h5 class="mb-4">
                            {{faq.ask}}
                        </h5>
                        <p class="mini" v-html="faq.answer"></p>
                    </div>
                </div>
            </div>
        </v-container>
        <footer-component />
    </div>
</template>

<script>
//     import { mapGetters, mapActions } from 'vuex';
    // import HeaderComponent from '@/components/Layouts/Header.vue';
    // import MobileComponent from '@/components/Layouts/Mobile.vue';
    // import DesktopComponent from '@/components/Layouts/Desktop.vue';
    // import NoAuthComponent from '@/components/Layouts/NoAuth.vue';

    import HeaderComponent from '@/components/Layouts/Header.vue';
    import FooterComponent from '@/components/Layouts/Footer.vue';

    export default {
        data: () => ({
            drawer: false,
            faqs:[
                {
                    name: 'Obecné otázky',
                    list:[
                        {
                            ask:'1. Co je Můjprvníbitcoin.cz účet a proč ho potřebuji?',
                            answer:'Díky účtu Můjprvníbitcoin.cz můžete spravovat veškerou svoji aktivitu v rozhraní svého účtu. V souladu s právním předpisy a platnou legislativou jsme povinni u speciální případů požadovat registraci a verifikaci účtu. Jedná se zejména o případy, kdy směňovaná částka přesahuje zákonný limit nebo je zvolená platební metoda, která toto dle smluvních podmínek přímo vyžaduje.'
                        },
                        {
                            ask:'2. Zapomněl jsem své heslo. Co mám dělat?',
                            answer:'Pokud jste zapomněli své heslo, stačí v sekci <span class="font-weight-bold">„LOGIN“</span> kliknout na tlačítko <span class="font-weight-bold">„Zapomněli jste heslo?“</span>. Následně Vám prostřednictvím emailové schránky doručíme zprávu, díky které si budete moci obnovit své heslo.<br/><br/>Pokud Vám nedorazila zpráva do emailové schránky, zkontrolujte, zda se Vaše zpráva nenachází ve spamu. Pokud jí nenaleznete ani ve spamu, kontaktujte prosím naší technickou podporu prostřednictvím <span class="font-weight-bold">chatu</span>.'
                        },
                        {
                            ask:'3. Funguje Vaše směnárna automaticky?',
                            answer:'Naše směnárna nyní funguje ve víceméně automatickém módu. Některé transakce jsou však z bezpečnostních důvodů potvrzovány manuálně.'
                        },
                        {
                            ask:'4. Jak Vás mohu kontaktovat?',
                            answer:'Pokud máte nějaké potíže s vaší transakcí nebo se nás chcete na něco zeptat, stačí nás kontaktovat prostřednictvím našeho <span class="font-weight-bold">chatu</span>, nebo nám můžete napsat email na: <a class="yellow-link" href="mailto:info@mujprvnibitcoin.cz">info@mujprvnibitcoin.cz</a>'
                        },
                    ]
                },
                {
                    name: 'Registrace a verifikace',
                    list:[
                        {
                            ask:'5. Jak se mohu zaregistrovat?',
                            answer:'Pro založení účtu přejděte na hlavní stránku a klikněte na tlačítko <span class="font-weight-bold">„REGISTRACE“</span>. Následně vyplňte veškeré potřebné údaje pro registraci, zadejte CAPTCHA a stisknutím tlačítka registraci potvrďte.'
                        },
                        {
                            ask:'6. Proč je výhodné se zaregistrovat?',
                            answer:'Díky registraci budete mít přehled o všech svých provedených transakcích, ale také dostanete možnost využívat speciální slevy a bonusy, které nejsou dostupné pro uživatele bez účtu.'
                        },
                        {
                            ask:'7. Jsem povinen se registrovat?',
                            answer:'Registrace účtu není povinná, avšak přijdete o veškeré slevy a bonusy v rámci svého účtu a také v některých zákonem stanovených případech ji můžeme během vyžádat.'
                        },
                        {
                            ask:'8. Proč musím provést verifikaci svého účtu?',
                            answer:'Verifikace účtu je potřeba v případě, že směňujete částku v hodnotě 1 000 EUR a výše nebo jednou z vybraných platebních metod je banka. Tyto opatření jsme povinni splňovat dle zákona, který se týká opatření proti legalizaci výnosů z trestné činnosti a financování terorismu (zákon o AML/CFT).'
                        },
                        {
                            ask:'9. Jak provést verifikaci svého účtu?',
                            answer:'Pro splnění verifikace svého účtu je třeba následovat instrukcím, které se zobrazí během směny částky se současnou registrací účtu. Verifikaci účtu je možné také provést později v sekci <span class="font-weight-bold">nastavení</span> a výběrem záložky aktuální limit.'
                        },
                    ]
                },
                {
                    name: 'Finance',
                    list:[
                        {
                            ask:'10. Jak mohu provést směnu?',
                            answer:'Na hlavní stránce zadejte, jakou měnu chcete nakoupit a jaký platební systém chcete uplatnit pro zaplacení transakce (jeden a ten samý platební systém může mít k dispozici více měn). V závislosti na vybraných parametrech bude třeba zadat další důležité údaje jako: číslo peněženky, bankovní informace nebo také kontaktní údaje.<br/><br/>Po vyplení všech údajů a dokončení zbylých kroků směny, vás automaticky přesměrujeme na stránku, kde budete moci sledovat stav vaší transakce.'
                        },
                        {
                            ask:'11. Jak dlouho trvá, než se vyřídí transakce?',
                            answer:'Vyřízení transakce trvá zpravidla 10 až 30 minut.'
                        },
                        {
                            ask:'12. Jak mohu zjistit stav své transakce?',
                            answer:'Pro zobrazení stavu vaší transakce se přihlaste ke svému účtu, klikněte v nabídce na položku <span class="font-weight-bold">„Historie transakcí“</span> a následně vyberte libovolnou transakci z uvedeného seznamu.'
                        },
                        {
                            ask:'13. Co mám dělat, pokud má transakce zůstává nevyřízena déle než 30 minut?',
                            answer:'Pokud se stav Vaší transakce nezmění během 30 minut, kontaktuje prosím technickou podporu prostřednictvím <span class="font-weight-bold">chatu</span> nebo nám napište na náš email: <a class="yellow-link" href="mailto:info@mujprvnibitcoin.cz">info@mujprvnibitcoin.cz</a>. Uveďte prosím ID transakce pro rychlejší vyřízení požadavku.'
                        },
                        {
                            ask:'14. Co je ID transakce a kde ho naleznu?',
                            answer:'ID transakce je unikátní číslo, které je přiřazeno každé uskutečněné transakci. Díky tomu můžeme sledovat stav jednotlivých transakcí a pomáhat při veškerých potížích. ID transakce naleznete v sekci „Transakce“. Stačí pak kliknout na libovolnou uskutečněnou transakci a hned se vám zobrazí její detail.'
                        },
                        {
                            ask:'15. Co když jsem odeslal částku na špatnou peněženku?',
                            answer:'Vzhledem k povaze protokolů digitální měny nemohou být transakce rušeny ani zpětně editovány. Za takové chyby nemůžeme být zodpovědní. Proto se prosím před odesláním částky ujistěte, že číslo zadané peněženky přesně odpovídá číslu peněženky příjemce.'
                        },
                    ]
                },
                {
                    name: 'Affiliate',
                    list:[
                        {
                            ask:'16. Co je affiliate odkaz?',
                            answer:'Váš affiliate odkaz je unikátní odkaz, který můžete zaslat vaším přátelům a známým jako pozvánku do naší směnárny.'
                        },
                        {
                            ask:'17. Co se stane, když někdo přijme moji pozvánku přes affiliate odkaz?',
                            answer:'Náš systém veškeré přijaté pozvánky přes váš odkaz zaznamená a automaticky vám přidělí provizi na základě veškerých směn, která daná osoba uskuteční. Kdykoliv můžete svojí provizní částku vybrat.'
                        },
                        {
                            ask:'18. Kde naleznu svůj affiliate odkaz?',
                            answer:'Pro nalezení affiliate odkazu je nejdříve potřeba, abyste se přihlásili. Následně si rozklikněte svůj účet, vyberte tlačítko <span class="font-weight-bold">„Pozvi přítele“</span> a zkopírujte vygenerovaný link pro zaslání svým přátelům a známým.'
                        },
                    ]
                },
            ]
        }),
        components: {
            HeaderComponent,
            FooterComponent,
        },
        // components: {
        //     HeaderComponent,
        //     MobileComponent,
        //     DesktopComponent,
        //     NoAuthComponent
        // },
//        computed: {
//            ...mapGetters('User', [
//                'isLogin', 'profile', 'pending'
//            ])
//        },
        // methods: {
        //     isErrorPage() {
        // 	return this.$router.currentRoute.meta.isErrorPage !== undefined && this.$router.currentRoute.meta.isErrorPage;
        //     }
        //}
    }

</script>