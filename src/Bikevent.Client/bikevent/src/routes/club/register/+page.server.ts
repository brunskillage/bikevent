/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Actions } from "@sveltejs/kit"
import * as yup from 'yup';
import { extractErrors2 } from "$lib/common";
import { FindClubByName, InsertClub } from "../../../db/dbclient";
import { BvDbResult } from "$lib/server/models";


function yupValidate() {

}

function dbValidata() {

}



export const actions = {
    default: async (event) => {
        const formData = await event.request.formData()
        const formObject = Object.fromEntries(formData.entries())
        console.log('validating')

        // validate and return errors if any
        try {
            await registerSchema.validate(formObject, { abortEarly: false });
        } catch (err: any) {
            console.log(err)
            let errors = extractErrors2(err)

            // check if exists already
            const res2: BvDbResult = await FindClubByName({ nameOf: formObject.clubName.trim() })
            if (res2.data) {
                errors = {
                    ...errors, clubName: { error: 'Club Name already Exists', val: '' }
                }
            }

            return { errors, data: formObject }
        }

        // insert into db if it doesnt exist
        try {
            const dbParams = {
                nameOf: formObject.clubName.trim(),
                description: formObject.clubDescription.trim(),
                president: formObject.clubPresident.trim(),
                email: formObject.clubEmail.trim(),
                websiteUrl: formObject.clubWebsite.trim()
            }

            const res1: BvDbResult = await InsertClub(dbParams)


            if (res1.error) {
                return { errors: { clubName: { error: res1.error } }, data: formObject }
            }

            return { errors: [], data: formObject }

        } catch (err: any) {
            return { errors: { clubName: { error: 'Unknown error inserting Club Sorry!' } }, data: formObject }
        }
    }
} satisfies Actions

const registerSchema = yup.object({
    clubName: yup.string().required().min(3).max(255),
    clubPresident: yup.string().required().min(3).max(255),
    clubEmail: yup.string().required().email(),
    clubDescription: yup.string().notRequired().max(255),
    clubWebsite: yup.string().notRequired().url()
});

