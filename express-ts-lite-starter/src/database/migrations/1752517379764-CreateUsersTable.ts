import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1752517379764 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users", // Nama tabel di database
                schema: "public", // <--- TAMBAHKAN BARIS INI
                columns: [
                    {
                        name: "id",
                        type: "uuid", // Tipe data UUID
                        isPrimary: true,
                        default: "uuid_generate_v4()", // Menggunakan fungsi PostgreSQL untuk UUID
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255", // Panjang varchar, sesuaikan jika perlu
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255", // Biasanya lebih panjang untuk hash
                        isNullable: false,
                    },
                    {
                        name: "role",
                        type: "varchar",
                        length: "50",
                        default: "'user'", // Nilai default string harus dalam kutipan tunggal di SQL
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()", // Menggunakan fungsi PostgreSQL untuk timestamp
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: false,
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true, // Kolom untuk soft delete, bisa null
                    },
                ],
            }),
            true, // Jika true, akan memeriksa apakah tabel sudah ada sebelum membuat
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Di metode down, kita menghapus tabel yang dibuat di metode up
        await queryRunner.dropTable(new Table(
            {
                name: "users", // Nama tabel yang akan dihapus
                schema: "public", // <--- TAMBAHKAN BARIS INI
            }
        ));
    }
}
