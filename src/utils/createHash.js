import bcrypt from 'bcrypt'

export function createHash(pass) {
    return bcrypt.hashSync(String(pass), bcrypt.genSaltSync(5))
}