import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { MaterialsFactory } from '../factory/MaterialsFactory';
import { Delivery } from '../db/entity/Delivery';
import { DeliveryFactory } from '../factory/DeliveryFactory';

export class MaterialsSeedSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    new MaterialsFactory(em).each(materials => {
      materials.delivery = new DeliveryFactory(em).makeOne();
    })
    .make(10);
  }

}
