import paginate, { DEFAULT_PAGE_SIZE } from "./paginate";

export const DEFAULT_SORT = "id:asc";

type StringLikeKeys<T> = {
    [K in keyof T]: T[K] extends string | null ? K : never;
}[keyof T];

export default async function filteredPaginate<
    /* eslint-disable @typescript-eslint/no-explicit-any */
    ModelDelegate extends {
        findMany: (...args: any) => any;
        count: (...args: any) => any;
    },
>(
    model: ModelDelegate,
    searchableFields: StringLikeKeys<
        Awaited<ReturnType<ModelDelegate["findMany"]>>[number]
    >[],
    searchParams: { [key: string]: string | string[] | undefined },
    pageSize = DEFAULT_PAGE_SIZE,
    defaultSort = DEFAULT_SORT,
    tableName?: string,
) {
    const searchParam =
        typeof searchParams.search === "string"
            ? searchParams.search
            : undefined;

    const sortParam = (searchParams.sort as string) || defaultSort;
    const [rawSortCol, rawSortTarget] = sortParam.split(":");

    const sortCol = rawSortCol || defaultSort.split(":")[0];

    const sortTarget = rawSortTarget === "desc" ? "desc" : "asc";

    const where = searchParam
        ? {
              OR: searchableFields.map((field) => ({
                  [field]: { contains: searchParam, mode: "insensitive" },
              })),
          }
        : {};

    return paginate(
        model,
        searchParams,
        pageSize,
        {
            where,
            orderBy: {
                [sortCol]: sortTarget,
            },
        },
        tableName,
    );
}
