'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUserSchema, createUserSchema } from './schemas/create-user-schema'
import { createUserWithCredentials } from './actions/create-user-action'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type FormData = CreateUserSchema

export default function CreateUser() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(createUserSchema),
    })

    const router = useRouter()

    const onSubmit = async (data: FormData) => {
        const result = await createUserWithCredentials(data)
        if (result.success) {
            toast.success('Tạo người dùng thành công!')
            router.refresh()
        } else {
            toast.error('Tạo người dùng thất bại!')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            
            <input {...register('name')} placeholder="Name" className="border p-2" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            <input {...register('email')} placeholder="Email" className="border p-2" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <input {...register('password')} type="password" placeholder="Mật khẩu" className="border p-2" />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Đăng ký
            </button>
        </form>
    )
}
