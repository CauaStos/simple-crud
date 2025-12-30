import prisma from "../prisma";
import { redirectIfPageInvalid } from "../utils";

export type PaginatedResult<T> = {
    items: T[];
    pageCount: number;
    rowCount: number;
};

export const DEFAULT_PAGE_SIZE = 10;

export default async function paginate<
    ModelDelegate extends {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        findMany: (...args: any) => any;
        count: (...args: any) => any;
    },
>(
    model: ModelDelegate,
    searchParams: { [key: string]: string | string[] | undefined },
    pageSize = DEFAULT_PAGE_SIZE,
    args?: Parameters<ModelDelegate["findMany"]>[0],
    tableName?: string,
): Promise<
    PaginatedResult<
        Awaited<ReturnType<ModelDelegate["findMany"]>> extends (infer U)[]
            ? U
            : unknown
    >
> {
    const page = Number(searchParams?.page || 1);
    const where = (args as any)?.where ?? {};
    const hasFilters = Object.keys(where).length > 0;

    let rowCount = -1;

    if (!hasFilters && tableName) {
        // Otimização insana pra tabela grande (confia)
        //
        // Just so I remember:
        // If there isn't a WHERE condition and the tableName prop was passed,
        // we use an estimate instead of a real COUNT.
        //
        // Reason:
        //  - COUNT(*) on big tables == expensive as hell
        //
        // Tradeoffs:
        //  - It's not 100% precise
        //  - But it's really fast for pagination / dashboards

        const [result] = await prisma.$queryRawUnsafe<{ estimate: bigint }[]>(
            `SELECT reltuples AS estimate FROM pg_class WHERE relname = $1`,
            tableName,
        );
        rowCount = Number(result.estimate ?? -1);
    }

    // Falling back to a real count because:
    //  - WHERE exists? Then an estimate is not enough
    //  - The table was not analyzed (returns -1)
    //  - The estimate was unavailable (returns -1)
    //  - tableName wasn't passed, can't search for an estimate
    if (rowCount < 0 || hasFilters) rowCount = await model.count({ where });

    const pageCount = Math.max(1, Math.ceil(rowCount / pageSize));

    redirectIfPageInvalid(pageCount, searchParams);

    // Lembrete: Para tabelas maiores é melhor implementar paginação por cursor
    const items = await model.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        ...(args as object),
    });

    return { items, pageCount, rowCount };
}
