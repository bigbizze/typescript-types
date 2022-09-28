import React, { Dispatch, FC, SetStateAction } from "react";

export type ReactJSX = boolean |
  React.ReactChild |
  React.ReactFragment |
  React.ReactPortal |
  null | undefined;

export type WithChildren<T = {}> = {
  children: ReactJSX
} & T;

export type JSXComponent<T = {}> = (props: T) => JSX.Element | null;

export type JSXWithChildren<T = {}> = JSXComponent<WithChildren<T>>;
export type FCWithChildren<T = {}> = FC<WithChildren<T>>;
export type TSetState<T> = Dispatch<SetStateAction<T>>;
