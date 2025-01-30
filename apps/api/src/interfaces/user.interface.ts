import { IsVerified, Role } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"

export interface UserLogin {
    id: number
    name: string
    email: string
    phone?: string | null
    password?: string
    profile_photo?: string | null
    referral_code: string
    point: Decimal
    is_verified: IsVerified
    role: Role
}