/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Entity, Column, Index, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { id } from './util/id.js';
import { MiUser } from './User.js';

@Entity('creator_site')
export class MiCreatorSite {
	@PrimaryColumn(id())
	public id: string;

	@Index({ unique: true })
	@Column(id())
	public userId: MiUser['id'];

	@OneToOne(() => MiUser, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	public user: MiUser | null;

	@Column('varchar', {
		length: 256,
		nullable: true,
	})
	public title: string | null;

	@Column('varchar', {
		length: 1024,
		nullable: true,
	})
	public catchphrase: string | null;

	@Column('varchar', {
		length: 128,
		nullable: true,
	})
	public commissionStatus: string | null;

	@Column('varchar', {
		length: 128,
		nullable: true,
	})
	public collabStatus: string | null;

	@Column('varchar', {
		length: 128,
		nullable: true,
	})
	public fanartStatus: string | null;

	@Column('varchar', {
		length: 1024,
		nullable: true,
	})
	public guidelineUrl: string | null;

	@Column('varchar', {
		length: 2048,
		nullable: true,
	})
	public guidelineText: string | null;

	@Column('timestamp with time zone', {
		default: () => 'now()',
	})

        @Column('varchar', {
                length: 128,
                nullable: true,
        })
        public newsTitle1: string | null;

        @Column('varchar', {
                length: 1024,
                nullable: true,
        })
        public newsText1: string | null;

        @Column('varchar', {
                length: 128,
                nullable: true,
        })
        public newsTitle2: string | null;

        @Column('varchar', {
                length: 1024,
                nullable: true,
        })
        public newsText2: string | null;

        @Column('varchar', {
                length: 128,
                nullable: true,
        })
        public newsTitle3: string | null;

        @Column('varchar', {
                length: 1024,
                nullable: true,
        })
        public newsText3: string | null;

        @Column('varchar', {
                length: 16,
                nullable: true,
        })
        public themeColor: string | null;

	public createdAt: Date;

	@Column('timestamp with time zone', {
		default: () => 'now()',
	})
	public updatedAt: Date;
}
