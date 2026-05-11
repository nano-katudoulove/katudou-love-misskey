/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class CreatorSiteLinks1768300000000 {
        name = 'CreatorSiteLinks1768300000000'

        async up(queryRunner) {
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "linkLabel1" character varying(64)`);
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "linkUrl1" character varying(1024)`);
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "linkLabel2" character varying(64)`);
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "linkUrl2" character varying(1024)`);
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "linkLabel3" character varying(64)`);
                await queryRunner.query(`ALTER TABLE "creator_site" ADD "linkUrl3" character varying(1024)`);
        }

        async down(queryRunner) {
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "linkUrl3"`);
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "linkLabel3"`);
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "linkUrl2"`);
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "linkLabel2"`);
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "linkUrl1"`);
                await queryRunner.query(`ALTER TABLE "creator_site" DROP COLUMN "linkLabel1"`);
        }
}
