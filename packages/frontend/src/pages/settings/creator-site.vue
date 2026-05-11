<template>
	<MkSpacer :contentMax="720">
		<div class="_gaps_m">
			<div :class="$style.header">
				<div>
					<p :class="$style.badge">Creator Site</p>
					<h1 :class="$style.title">活動ページ設定</h1>
					<p :class="$style.description">
						活動者向けの公式ホームページ風ページに表示する内容を設定できます。
						入力した内容は活動ページに保存され、外部の人にも見える公開ページに反映されます。
					</p>
				</div>
			</div>

			<MkFolder defaultOpen>
				<template #label>基本情報</template>

				<div class="_gaps_m">
					<MkInput v-model="siteTitle">
						<template #label>ページタイトル</template>
						<template #caption>例：nano official site</template>
					</MkInput>

					<MkTextarea v-model="catchphrase">
						<template #label>キャッチコピー</template>
						<template #caption>活動ページの上の方に表示する短い紹介文です。</template>
					</MkTextarea>

                                        <MkTextarea v-model="extendedProfile">
                                                <template #label>詳しいプロフィール</template>
                                                <template #caption>通常プロフィールより詳しい自己紹介・活動内容・実績・方針などを書けます。</template>
                                        </MkTextarea>

                                        <MkInput v-model="themeColor">
                                                <template #label>テーマカラー</template>
                                                <template #caption>例: #33cc99　未入力の場合は通常のテーマ色を使います。</template>
                                        </MkInput>
				</div>
			</MkFolder>

			<MkFolder>
				<template #label>活動状況</template>

				<div class="_gaps_m">
					<MkInput v-model="commissionStatus">
						<template #label>依頼受付状況</template>
						<template #caption>例：受付中 / 停止中 / 要相談</template>
					</MkInput>

					<MkInput v-model="collabStatus">
						<template #label>コラボ受付状況</template>
						<template #caption>例：相談OK / 現在停止中</template>
					</MkInput>

					<MkInput v-model="fanartStatus">
						<template #label>ファンアート</template>
						<template #caption>例：歓迎 / 条件付きOK / 事前確認希望</template>
					</MkInput>
				</div>
			</MkFolder>

			<MkFolder>
				<template #label>ガイドライン</template>

				<div class="_gaps_m">
					<MkInput v-model="guidelineUrl">
						<template #label>ガイドラインURL</template>
						<template #caption>二次創作・依頼・納品物の扱いなどをまとめたページのURLを入れます。</template>
					</MkInput>

					<MkTextarea v-model="guidelineText">
						<template #label>ガイドライン補足</template>
						<template #caption>活動ページ上に表示する短い補足文です。</template>
					</MkTextarea>
				</div>
			</MkFolder>

                        <MkFolder>
                                <template #label>お知らせ</template>

                                <div class="_gaps_m">
                                        <MkInput v-model="newsTitle1">
                                                <template #label>お知らせ1 タイトル</template>
                                                <template #caption>一番上に表示されます。</template>
                                        </MkInput>

                                        <MkTextarea v-model="newsText1">
                                                <template #label>お知らせ1 本文</template>
                                                <template #caption>短めのお知らせや詳細を書けます。</template>
                                        </MkTextarea>

                                        <MkInput v-model="newsTitle2">
                                                <template #label>お知らせ2 タイトル</template>
                                        </MkInput>

                                        <MkTextarea v-model="newsText2">
                                                <template #label>お知らせ2 本文</template>
                                        </MkTextarea>

                                        <MkInput v-model="newsTitle3">
                                                <template #label>お知らせ3 タイトル</template>
                                        </MkInput>

                                        <MkTextarea v-model="newsText3">
                                                <template #label>お知らせ3 本文</template>
                                        </MkTextarea>
                                </div>
                        </MkFolder>

                        <MkFolder>
                                <template #label>自由リンク</template>

                                <div class="_gaps_m">
                                        <MkInput v-model="linkLabel1">
                                                <template #label>リンク1 タイトル</template>
                                                <template #caption>例：YouTube / BOOTH / 音源配布ページ</template>
                                        </MkInput>

                                        <MkInput v-model="linkUrl1">
                                                <template #label>リンク1 URL</template>
                                                <template #caption>https:// または http:// から始まるURLを入力してください。</template>
                                        </MkInput>

                                        <MkInput v-model="linkLabel2">
                                                <template #label>リンク2 タイトル</template>
                                        </MkInput>

                                        <MkInput v-model="linkUrl2">
                                                <template #label>リンク2 URL</template>
                                        </MkInput>

                                        <MkInput v-model="linkLabel3">
                                                <template #label>リンク3 タイトル</template>
                                        </MkInput>

                                        <MkInput v-model="linkUrl3">
                                                <template #label>リンク3 URL</template>
                                        </MkInput>
                                </div>
                        </MkFolder>

			<div :class="$style.actions">
<MkButton primary :disabled="loading || saving" @click="save">
	{{ saving ? '保存中...' : '保存する' }}
</MkButton>
<a :class="$style.previewButton" :href="previewPath">
        活動ページを見る
</a>
			</div>
		</div>
	</MkSpacer>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import MkButton from '@/components/MkButton.vue';
