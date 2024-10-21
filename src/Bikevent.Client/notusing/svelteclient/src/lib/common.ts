/* eslint-disable @typescript-eslint/no-explicit-any */
export function pascalToFriendly(str: string) {
    const addSpace = str.replace(/([A-Z])/g, ' $1').trim();
    return addSpace.charAt(0).toUpperCase() + addSpace.slice(1);
}

export const extractErrors = ({ inner }) => {
    return inner.reduce((acc: any, err: { path: any; message: any; }) => {
        return { ...acc, [err.path]: err.message };
    }, {});
};

export const extractErrors2 = ({ inner }) => {
    return inner.reduce((acc: any, err: { path: any; message: any; value: any }) => {
        return {
            ...acc, [err.path]: { error: pascalToFriendly(err.message), val: err.value }
        };
    }, {});
};