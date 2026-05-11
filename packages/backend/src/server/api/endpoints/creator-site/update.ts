/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import type { CreatorSitesRepository } from '@/models/_.js';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { DI } from '@/di-symbols.js';
import { IdService } from '@/core/IdService.js';

export const meta = {
	tags: ['creator-site'],

	requireCredential: true,

	description: 'Update my creator site settings.',

	res: {
		optional: false,
		nullable: false,
		type: 'object',
		properties: {
			id: { type: 'string', optional: false, nullable: false },
			userId: { type: 'string', optional: false, nullable: false },
			title: { type: 'string', optional: false, nullable: true },
			catchphrase: { type: 'string', optional: false, nullable: true },
                        extendedProfile: { type: 'string', optional: false, nullable: true },
			commissionStatus: { type: 'string', optional: false, nullable: true },
			collabStatus: { type: 'string', optional: false, nullable: true },
			fanartStatus: { type: 'string', optional: false, nullable: true },
			guidelineUrl: { type: 'string', optional: false, nullable: true },
			guidelineText: { type: 'string', optional: false, nullable: true },
                        newsTitle1: { type: 'string', optional: false, nullable: true },
                        newsText1: { type: 'string', optional: false, nullable: true },
                        newsTitle2: { type: 'string', optional: false, nullable: true },
                        newsText2: { type: 'string', optional: false, nullable: true },
                        newsTitle3: { type: 'string', optional: false, nullable: true },
                        newsText3: { type: 'string', optional: false, nullable: true },
                        themeColor: { type: 'string', optional: false, nullable: true },
                        linkLabel1: { type: 'string', optional: false, nullable: true },
                        linkUrl1: { type: 'string', optional: false, nullable: true },
                        linkLabel2: { type: 'string', optional: false, nullable: true },
                        linkUrl2: { type: 'string', optional: false, nullable: true },
                        linkLabel3: { type: 'string', optional: false, nullable: true },
                        linkUrl3: { type: 'string', optional: false, nullable: true },
			createdAt: { type: 'string', optional: false, nullable: false, format: 'date-time' },
			updatedAt: { type: 'string', optional: false, nullable: false, format: 'date-time' },
		},
	},
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		title: { type: 'string', nullable: true, maxLength: 256 },
		catchphrase: { type: 'string', nullable: true, maxLength: 1024 },
                extendedProfile: { type: 'string', nullable: true, maxLength: 4096 },
		commissionStatus: { type: 'string', nullable: true, maxLength: 128 },
		collabStatus: { type: 'string', nullable: true, maxLength: 128 },
		fanartStatus: { type: 'string', nullable: true, maxLength: 128 },
		guidelineUrl: { type: 'string', nullable: true, maxLength: 1024 },
		guidelineText: { type: 'string', nullable: true, maxLength: 2048 },
                newsTitle1: { type: 'string', nullable: true, maxLength: 128 },
                newsText1: { type: 'string', nullable: true, maxLength: 1024 },
                newsTitle2: { type: 'string', nullable: true, maxLength: 128 },
                newsText2: { type: 'string', nullable: true, maxLength: 1024 },
                newsTitle3: { type: 'string', nullable: true, maxLength: 128 },
                newsText3: { type: 'string', nullable: true, maxLength: 1024 },
                themeColor: { type: 'string', nullable: true, maxLength: 16 },
                linkLabel1: { type: 'string', nullable: true, maxLength: 64 },
                linkUrl1: { type: 'string', nullable: true, maxLength: 1024 },
                linkLabel2: { type: 'string', nullable: true, maxLength: 64 },
                linkUrl2: { type: 'string', nullable: true, maxLength: 1024 },
                linkLabel3: { type: 'string', nullable: true, maxLength: 64 },
                linkUrl3: { type: 'string', nullable: true, maxLength: 1024 },
	},
	required: [],
} as const;

function normalize(value: string | null | undefined): string | null {
	if (value == null) return null;

	const trimmed = value.trim();

	return trimmed === '' ? null : trimmed;
}

function normalizeThemeColor(value: string | null | undefined): string | null {
        const normalized = normalize(value);

        if (normalized == null) return null;

        if (!/^#[0-9a-fA-F]{6}$/.test(normalized)) {
                return null;
        }

        return normalized;
}

