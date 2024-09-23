import { QueryTypes } from "sequelize";
import { sequelize } from "../hooks.server";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const InsertClub = async (dbParams: any) => {
    const sql =
        "insert into clubs (nameOf, description, president, email) values (:nameOf, :description, :president, :email)";
    const res = await sequelize
        .query(sql, {
            raw: false,
            replacements: dbParams,
            type: QueryTypes.INSERT,
        })

    return res;
}