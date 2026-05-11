/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class CreatorSiteExtendedProfile1768400000000 {
        name = 'CreatorSiteExtendedProfile1768400000000'

        async up(queryRunner) {
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "extendedProfile" character varying(4096)`);
        }

        async down(queryRunner) {
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "extendedProfile"`);
        }
}
