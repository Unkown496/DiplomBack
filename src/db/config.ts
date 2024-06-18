import { defineConfig, SqliteDriver } from "@mikro-orm/sqlite";

import { Users } from "./entity/Users";
import { Delivery } from "./entity/Delivery";
import { Providers } from "./entity/Providers";
import { Materials } from "./entity/Materials";
import { Productions } from "./entity/Productions";
import { SeedManager } from "@mikro-orm/seeder";

export default defineConfig({
    driver: SqliteDriver,
    dbName: "database.db",
    extensions: [SeedManager],
    seeder: {
        pathTs: "./src/seeders", // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
        defaultSeeder: 'UserSeedSeeder', // default seeder class name
        glob: '*.{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
        emit: 'ts', // seeder generation mode
        fileName: (className: string) => className, // seeder file naming convention
    },
    entities: [Users, Delivery, Providers, Materials, Productions],
});