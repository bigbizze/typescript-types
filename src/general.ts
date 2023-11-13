import { ReverseArray } from "./array";

type PrevIdx = [ never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[] ];

type PrevIdxOffset = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[] ];

type GetArrayNumsOffset<D extends number> =
  D extends never
    ? never
    : GetArrayNumsOffset<PrevIdx[D]> extends never
      ? [PrevIdxOffset[D]]
      : [PrevIdxOffset[D], ...GetArrayNumsOffset<PrevIdx[D]>];

export type NextNumOld<D extends number = 3> = [ ...ReverseArray<GetArrayNumsOffset<D>>, never ][D];
export type NextNum<D extends number = 3> = GetArrayNumsOffset<D>[0];

export type PrevNum<D extends number> = PrevIdx[D];

export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

export type Join<K, P> = K extends string | number ?
  P extends string | number ?
    `${ K }${ "" extends P ? "" : "." }${ P }`
    : never : never;

export type Paths<T, D extends number = 10> = [ D ] extends [ never ] ? never : T extends object ?
  {
    [K in keyof T]-?: K extends string | number ?
    `${ K }` | Join<K, Paths<T[K], PrevNum<D>>>
    : never
  }[keyof T] : ""


export type GetNestedObjectTypes<T, D extends number = 10> = [ D ] extends [ never ] ? never : T extends object ?
  T | { [K in keyof T]-?: T[K] extends object ? T[K] | GetNestedObjectTypes<T[K], PrevNum<D>> : never }[keyof T] : never;

export type NestedKeyOf<T, D extends number = 10> = [ D ] extends [ never ] ? never : T extends object ?
  { [K in keyof T]-?: T[K] extends object ? NestedKeyOf<T[K], PrevNum<D>> : K }[keyof T] : "";
export type NonObjectKeysOf<T> = {
  [K in keyof T]: T[K] extends Array<any> ?
    K :
    T[K] extends object ? never : K
}[keyof T];

export type ValuesOf<T> = T[keyof T];
export type ObjectValuesOf<T> = Exclude<Extract<ValuesOf<T>, object>, Array<any>>;

export type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  : never) extends ((k: infer I) => void)
  ? I
  : never;

export type FlattenDeeplyNested<T> = Pick<T, NonObjectKeysOf<T>> &
  UnionToIntersection<ObjectValuesOf<T>>;

export type PickOne<T> = { [P in keyof T]: Record<P, T[P]> & Partial<Record<Exclude<keyof T, P>, undefined>> }[keyof T]
