<template>
    <UPage>
        <UPageHeader title="About" />
        <UPageBody>
            <UPageSection
                title="The Inspriation"
                icon="i-lucide-sparkles"
                orientation="horizontal">
                <template #description>
                    <p>Michael started to become interested in mixology around 2018. He intentionally works to expand his horizons and believed learning to make drinks would be a great skill to have when hosting others. This hobby only grew as he came into additional free time during 2020-2021.</p><br />
                    <p>Since then, he has made a habit of befriending bartenders at the restaurants and bars he patrons and asking for any recipes they may be able to provide. Betweens these gregariously acquired documents and his exploration into various recipe books and online articles, Michael has collected more resources than he ever believed possible.</p><br />
                    <p>Today, Michael continues to use these resources to curate custom, art-inspired menus for his guests to select from at his and his fiancée's monthly game nights.</p>
                </template>
                <UUser
                    class="items-center"
                    name="Michael McKinney"
                    description="Mixology and Arts Enthusiast"
                    orientation="vertical"
                    size="3xl">
                    <template #avatar>
                        <img
                            src="https://ugc.production.linktr.ee/fc35cfaf-a906-4e68-be45-0e6abe1cd58f_mmckwrites.jpeg"
                            alt="Image of Michael McKinney"
                            class="rounded-full size-48" />
                    </template>
                </UUser>
            </UPageSection>
            <USeparator class="justify-center" icon="i-lucide-handshake" size="sm" :ui="{ border: 'w-75' }" />
            <UPageSection
                title="The Development"
                icon="i-lucide-code"
                orientation="horizontal"
                reverse>
                <template #description>
                    <p>Amanda began exploring programming in her senior year of high school. She enjoyed the puzzle-solving aspect and opportunity to explore her creativity, so she went on to major in and graduate with a B.S. in Computer Science at UMass Amherst. Her first job brought her to North Carolina as a Software Developer at IBM</p><br />
                    <p>She met Michael in 2019, when he moved to North Carolina to live with his partner, who was also Amanda's friend. They quickly grew to become friends who would joke together and share interests. Michael had mentioned to Amanda his desire for an online catalog for easier searching through his vast collection of recipes, and would occasionally consult her on how he could develop his own.</p><br />
                    <p>In April 2026, Amanda was part of a Pendo layoff after 5 years of employment. She remembered Michael's desired project, and thought it the perfect opportunity to continue practicing and broadening her development skills. She reached out to Michael, who was more than eager to see what she would create, thus beginning the journey for the site seen today.</p>
                </template>
                <UUser
                    class="items-center"
                    name="Amanda Pellerite"
                    description="Senior Software Engineer"
                    orientation="vertical"
                    size="3xl">
                    <template #avatar>
                        <img
                            src="https://media.licdn.com/dms/image/v2/C4D03AQFBOD0VJ_7mkA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1553305786830?e=1780531200&v=beta&t=LT7t2V_D8qAEk6pPUUTWDxF55gS-5VCH0C4H29f7IYc"
                            alt="Image of Amanda Pellerite"
                            class="rounded-full size-48" />
                    </template>
                </UUser>
            </UPageSection>
            <UPageLogos title="Site created with the following tools:" :marquee="{ pauseOnHover: true }">
                <SimpleIconWrapper icon="vuedotjs" title="JavaScript Framework: Vue.js" class="dev-icon" />
                <SimpleIconWrapper icon="tailwindcss" title="CSS Framework: Tailwind CSS" class="dev-icon" />
                <SimpleIconWrapper icon="nuxt" title="Component Library: NuxtUI" class="dev-icon" />
                <SimpleIconWrapper icon="pinia" title="State Management: Pinia" class="dev-icon" />
                <SimpleIconWrapper icon="vite" title="Bundler: Vite" class="dev-icon" />
                <SimpleIconWrapper icon="lucide" title="Icons: Lucide" class="dev-icon" />
                <SimpleIconWrapper icon="simpleicons" title="Brand Icons: Simple Icons" class="dev-icon" />
                <SimpleIconWrapper icon="supabase" title="Development Platform: Supabase" class="dev-icon" />
                <SimpleIconWrapper icon="googlesheets" title="Data Formatter: Google Sheets" class="dev-icon" />
                <SimpleIconWrapper icon="github" title="Version Control: Github" class="dev-icon" />
                <SimpleIconWrapper icon="githubactions" title="Deployment: Github Actions" class="dev-icon" />
                <SimpleIconWrapper icon="npm" title="Package Management: npm" class="dev-icon" />
                <SimpleIconWrapper icon="claude" title="AI Agent Assistant: Claude" class="dev-icon" />
            </UPageLogos>
        </UPageBody>
    </UPage>
</template>