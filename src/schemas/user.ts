import {email, z} from 'zod'

export const userSchema = z.object({
    username:z.string().min(3),
    email:z.email(),
    password:z.string()
})

export const userLoginSchema = z.object({
    email:z.email(),
    password:z.string().min(8)
})


export type UserType = z.infer<typeof userSchema>

