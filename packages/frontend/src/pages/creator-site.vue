<template>
	<MkSpacer :contentMax="980">
		<div :class="$style.root" :style="pageStyle">
			<section :class="$style.hero">
				<div :class="$style.heroOverlay">
					<p :class="$style.badge">活動ページ</p>
					<h1 :class="$style.title">{{ siteTitle }}</h1>
<p :class="$style.catch">
	{{ siteCatchphrase }}
</p>

<div :class="$style.heroActions">
<a :class="[$style.creatorButton, $style.creatorButtonPrimary]" href="#links">リンクを見る</a>
<a :class="$style.creatorButton" href="#guideline">ガイドライン</a>
<a v-if="isMySite" :class="$style.creatorButton" :href="editPath">活動ページを編集</a>
</div>
				</div>
			</section>

			<section :class="$style.profileCard">
<img
	v-if="user?.avatarUrl"
	:class="$style.avatarImage"
	:src="user.avatarUrl"
	alt=""
>
<div v-else :class="$style.avatar">🎧</div>

<div>
	<p :class="$style.label">Creator</p>
	<h2 :class="$style.profileName">{{ displayName }}</h2>
	<p :class="$style.acct">@{{ acct }}</p>
	<p :class="$style.profileText">
		{{ user?.description || 'このユーザーの自己紹介はまだ設定されていません。' }}
	</p>
</div>				
			</section>

                        <section v-if="site?.extendedProfile" :class="$style.panel">
                                <p :class="$style.label">Profile</p>
                                <h2 :class="$style.sectionTitle">詳しいプロフィール</h2>
                                <p :class="$style.bodyText">
                                        {{ site.extendedProfile }}
                                </p>
                        </section>

			<div :class="$style.grid">
				<section :class="$style.panel">
					<p :class="$style.label">Status</p>
					<h2 :class="$style.sectionTitle">現在の活動状況</h2>
					<div :class="$style.statusList">
						<div :class="$style.statusItem">
							<span>依頼受付</span>
							<strong>{{ site?.commissionStatus || '受付中' }}</strong>
						</div>
						<div :class="$style.statusItem">
							<span>コラボ</span>
							<strong>{{ site?.collabStatus || '相談OK' }}</strong>
						</div>
						<div :class="$style.statusItem">
							<span>ファンアート</span>
							<strong>{{ site?.fanartStatus || '歓迎' }}</strong>
						</div>
					</div>
				</section>

                                <section :class="$style.panel">
                                        <p :class="$style.label">News</p>
                                        <h2 :class="$style.sectionTitle">お知らせ</h2>

                                        <div v-if="newsItems.length > 0" :class="$style.newsList">
                                                <article
                                                        v-for="(item, index) in newsItems"
                                                        :key="index"
                                                        :class="$style.newsItem"
                                                >
                                                        <h3 :class="$style.newsTitle">
                                                                {{ item.title || 'お知らせ' }}
                                                        </h3>
                                                        <p v-if="item.text" :class="$style.bodyText">
                                                                {{ item.text }}
                                                        </p>
                                                </article>
                                        </div>

                                        <p v-else :class="$style.bodyText">
                                                現在お知らせはありません。
                                        </p>
                                </section>
			</div>

<section id="links" :class="$style.panel">
	<p :class="$style.label">Links</p>
	<h2 :class="$style.sectionTitle">活動リンク</h2>
	<div :class="$style.linkGrid">
		<a :class="$style.creatorButton" :href="profilePath">
			プロフィール
		</a>
		<a :class="$style.creatorButton" :href="`${profilePath}/notes`">
			ノート
		</a>
		<a :class="$style.creatorButton" :href="`${profilePath}/pages`">
			Pages
		</a>
		<a :class="$style.creatorButton" :href="`${profilePath}/gallery`">
			ギャラリー
		</a>
                <a
                        v-for="(link, index) in customLinks"
                        :key="index"
                        :class="$style.creatorButton"
                        :href="link.url"
                        target="_blank"
                        rel="noopener noreferrer"
                >
                        {{ link.label }}
                </a>
	</div>
</section>

			<section id="guideline" :class="$style.panel">
				<p :class="$style.label">Guideline</p>
				<h2 :class="$style.sectionTitle">ガイドライン</h2>
<p :class="$style.bodyText">
	{{ site?.guidelineText || 'ガイドラインはまだ設定されていません。' }}
</p>

<a
	v-if="site?.guidelineUrl"
	:class="$style.creatorButton"
	:href="site.guidelineUrl"
	target="_blank"
	rel="noopener noreferrer"
