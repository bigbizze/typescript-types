import { PrevNum } from "./general";

export type StringInterpolatable = string | number | bigint | boolean | null | undefined;

export type RepeatInterpolatableTypeIntoString<
  T extends StringInterpolatable,
  D extends number,
  Sep extends string = "",
  Prefix extends string = "",
  Suffix extends string = ""> =
  [ PrevNum<D> ] extends [ never ] ? never
    : RepeatInterpolatableTypeIntoString<T, PrevNum<D>, Sep, Prefix, Suffix> extends never
      ? `${ T }${Suffix}`
      : `${Prefix}${ T }${PrevNum<D> extends number ? `${Sep}` : ""}${RepeatInterpolatableTypeIntoString<T, PrevNum<D>, Sep, Prefix, Suffix>}`


