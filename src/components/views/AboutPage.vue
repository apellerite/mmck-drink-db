<template>
    <UPage>
        <UPageHeader title="About" />
        <UPageBody>
            <UUser
                class="items-center"
                name="Michael McKinney"
                description="Mixology and arts enthusiast"
                orientation="vertical"
                size="3xl">
                <template #avatar>
                    <img
                        src="https://ugc.production.linktr.ee/fc35cfaf-a906-4e68-be45-0e6abe1cd58f_mmckwrites.jpeg"
                        alt="Image of Michael McKinney"
                        class="rounded-full size-[12rem]" />
                </template>
            </UUser>
        </UPageBody>
    </UPage>
</template>