>
	ガイドラインを開く
</a>
			</section>
                        <section :class="$style.reportPanel">
                                <p :class="$style.reportText">
                                        この活動ページに問題がある場合は、対象ユーザーのプロフィールから通報できます。
                                </p>

                                <a
                                        v-if="user"
                                        :class="$style.reportButton"
                                        :href="`${profilePath}`"
                                >
                                        プロフィールを開いて通報する
                                </a>
                        </section>
		</div>
	</MkSpacer>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import * as Misskey from 'misskey-js';
import { misskeyApi } from '@/utility/misskey-api.js';
import { $i } from '@/i.js';

const props = defineProps<{
	acct?: string;
}>();

const acct = computed(() => {
	return props.acct?.replace(/^@/, '') ?? 'unknown';
});

const user = ref<Misskey.entities.UserDetailed | null>(null);

type CreatorSite = {
	id: string;
	userId: string;
	title: string | null;
	catchphrase: string | null;
        extendedProfile: string | null;
	commissionStatus: string | null;
	collabStatus: string | null;
	fanartStatus: string | null;
	guidelineUrl: string | null;
	guidelineText: string | null;
        newsTitle1: string | null;
        newsText1: string | null;
        newsTitle2: string | null;
        newsText2: string | null;
        newsTitle3: string | null;
        newsText3: string | null;
        themeColor: string | null;
        linkLabel1: string | null;
        linkUrl1: string | null;
        linkLabel2: string | null;
        linkUrl2: string | null;
        linkLabel3: string | null;
        linkUrl3: string | null;
	createdAt: string;
	updatedAt: string;
};

const site = ref<CreatorSite | null>(null);

const displayName = computed(() => {
	return user.value?.name || acct.value;
});

const siteTitle = computed(() => {
	return site.value?.title || `${displayName.value} official site`;
});

const siteCatchphrase = computed(() => {
	return site.value?.catchphrase || '活動内容やお知らせ、ガイドラインなどをまとめる活動者向けページです。';
});

const profilePath = computed(() => {
	return `/@${acct.value}`;
});

const isMySite = computed(() => {
	return $i != null && user.value != null && $i.id === user.value.id;
});

const editPath = computed(() => {
	return `/settings/creator-site`;
});

const siteThemeColor = computed(() => {
        const color = site.value?.themeColor;

        if (color == null || !/^#[0-9a-fA-F]{6}$/.test(color)) {
                return null;
        }

        return color;
});

const pageStyle = computed(() => {
        if (siteThemeColor.value == null) {
                return {};
        }

        return {
                '--creator-site-theme-color': siteThemeColor.value,
        };
});

const customLinks = computed(() => {
        return [
                {
                        label: site.value?.linkLabel1,
                        url: site.value?.linkUrl1,
                },
                {
                        label: site.value?.linkLabel2,
                        url: site.value?.linkUrl2,
                },
                {
                        label: site.value?.linkLabel3,
                        url: site.value?.linkUrl3,
                },
        ].filter((item) => {
                return item.label != null && item.url != null;
        });
});

const newsItems = computed(() => {
        return [
                {
                        title: site.value?.newsTitle1,
                        text: site.value?.newsText1,
                },
                {
                        title: site.value?.newsTitle2,
                        text: site.value?.newsText2,
                },
                {
                        title: site.value?.newsTitle3,
                        text: site.value?.newsText3,
                },
        ].filter((item) => {
                return item.title != null || item.text != null;
        });
});

async function fetchUser(): Promise<void> {
	user.value = null;
	site.value = null;

	if (props.acct == null) return;

	const normalizedAcct = props.acct.replace(/^@/, '');
	const [username, host] = normalizedAcct.split('@');

	try {
		const res = await misskeyApi('users/show', {
			username,
			host: host || null,
		});

		user.value = res;

		site.value = await misskeyApi('creator-site/show', {
			userId: res.id,
		});
	} catch {
		user.value = null;
		site.value = null;
	}
}

watch(() => props.acct, fetchUser, {
	immediate: true,
});
</script>

<style lang="scss" module>
.root {
        --creator-site-accent: var(--creator-site-theme-color, var(--MI_THEME-accent));
        --creator-site-accent-soft: color-mix(in srgb, var(--creator-site-accent) 14%, transparent);
        --creator-site-accent-softer: color-mix(in srgb, var(--creator-site-accent) 7%, transparent);

        display: flex;
        flex-direction: column;
        gap: 18px;
        padding: 24px 0 40px;
}

