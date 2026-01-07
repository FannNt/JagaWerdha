import { z } from 'zod'

export const loginScheme  = z.object({
    'email': z.email(),
    'password': z.string().min(1)
})