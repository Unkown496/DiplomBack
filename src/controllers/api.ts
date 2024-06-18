import { Context, t } from "elysia";
import { Controller, Get, Post, Patch, Put, Delete } from "elysia-decorators";

import orm from "../db/index"; 

import responseHelpres from "../helpers/responseHelpres";
import { Delivery } from "../db/entity/Delivery";
import { Materials } from "../db/entity/Materials";
import { Providers } from "../db/entity/Providers";
import { Productions, Status } from "../db/entity/Productions";

@Controller("/api/v1")
export class Api {
    @Get("/delivery")
    async getDeliveries({ set }: { set: Context['set'] }) {
        const deliveries = await orm.findAll(Delivery, {
            populate: ['*'],
        });

        return responseHelpres.successWithData({ data: deliveries, set })
    };

    @Post('/delivery', {
        body: t.Object({
            deliveryId: t.Number(),
            date: t.String(),
        })
    })
    async createDelivery({ body, set }: { body: { deliveryId: number, date: Date }, set: Context['set'] }) {
        const createDelivery = new Delivery({
            deliveryId: String(body.deliveryId) as string,
            date: new Date(body.date),
        });

        await orm.persistAndFlush(createDelivery);

        return responseHelpres.successWithData({ data: createDelivery, set })
    };

    @Put('/delivery/:id', {
        params: t.Object({
            id: t.Numeric(),
        }),
        body: t.Object({
            deliveryId: t.Number(),
            date: t.String({ format: "date" }),
        })
    })
    async updateDelivery({ params, body, set }: { params: { id: number }, body: { deliveryId: number, date: Date }, set: Context['set'] }) {        
        const findDeliveryToUpdate = await orm.findOne(Delivery, params.id);

        if(!findDeliveryToUpdate) return responseHelpres.failureNotFound({ notFoundText: 'Доставка не найдена', set });

        findDeliveryToUpdate.deliveryId = String(body.deliveryId) as string;
        findDeliveryToUpdate.date = body.date;

        await orm.persistAndFlush(findDeliveryToUpdate);

        return responseHelpres.successWithData({ data: findDeliveryToUpdate, set });
    }

    @Delete('/delivery/:id', {
        params: t.Object({
            id: t.Numeric(),
        }),
    })
    async deleteDelivery({ params, set }: { params: { id: number }, set: Context['set'] }) {
        const { id } = params;
        const delivery = await orm.findOne(Delivery, id);

        if(!delivery) return responseHelpres.failureNotFound({ notFoundText: 'Доставка не найдена', set });

        await orm.removeAndFlush(delivery);

        return responseHelpres.successWithoutData({ set });
    };

    @Get('/materials') 
    async getMaterials({ set }: { set: Context['set'] }) {
        const materials = await orm.findAll(Materials, {
            populate: ["delivery"],
            exclude: ["delivery.materials"],
        });
        return responseHelpres.successWithData({ data: materials, set })
    };

    @Post('/materials', {
        body: t.Object({
            title: t.String(),
            kg: t.Number(),
            lit: t.Number(),
            deliveryDate: t.String(),
            deliveryId: t.Optional(t.Number()),
        }),
    })
    async createMaterials({ body, set }: { body: { title: string, kg: number, lit: number, deliveryDate: Date, deliveryId?: number }, set: Context['set'] }) {
        console.log(body);
        
        let tryFindDelivery;

        if(body.deliveryId) {
            tryFindDelivery = await orm.findOne(Delivery, body.deliveryId);

            if(!tryFindDelivery) return responseHelpres.failureNotFound({ notFoundText: 'Доставка не найдена', set });
        };  

        const createMaterials = new Materials({
            title: body.title,
            kg: body.kg,
            lit: body.lit,
            deliveryDate: new Date(body.deliveryDate),
            delivery: tryFindDelivery,
        });

        await orm.persistAndFlush(createMaterials);

        return responseHelpres.successWithData({ data: createMaterials, set });
    };

    @Put('/materials/:id', {
        body: t.Object({
            title: t.String(),
            kg: t.Number(),
            lit: t.Number(),
            deliveryDate: t.String({ format: "date" }),
            deliveryId: t.Optional(t.Number()),
        })
    })
    async updateMaterials({ params, body, set }: { params: { id: number }, body: { title: string, kg: number, lit: number, deliveryDate: Date, deliveryId?: number }, set: Context['set'] }) {
        const findMaterialById = await orm.findOne(Materials, {
            id: params.id,
        }, { populate: ["*"] });

        if(!findMaterialById) return responseHelpres.failureNotFound({ notFoundText: 'Материал не найден', set });

        findMaterialById.title = body.title;
        findMaterialById.kg = body.kg;
        findMaterialById.lit = body.lit;
        findMaterialById.deliveryDate = new Date(body.deliveryDate);

        if(!!body.deliveryId) {
            const findDelivery = await orm.findOne(Delivery, body.deliveryId);

            if(!findDelivery) return responseHelpres.failureNotFound({ notFoundText: 'Доставка не найдена', set });

            findMaterialById.delivery = findDelivery;            
        };

        await orm.flush();

        return responseHelpres.successWithData({ data: findMaterialById, set });
    }

