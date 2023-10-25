import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { Expire } from "./ExpireError"
import { SerializedError } from "@reduxjs/toolkit"

export const ErrorMsg = ({ delay, usersError }: { delay: number, usersError: FetchBaseQueryError | SerializedError | undefined }) => {
    if (usersError) {
        if ('status' in usersError) {
            const errMsg = 'error' in usersError ? usersError.error : JSON.parse(JSON.stringify(usersError.data))
            return (
                <Expire delay={delay}>
                    <div className={`absolute bg-red-500 block transition rounded-md py-2 px-3 top-0 -translate-x-[50%]`}>
                        <p className="text-white">{(errMsg?.birthday_date && errMsg?.birthday_date[0]) ||
                        (errMsg?.email && errMsg?.email[0])
                        || 'Error'}</p>
                    </div>
                </Expire>
            )
        }
    } else {
        return ('')
    }

}
