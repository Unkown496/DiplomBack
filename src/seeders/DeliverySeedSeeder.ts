import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { DeliveryFactory } from '../factory/DeliveryFactory';
import { ProvidersFactory } from '../factory/ProvidersFactory';

export class DeliverySeedSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    new DeliveryFactory(em).each(delivery => {
      delivery.providerId = new ProvidersFactory(em).makeOne();
    })
    .make(10);
  }

}
