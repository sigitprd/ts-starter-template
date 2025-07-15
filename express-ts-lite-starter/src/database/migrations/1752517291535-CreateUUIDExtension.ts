import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUUIDExtension1752517291535 implements MigrationInterface { // Ganti angka dengan timestamp dari file Anda
    public async up(queryRunner: QueryRunner): Promise<void> {
        // SQL untuk membuat ekstensi uuid-ossp
        // IF NOT EXISTS memastikan tidak ada error jika ekstensi sudah ada
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // SQL untuk menghapus ekstensi uuid-ossp
        // CASCADE akan menghapus semua objek yang bergantung pada ekstensi ini
        // IF EXISTS memastikan tidak ada error jika ekstensi tidak ada
        await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
    }
}