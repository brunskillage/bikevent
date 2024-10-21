/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ValidationResponse {
    error: string
    field: string
}

export class BvError {
    constructor(public field: string, public error: string) {
    }
}

// export class BvResult {
//     constructor(public errors: BvError[] = [], public data: any = {}) {
//     }
// }

export class BvDbResult {
    constructor(public error: string, public data: any) {
    }
}
