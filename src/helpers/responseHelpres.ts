import { Context } from "elysia";

export default {
    successWithData: ({ data, set }: { data: unknown, set: Context['set'] }) => {
        set.status = 200;

        return {
            data,
        }
    },
    successWithoutData: ({ set }: { set: Context['set'] }) => {
        set.status = 204;

        return;
    },

    failureNotFound: ({ notFoundText = 'Не найден!', set }: { notFoundText?: string, set: Context['set'] }) => {
        set.status = 404;

        return {
            error: notFoundText,
        };
    },
    failureWithError: ({ error, set }: { error: unknown, set: Context['set'] }) => {
        set.status = 400;

        return {
            error,
        }
    },
};