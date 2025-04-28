
import CreateUser from "@/features/users/create-user"
import { getUsers } from "@/features/users/queries"

export default async function UsersPage({ }) {
    const promises = Promise.all([
        getUsers()
    ])

    return (
        <div className=''>
            {/* Thêm component add new user */}
            <CreateUser />
            <div className="">
                {/* {console.log("Testttttttttt: ", promises)} */}
            </div>
        </div>
    )
}
