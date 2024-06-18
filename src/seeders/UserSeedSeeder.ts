import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UsersFactory } from '../factory/UsersFactory';

export class UserSeedSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    new UsersFactory(em).make(10);
  }
}
