import { QueryTypes } from "sequelize";
import { sequelize } from "../hooks.server";
import { BvDbResult } from "$lib/server/models";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const InsertClub = async (dbParams: any) => {

    const res1 = await FindClubByName(dbParams)
    console.log(res1)

    if (res1.data) {
        return new BvDbResult('Club Already Exists', null)
    }

    const sql = `insert into clubs (nameOf, description, president, email, websiteUrl)
     values 
    (:nameOf, :description, :president, :email, :websiteUrl)`

    const res2 = await sequelize
        .query(sql, {
            raw: false,
            replacements: dbParams,
            type: QueryTypes.INSERT,
        })

    if (res2 && res2.length) {
        return new BvDbResult('', { id: res2[0] });
    }

    return new BvDbResult('', {});
}

export const FindClubByName = async (dbParams: any) => {
    const sql = `select nameof from clubs where nameOf = :nameOf LIMIT 1`
    const res = await sequelize
        .query(sql, {
            raw: false,
            replacements: dbParams,
            type: QueryTypes.SELECT,
        })


    if (res && res.length) {
        return new BvDbResult('', res);
    }

    return new BvDbResult('', null);
}