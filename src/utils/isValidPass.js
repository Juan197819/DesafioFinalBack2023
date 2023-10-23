import bcrypt from 'bcrypt'

export function isValidPass(pass, hash) {
    return bcrypt.compareSync(String(pass), hash)
} 