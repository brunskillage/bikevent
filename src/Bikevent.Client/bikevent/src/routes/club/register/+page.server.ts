/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Actions } from "@sveltejs/kit"
import * as yup from 'yup';
import { extractErrors2 } from "$lib/common";
import { sequelize } from "../../../hooks.server";
import { QueryTypes } from "sequelize";

export const actions = {
    default: async (event) => {
        const formData = await event.request.formData()
        const formObject = Object.fromEntries(formData.entries())
        console.log('validating')

        try {
            await registerSchema.validate(formObject, { abortEarly: false });
            const dbParams = {
                nameOf: formObject.clubName,
                description: formObject.clubDescription,
                president: formObject.clubPresident,
                email: formObject.clubEmail
            }

            console.log('dbParams')

            console.log(dbParams)

            const sql =
                "insert into clubs (nameOf, description, president, email) values (:nameOf, :description, :president, :email)";

            await sequelize
                .query(sql, {
                    raw: false,
                    replacements: dbParams,
                    type: QueryTypes.INSERT,
                })

            console.log('created')

        } catch (err: any) {
            console.log(err)
            const errors = extractErrors2(err)
            return { errors, data: formObject }
        }

        return { errors: [] }


    }
} satisfies Actions

const registerSchema = yup.object({
    clubName: yup.string().required().min(3).max(255),
    clubPresident: yup.string().required().min(3).max(255),
    clubEmail: yup.string().required().email(),
    clubDescription: yup.string().notRequired().max(255)
});

