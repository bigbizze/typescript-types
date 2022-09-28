import { RepeatInterpolatableTypeIntoString } from "./string-interpolation";

export type AutoIncrementId = `id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT`;

export type ForeignKeys<D extends number> = RepeatInterpolatableTypeIntoString<ForeignKey, D, "\n", "\n", "\n">;

export type ForeignKey = `FOREIGN KEY(${string}) REFERENCES ${string}(${string})`;

export type PrimaryKey = `PRIMARY KEY (id)`;

export type Created = `creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`;
export type Updated = `updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`;

export type CreateMySQLTable<
  TableName extends string,
  TableCols extends string,
  NumForeignKeys extends number | undefined = undefined,
  PrimaryKeyType extends "AUTO_INCREMENT" | string = "AUTO_INCREMENT">
  = `
CREATE TABLE IF NOT EXISTS ${TableName} (
    ${PrimaryKeyType extends "AUTO_INCREMENT" ? AutoIncrementId : string},
    ${TableCols},
    ${Created},
    ${Updated},
    ${PrimaryKey}${NumForeignKeys extends number ? `,
    ${ForeignKeys<NumForeignKeys>}` : ""}
);`;

/** ############################# EXAMPLE USAGE ############################# */
const postForeignKeys: ForeignKeys<2> = `
FOREIGN KEY(originalPostId) REFERENCES Post(id)
FOREIGN KEY(userId) REFERENCES user(id)
`;

const postTableCols = `
  originalPostId INTEGER DEFAULT NULL,
  userId INTEGER NOT NULL
`;

export type PostTableQuery = CreateMySQLTable<"Post", typeof postTableCols, 2>;

const postTableQuery: PostTableQuery = `
CREATE TABLE IF NOT EXISTS Post (
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ${postTableCols},
    creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    ${postForeignKeys}
);`

const userTableCols = `

`;

export type UserCreateTable = CreateMySQLTable<"User", typeof userTableCols>
const userCreateTableQuery: UserCreateTable = `
CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ${userTableCols},
    creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);`