.hero {
        overflow: hidden;
        border-radius: 28px;
        background:
                radial-gradient(circle at top left, color-mix(in srgb, var(--creator-site-accent) 38%, transparent), transparent 34%),
                radial-gradient(circle at bottom right, color-mix(in srgb, var(--creator-site-accent) 18%, transparent), transparent 38%),
                linear-gradient(135deg, var(--MI_THEME-panel), var(--MI_THEME-bg));
        border: solid 1px color-mix(in srgb, var(--creator-site-accent) 28%, var(--MI_THEME-divider));
        box-shadow: 0 18px 50px color-mix(in srgb, var(--creator-site-accent) 18%, rgba(0, 0, 0, 0.16));
}

.heroOverlay {
	padding: 52px 36px;
}

.badge {
	display: inline-flex;
	align-items: center;
	width: fit-content;
	margin: 0 0 14px;
	padding: 6px 12px;
	border-radius: 999px;
	background: color-mix(in srgb, var(--creator-site-theme-color, var(--MI_THEME-accent)) 14%, transparent);
	color: var(--creator-site-theme-color, var(--MI_THEME-accent));
	font-size: 0.86em;
	font-weight: 700;
}

.title {
	margin: 0;
	font-size: clamp(2.1rem, 7vw, 4.8rem);
	line-height: 1;
	letter-spacing: -0.05em;
}

.catch {
	max-width: 680px;
	margin: 18px 0 0;
	color: var(--MI_THEME-fg);
	opacity: 0.82;
	font-size: 1.08em;
	line-height: 1.8;
}

.heroActions {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	margin-top: 28px;
}


.primaryButton {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 16px;
        border-radius: 999px;
        background: var(--creator-site-accent);
        color: #fff;
        text-decoration: none;
        font-weight: 700;
}

.secondaryButton {

background: var(--creator-site-accent-soft);
color: var(--creator-site-accent);
border: solid 1px color-mix(in srgb, var(--creator-site-accent) 32%, transparent);

}
.linkButton {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 42px;
	padding: 0 18px;
	border-radius: 999px;
	text-decoration: none;
	font-weight: 700;
}

.primaryButton {
	background: var(--MI_THEME-accent);
	color: #fff;
}

.secondaryButton,
.linkButton {
	background: var(--MI_THEME-buttonBg);
	color: var(--MI_THEME-fg);
}

.profileCard,
.panel {
	border: solid 1px var(--MI_THEME-divider);
	border-radius: 24px;
	background: var(--MI_THEME-panel);
}

.profileCard {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 18px;
	align-items: center;
	padding: 24px;
}

.avatar {
	display: grid;
	place-items: center;
	width: 76px;
	height: 76px;
	border-radius: 24px;
	background: color-mix(in srgb, var(--MI_THEME-accent) 18%, transparent);
	font-size: 2rem;
}

.avatarImage {
	display: block;
	width: 76px;
	height: 76px;
	border-radius: 24px;
	object-fit: cover;
	background: var(--MI_THEME-buttonBg);
}

.acct {
	margin: 4px 0 0;
	color: var(--MI_THEME-fg);
	opacity: 0.62;
	font-size: 0.92em;
}

.label {
	margin: 0 0 6px;
	color: var(--MI_THEME-accent);
	font-size: 0.8em;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
}

.profileName,
.sectionTitle {
	margin: 0;
}

.profileText,
.bodyText {
	margin: 10px 0 0;
	color: var(--MI_THEME-fg);
	opacity: 0.78;
	line-height: 1.8;
}

.grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 18px;
}

.panel {
	padding: 24px;
}

.statusList {
	display: grid;
	gap: 10px;
	margin-top: 16px;
}

.statusItem {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	padding: 12px 14px;
	border-radius: 14px;
	background: var(--MI_THEME-bg);
}

.statusItem span {
	opacity: 0.72;
}

.newsList {
	display: grid;
	gap: 10px;
	margin: 16px 0 0;
	padding: 0;
	list-style: none;
}

.newsList li {
	line-height: 1.7;
}

.newsList span {
	display: block;
	color: var(--MI_THEME-accent);
	font-size: 0.86em;
	font-weight: 700;
}

.linkGrid {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	margin-top: 16px;
}

@media (max-width: 700px) {
	.heroOverlay {
		padding: 38px 22px;
	}

	.profileCard {
		grid-template-columns: 1fr;
	}

	.grid {
		grid-template-columns: 1fr;
	}
}

.guidelineButton {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 38px;
	margin-top: 16px;
	padding: 0 16px;
	border-radius: 999px;
	background: var(--MI_THEME-buttonBg);
	color: var(--MI_THEME-fg);
	text-decoration: none;
	font-weight: 700;
}