    @Delete('/materials/:id', {
        params: t.Object({
            id: t.Numeric(),
        }),
    })
    async deleteMaterials({ params, set }: { params: { id: number }, set: Context['set'] }) {
        const { id } = params;
        const materials = await orm.findOne(Materials, id);

        if(!materials) return responseHelpres.failureNotFound({ notFoundText: 'Материал не найден', set });

        await orm.removeAndFlush(materials);

        return responseHelpres.successWithoutData({ set });
    };

    @Get('/production')
    async getProductions({ set }: { set: Context['set'] }) {
        const productions = await orm.findAll(Productions, { populate: ["*"] });
        return responseHelpres.successWithData({ data: productions, set })
    };

    @Post('/production', {
        body: t.Object({
            isReady: t.BooleanString(),
            status: t.Enum(Status),
            title: t.String(), 
            materialsIds: t.Optional(t.Array(t.Numeric()))
        }),
    })
    async createProduction({ body, set }: { body: { isReady: boolean, status: Status, title: string, materialsIds?: number[] }, set: Context['set'] }) {
        const createProduction = new Productions(body);
        
        if(body.materialsIds && body.materialsIds.length > 0) {
            const materials = await orm.find(Materials, { id: { $in: body.materialsIds } });
            createProduction.materials.set(materials);
        };

        await orm.persistAndFlush(createProduction);

        return responseHelpres.successWithData({ data: createProduction, set })
    };

    @Put('/production/:id', {
        body: t.Object({
            isReady: t.BooleanString(),
            status: t.Enum(Status),
            title: t.String(), 
            materialsIds: t.Optional(t.Array(t.Numeric()))
        })
    })
    async updateProduction({ params, body, set }: { params: { id: number }, body: { isReady: boolean, status: Status, title: string, materialsIds?: number[] }, set: Context['set'] }) {
        const findProduction = await orm.findOne(Productions, params.id);


        if(!findProduction) return responseHelpres.failureNotFound({ notFoundText: 'Производство не найдено', set });

        findProduction.isReady = body.isReady;
        findProduction.status = body.status;
        findProduction.title = body.title;

        if(body.materialsIds && body.materialsIds.length > 0) {
            const materials = await orm.find(Materials, { id: { $in: body.materialsIds } });
            findProduction.materials.set(materials);
        };

        await orm.flush();

        return responseHelpres.successWithData({ data: findProduction, set })
    };

    @Delete('/production/:id', {
        params: t.Object({
            id: t.Numeric(),
        }),
    })
    async deleteProduction({ params, set }: { params: { id: number }, set: Context['set'] }) {
        const { id } = params;
        const production = await orm.findOne(Productions, id);

        if(!production) return responseHelpres.failureNotFound({ notFoundText: 'Производство не найдено', set });

        await orm.removeAndFlush(production);

        return responseHelpres.successWithoutData({ set })
    };

    @Get('/providers')
    async getProviders({ set }: { set: Context['set'] }) {
        const providers = await orm.findAll(Providers, {
            populate: ['*'],
        });
        return responseHelpres.successWithData({ data: providers, set })
    };

    @Post('/provider', {
        body: t.Object({
            name: t.String(),
        })
    })
    async createProvider({ body, set }: { body: { name: string, deliveryId: number }, set: Context['set'] }) {
        const createProvider = new Providers(body);

        await orm.persistAndFlush(createProvider);

        return responseHelpres.successWithData({ data: createProvider, set })
    };

    @Put('/provider/:id', {
        body: t.Object({
            name: t.String(),
            deliveriesIds: t.Array(
                t.Number(),
            ),
        }),
        params: t.Object({
            id: t.Numeric(),
        }),
    })
    async updateProvider({ params, body, set }: { params: { id: number }, body: { name: string, deliveriesIds: number[] }, set: Context['set'] }) {
        const findProvider = await orm.findOne(Providers, params.id, {populate: ['*']});

        if(!findProvider) return responseHelpres.failureNotFound({ notFoundText: 'Поставщик не найден', set });

        findProvider.name = body.name;

        if(!!body.deliveriesIds && body.deliveriesIds.length > 0) {
            const delivires: Ref<Delivery> = [];

            for(const deliveryId of body.deliveriesIds) {
                const delivery = await orm.findOne(Delivery, deliveryId);

                if(!delivery) return responseHelpres.failureNotFound({ notFoundText: 'Доставка не найдена', set });

                delivires.push(delivery);
            };

            findProvider.deliveries.set(delivires);
        };

        await orm.flush();

        return responseHelpres.successWithData({ data: findProvider, set });
    };

    @Delete('/provider/:id', {
        params: t.Object({
            id: t.Numeric(),
        }),
    })
    async deleteProvider({ params, set }: { params: { id: number }, set: Context['set'] }) {
        const { id } = params;
        const provider = await orm.findOne(Providers, id);

        if(!provider) return responseHelpres.failureNotFound({ notFoundText: 'Поставщик не найден', set });

        await orm.removeAndFlush(provider);

        return responseHelpres.successWithoutData({ set })
    };
}   