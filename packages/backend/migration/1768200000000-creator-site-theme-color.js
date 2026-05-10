/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class CreatorSiteThemeColor1768200000000 {
        name = 'CreatorSiteThemeColor1768200000000'

        async up(queryRunner) {
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "themeColor" character varying(16)`);
        }

        async down(queryRunner) {
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "themeColor"`);
        }
}