guidelineButton {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 38px;
	margin-top: 16px;
	padding: 0 16px;
	border-radius: 999px;
	background: var(--MI_THEME-buttonBg);
	color: var(--MI_THEME-fg);
	text-decoration: none;
	font-weight: 700;
}

.newsItem {
        padding: 14px 0;
        border-top: solid 1px var(--MI_THEME-divider);
}

.newsItem:first-child {
        border-top: none;
        padding-top: 0;
}

.newsTitle {
        margin: 0 0 8px;
        font-size: 1em;
}

.root {
        --creator-site-accent: var(--creator-site-theme-color, var(--MI_THEME-accent));
        --creator-site-accent-soft: color-mix(in srgb, var(--creator-site-accent) 14%, transparent);
        --creator-site-accent-softer: color-mix(in srgb, var(--creator-site-accent) 7%, transparent);
}

.hero {
        background:
                radial-gradient(circle at top left, color-mix(in srgb, var(--creator-site-accent) 38%, transparent), transparent 34%),
                radial-gradient(circle at bottom right, color-mix(in srgb, var(--creator-site-accent) 18%, transparent), transparent 38%),
                linear-gradient(135deg, var(--MI_THEME-panel), var(--MI_THEME-bg));
        border-color: color-mix(in srgb, var(--creator-site-accent) 28%, var(--MI_THEME-divider));
        box-shadow: 0 18px 50px color-mix(in srgb, var(--creator-site-accent) 18%, rgba(0, 0, 0, 0.16));
}

.badge {
        background: var(--creator-site-accent-soft);
        color: var(--creator-site-accent);
}

.primaryButton {
        background: var(--creator-site-accent);
        color: #fff;
        border-color: var(--creator-site-accent);
}

.secondaryButton,
.linkButton,
.guidelineButton {
        background: var(--creator-site-accent-soft);
        color: var(--creator-site-accent);
        border-color: color-mix(in srgb, var(--creator-site-accent) 32%, transparent);
}

.panel,
.profileCard {
        border-color: color-mix(in srgb, var(--creator-site-accent) 18%, var(--MI_THEME-divider));
        box-shadow: 0 10px 30px color-mix(in srgb, var(--creator-site-accent) 8%, rgba(0, 0, 0, 0.12));
}

.profileCard {
        background:
                linear-gradient(135deg, var(--creator-site-accent-softer), transparent),
                var(--MI_THEME-panel);
}

.statusItem {
        background:
                linear-gradient(135deg, var(--creator-site-accent-softer), transparent),
                var(--MI_THEME-panel);
}

.newsItem {
        padding-left: 14px;
        border-left: solid 4px var(--creator-site-accent);
}

.primaryButton,
.secondaryButton,
.guidelineButton,
.linkButton {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 16px;
        border-radius: 999px;
        border: solid 1px transparent;
        text-decoration: none;
        font-weight: 700;
        line-height: 1;
        box-sizing: border-box;
}

.primaryButton {
        background: var(--creator-site-accent);
        color: #fff;
        border-color: var(--creator-site-accent);
}

.secondaryButton,
.guidelineButton,
.linkButton {
        background: var(--creator-site-accent-soft);
        color: var(--creator-site-accent);
        border-color: color-mix(in srgb, var(--creator-site-accent) 32%, transparent);
}

.creatorButton {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 42px;
        padding: 0 18px;
        border: solid 1px color-mix(in srgb, var(--creator-site-accent) 32%, transparent);
        border-radius: 999px;
        background: var(--creator-site-accent-soft);
        color: var(--creator-site-accent);
        text-decoration: none;
        font-weight: 700;
        line-height: 1.2;
        box-sizing: border-box;
        white-space: nowrap;
}

.creatorButtonPrimary {
        border-color: var(--creator-site-accent);
        background: var(--creator-site-accent);
        color: #fff;
}

.reportPanel {
        padding: 16px;
        border: solid 1px var(--MI_THEME-divider);
        border-radius: 16px;
        background: var(--MI_THEME-panel);
        opacity: 0.82;
}

.reportText {
        margin: 0 0 10px;
        font-size: 0.9em;
        line-height: 1.7;
        opacity: 0.78;
}

.reportButton {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 36px;
        padding: 0 14px;
        border-radius: 999px;
        border: solid 1px var(--MI_THEME-divider);
        color: var(--MI_THEME-fg);
        text-decoration: none;
        font-weight: 700;
        font-size: 0.9em;
}

.bodyText {
        white-space: pre-wrap;
}
</style>
