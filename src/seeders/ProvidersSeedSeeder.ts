import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProvidersFactory } from '../factory/ProvidersFactory';
import { DeliveryFactory } from '../factory/DeliveryFactory';

export class ProvidersSeedSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    new ProvidersFactory(em).each(provider => {
      provider.deliveries.set(new DeliveryFactory(em).make(5));
    })
    .make(10);
  }
}
