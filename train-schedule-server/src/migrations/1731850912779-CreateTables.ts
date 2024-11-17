import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1731850912779 implements MigrationInterface {
    name = 'CreateTables1731850912779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "train" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "fromDestination" character varying NOT NULL, "toDestination" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_0590a6e4276dfef1c8ba49f1c08" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "train"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
