/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class CreatorSiteNews1768100000000 {
        name = 'CreatorSiteNews1768100000000'

        async up(queryRunner) {
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "newsTitle1" character varying(128)`);
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "newsText1" character varying(1024)`);
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "newsTitle2" character varying(128)`);
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "newsText2" character varying(1024)`);
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "newsTitle3" character varying(128)`);
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "newsText3" character varying(1024)`);
        }

        async down(queryRunner) {
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "newsText3"`);
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "newsTitle3"`);
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "newsText2"`);
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "newsTitle2"`);
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "newsText1"`);
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "newsTitle1"`);
        }
}
