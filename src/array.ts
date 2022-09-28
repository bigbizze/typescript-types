



export type ReverseArray<T extends any[], R extends any[] = []> =  ReturnType<T extends [infer F, ...infer L] ? () => ReverseArray<L,[F,...R]> : () => R>




