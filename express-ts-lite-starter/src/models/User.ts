import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('public.users')
export class User {
    @PrimaryColumn({type:'uuid', name: 'id' })
    id!: string; // <--- Tambahkan '!' di sini. Ini memberitahu TypeScript bahwa TypeORM akan menginisialisasi properti ini.

    @Column({ unique: true, name: 'email' })
    email!: string; // <--- Tambahkan '!'

    @Column({name: 'password' })
    password!: string; // <--- Tambahkan '!'

    @Column({ default: 'user', name: 'role' }) // <--- Tambahkan nama kolom jika perlu
    role: string = 'user'; // <--- Beri nilai default di sini

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt!: Date; // <--- Tambahkan '!' (TypeORM akan mengisinya)

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt!: Date; // <--- Tambahkan '!' (TypeORM akan mengisinya)

    @DeleteDateColumn({ type: 'timestamp', nullable: true, name: 'deleted_at' }) // <--- Tambahkan nama kolom jika perlu
    deletedAt?: Date | null; // <--- Tandai sebagai opsional dan bisa null

    constructor() {
        if (!this.id) { // Ini aman sekarang karena 'id' ditandai definite assignment, dan akan diinisialisasi di baris bawah jika kosong
            this.id = uuidv4();
        }
    }
}