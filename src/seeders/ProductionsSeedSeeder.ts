import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProductionsFactory } from '../factory/ProductionsFactory';
import { MaterialsFactory } from '../factory/MaterialsFactory';

export class ProductionsSeedSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    new ProductionsFactory(em).each(productions => {
      productions.materials.set(
        new MaterialsFactory(em).each(materials => {
          materials.production = productions;
        })
        .make(5)
      );
    })
    .make(10);
  }
}