import MkFolder from '@/components/MkFolder.vue';
import MkInput from '@/components/MkInput.vue';
import MkTextarea from '@/components/MkTextarea.vue';
import { misskeyApi } from '@/utility/misskey-api.js';
import { $i } from '@/i.js';
import * as os from '@/os.js';

const siteTitle = ref('');
const catchphrase = ref('');
const extendedProfile = ref('');
const commissionStatus = ref('受付中');
const collabStatus = ref('相談OK');
const fanartStatus = ref('歓迎');
const guidelineUrl = ref('');
const guidelineText = ref('');
const newsTitle1 = ref('');
const newsText1 = ref('');
const newsTitle2 = ref('');
const newsText2 = ref('');
const newsTitle3 = ref('');
const newsText3 = ref('');
const themeColor = ref('');
const linkLabel1 = ref('');
const linkUrl1 = ref('');
const linkLabel2 = ref('');
const linkUrl2 = ref('');
const linkLabel3 = ref('');
const linkUrl3 = ref('');

const loading = ref(true);
const saving = ref(false);

const previewPath = computed(() => {
	return $i ? `/site/@${$i.username}` : '/site/@unknown';
});

async function load(): Promise<void> {
	if ($i == null) {
		loading.value = false;
		return;
	}

	loading.value = true;

	try {
		const site = await misskeyApi('creator-site/show', {
			userId: $i.id,
		});

		if (site != null) {
			siteTitle.value = site.title ?? '';
			catchphrase.value = site.catchphrase ?? '';
                        extendedProfile.value = site.extendedProfile ?? '';
			commissionStatus.value = site.commissionStatus ?? '受付中';
			collabStatus.value = site.collabStatus ?? '相談OK';
			fanartStatus.value = site.fanartStatus ?? '歓迎';
			guidelineUrl.value = site.guidelineUrl ?? '';
			guidelineText.value = site.guidelineText ?? '';
                        newsTitle1.value = site.newsTitle1 ?? '';
                        newsText1.value = site.newsText1 ?? '';
                        newsTitle2.value = site.newsTitle2 ?? '';
                        newsText2.value = site.newsText2 ?? '';
                        newsTitle3.value = site.newsTitle3 ?? '';
                        newsText3.value = site.newsText3 ?? '';
                        themeColor.value = site.themeColor ?? '';
                        linkLabel1.value = site.linkLabel1 ?? '';
                        linkUrl1.value = site.linkUrl1 ?? '';
                        linkLabel2.value = site.linkLabel2 ?? '';
                        linkUrl2.value = site.linkUrl2 ?? '';
                        linkLabel3.value = site.linkLabel3 ?? '';
                        linkUrl3.value = site.linkUrl3 ?? '';
		}
	} catch (err) {
		console.error(err);
		os.alert({
			type: 'error',
			title: '読み込みに失敗しました',
			text: '活動ページ設定を読み込めませんでした。',
		});
	} finally {
		loading.value = false;
	}
}

async function save(): Promise<void> {
	if ($i == null || saving.value) return;

	saving.value = true;

	try {
		await misskeyApi('creator-site/update', {
			title: siteTitle.value,
			catchphrase: catchphrase.value,
                        extendedProfile: extendedProfile.value,
			commissionStatus: commissionStatus.value,
			collabStatus: collabStatus.value,
			fanartStatus: fanartStatus.value,
			guidelineUrl: guidelineUrl.value,
			guidelineText: guidelineText.value,
                        newsTitle1: newsTitle1.value,
                        newsText1: newsText1.value,
                        newsTitle2: newsTitle2.value,
                        newsText2: newsText2.value,
                        newsTitle3: newsTitle3.value,
                        newsText3: newsText3.value,
                        themeColor: themeColor.value,
                        linkLabel1: linkLabel1.value,
                        linkUrl1: linkUrl1.value,
                        linkLabel2: linkLabel2.value,
                        linkUrl2: linkUrl2.value,
                        linkLabel3: linkLabel3.value,
                        linkUrl3: linkUrl3.value,
		});

		os.toast('活動ページ設定を保存しました');
	} catch (err) {
		console.error(err);
		os.alert({
			type: 'error',
			title: '保存に失敗しました',
			text: '入力内容を確認して、もう一度お試しください。',
		});
	} finally {
		saving.value = false;
	}
}

onMounted(() => {
	load();
});
</script>

<style lang="scss" module>
.header {
	padding: 24px;
	border: solid 1px var(--MI_THEME-divider);
	border-radius: 20px;
	background:
		radial-gradient(circle at top left, rgba(255, 182, 193, 0.35), transparent 34%),
		linear-gradient(135deg, var(--MI_THEME-panel), var(--MI_THEME-bg));
}

.badge {
	margin: 0 0 8px;
	color: var(--MI_THEME-accent);
	font-size: 0.82em;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
}

.title {
	margin: 0;
	font-size: 1.8rem;
}

.description {
	margin: 10px 0 0;
	color: var(--MI_THEME-fg);
	opacity: 0.72;
	line-height: 1.8;
}

.actions {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	justify-content: flex-end;
}

.previewButton {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 16px;
        border-radius: 999px;
        background: var(--MI_THEME-buttonBg);
        color: var(--MI_THEME-fg);
        text-decoration: none;
        font-weight: 700;
}
</style>
