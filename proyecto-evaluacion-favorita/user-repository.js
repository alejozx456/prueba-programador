import {pool} from './database.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { HASH_NIVEL } from './config.js'

export class UserRepository {

    static async create({username,password}){
        //utilizar validaciones 
        Validation.username(username)
        Validation.password(password)

        const [rows]=await pool.query('select * from users where username=?',[username])

        if(rows.length>0){
            throw new Error('el username ya esta en uso')
        }

        const id=crypto.randomUUID() //crear un id unico
        const passwordHash=await bcrypt.hash(password,HASH_NIVEL); //hashear el password

        await pool.query('insert into users(id,username,password) values (?,?,?)',[id,username,passwordHash]);

        return id

    }

    static async login({username,password}){
        Validation.username(username)
        Validation.password(password)

        const [rows]=await pool.query('select * from users where username=?',[username])

        if(rows.length===0){
            throw new Error('el usuario no existe')
    
    }

    const user=rows[0]
    const valid=await bcrypt.compare(password,user.password)
    if(!valid){
        throw new Error('el password es incorrecto')
    }

    const {password:_,...userNotPassword}=user

    return userNotPassword
}

}

class Validation{
    // validaciones desde el backend

    static username(username){
        if(typeof username !== 'string'){
            throw new Error('Por favor ingrese el nombre de usuario')
        }
        if(username.length < 4){
            throw new Error('el username debe tener al menos 4 caracteres')
        }
    }

    static password(password){
        if(typeof password !== 'string'){
            throw new Error('por favor ingrese su contraseña')

        }
        if(password.length < 8){
            throw new Error('el password debe tener al menos 8 caracteres')

        }
    }
}