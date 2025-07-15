import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '../config';
import { User } from '../models/User';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'; // <--- Import ini

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.db.postgres.host,
    port: config.db.postgres.port,
    username: config.db.postgres.username,
    password: config.db.postgres.password,
    database: config.db.postgres.database,
    synchronize: false,
    logging: false,
    entities: [User],
    // Ini akan jadi path yang benar jika Anda memindahkan folder migrations ke src/database/
    migrations: [`${__dirname}/migrations/*.ts`],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
});

export const initializeDatabase = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log('Data Source has been initialized!');
        }
    } catch (err) {
        console.error('Error during Data Source initialization:', err);
        process.exit(1);
    }
};