function normalizeUrl(value: string | null | undefined): string | null {
        const normalized = normalize(value);

        if (normalized == null) return null;

        if (!/^https?:\/\//.test(normalized)) {
                return null;
        }

        return normalized;
}

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> { // eslint-disable-line import/no-default-export
	constructor(
        @Inject(DI.creatorSitesRepository)
        private creatorSitesRepository: CreatorSitesRepository,

        private idService: IdService,
) {
		super(meta, paramDef, async (ps, me) => {
			const now = new Date();

			const existing = await this.creatorSitesRepository.findOneBy({
				userId: me.id,
			});

			if (existing == null) {
				const created = await this.creatorSitesRepository.insertOne({
                                id: this.idService.gen(),
                                userId: me.id,
                                title: normalize(ps.title),
					catchphrase: normalize(ps.catchphrase),
                                        extendedProfile: normalize(ps.extendedProfile),
					commissionStatus: normalize(ps.commissionStatus),
					collabStatus: normalize(ps.collabStatus),
					fanartStatus: normalize(ps.fanartStatus),
					guidelineUrl: normalize(ps.guidelineUrl),
					guidelineText: normalize(ps.guidelineText),
                                        newsTitle1: normalize(ps.newsTitle1),
                                        newsText1: normalize(ps.newsText1),
                                        newsTitle2: normalize(ps.newsTitle2),
                                        newsText2: normalize(ps.newsText2),
                                        newsTitle3: normalize(ps.newsTitle3),
                                        newsText3: normalize(ps.newsText3),
                                        themeColor: normalizeThemeColor(ps.themeColor),
                                        linkLabel1: normalize(ps.linkLabel1),
                                        linkUrl1: normalizeUrl(ps.linkUrl1),
                                        linkLabel2: normalize(ps.linkLabel2),
                                        linkUrl2: normalizeUrl(ps.linkUrl2),
                                        linkLabel3: normalize(ps.linkLabel3),
                                        linkUrl3: normalizeUrl(ps.linkUrl3),
					createdAt: now,
					updatedAt: now,
				});

				return {
					id: created.id,
					userId: created.userId,
					title: created.title,
					catchphrase: created.catchphrase,
                                        extendedProfile: created.extendedProfile,
					commissionStatus: created.commissionStatus,
					collabStatus: created.collabStatus,
					fanartStatus: created.fanartStatus,
					guidelineUrl: created.guidelineUrl,
					guidelineText: created.guidelineText,
                                        newsTitle1: created.newsTitle1,
                                        newsText1: created.newsText1,
                                        newsTitle2: created.newsTitle2,
                                        newsText2: created.newsText2,
                                        newsTitle3: created.newsTitle3,
                                        newsText3: created.newsText3,
                                        themeColor: created.themeColor,
                                        linkLabel1: created.linkLabel1,
                                        linkUrl1: created.linkUrl1,
                                        linkLabel2: created.linkLabel2,
                                        linkUrl2: created.linkUrl2,
                                        linkLabel3: created.linkLabel3,
                                        linkUrl3: created.linkUrl3,
					createdAt: created.createdAt?.toISOString?.() ?? now.toISOString(),
					updatedAt: created.updatedAt?.toISOString?.() ?? now.toISOString(),
				};
			}

			await this.creatorSitesRepository.update(existing.id, {
				title: normalize(ps.title),
				catchphrase: normalize(ps.catchphrase),
                                extendedProfile: normalize(ps.extendedProfile),
				commissionStatus: normalize(ps.commissionStatus),
				collabStatus: normalize(ps.collabStatus),
				fanartStatus: normalize(ps.fanartStatus),
				guidelineUrl: normalize(ps.guidelineUrl),
				guidelineText: normalize(ps.guidelineText),
                                newsTitle1: normalize(ps.newsTitle1),
                                newsText1: normalize(ps.newsText1),
                                newsTitle2: normalize(ps.newsTitle2),
                                newsText2: normalize(ps.newsText2),
                                newsTitle3: normalize(ps.newsTitle3),
                                newsText3: normalize(ps.newsText3),
                                themeColor: normalizeThemeColor(ps.themeColor),
                                linkLabel1: normalize(ps.linkLabel1),
                                linkUrl1: normalizeUrl(ps.linkUrl1),
                                linkLabel2: normalize(ps.linkLabel2),
                                linkUrl2: normalizeUrl(ps.linkUrl2),
                                linkLabel3: normalize(ps.linkLabel3),
                                linkUrl3: normalizeUrl(ps.linkUrl3),
				updatedAt: now,
			});

			const updated = await this.creatorSitesRepository.findOneByOrFail({
				id: existing.id,
			});

			return {
				id: updated.id,
				userId: updated.userId,
				title: updated.title,
				catchphrase: updated.catchphrase,
                                extendedProfile: updated.extendedProfile,
				commissionStatus: updated.commissionStatus,
				collabStatus: updated.collabStatus,
				fanartStatus: updated.fanartStatus,
				guidelineUrl: updated.guidelineUrl,
				guidelineText: updated.guidelineText,
                                newsTitle1: updated.newsTitle1,
                                newsText1: updated.newsText1,
                                newsTitle2: updated.newsTitle2,
                                newsText2: updated.newsText2,
                                newsTitle3: updated.newsTitle3,
                                newsText3: updated.newsText3,
                                themeColor: updated.themeColor,
                                linkLabel1: updated.linkLabel1,
                                linkUrl1: updated.linkUrl1,
                                linkLabel2: updated.linkLabel2,
                                linkUrl2: updated.linkUrl2,
                                linkLabel3: updated.linkLabel3,
                                linkUrl3: updated.linkUrl3,
				createdAt: updated.createdAt?.toISOString?.() ?? now.toISOString(),
				updatedAt: updated.updatedAt?.toISOString?.() ?? now.toISOString(),
			};
		});
	}
}
