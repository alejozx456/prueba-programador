import axios from 'axios'
import base64 from 'base-64'
import crypto from 'crypto'
import {pool} from './database.js'
import { API_USER, API_PASS, API_SANDBOX } from './config.js'

export class TransactionRepository {

    static async getTransactionById({idTransaction}){

        Validation.transactionId(idTransaction)

        const auth ='Basic '+base64.encode(`${API_USER}:${API_PASS}`)

        const { data } = await axios.get(`${API_SANDBOX}/integrations/getTransactionByIdStateResource`, {
            headers: { Authorization: auth, "Content-Type": "application/json" },
            params: { idTransaction }
          });

        if(data.code!==0){
            throw new Error(data.description)
        }

        return data.detail

    }

    static async getTransactionsByUser({idUser}){

        Validation.idUser(idUser)


        const [rows]=await pool.query('select id_transaction from transactions where id_user=?',[idUser])

        if(rows.length===0){
            throw new Error('no se encontraron transacciones')
        }

        return rows

    }

    static async createTransaction({idTransaction,idUser}){

        Validation.transactionId(idTransaction)
        Validation.idUser(idUser)

        const id=crypto.randomUUID()

        const [rows]=await pool.query('insert into transactions(id,id_transaction,id_user) values (?,?,?)',[id,idTransaction,idUser])

        if(rows.length===0){    
            throw new Error('no se pudo crear la transaccion')
    }

        return id

}

    

}

class Validation{
    static transactionId(idTransaction){
        if (typeof idTransaction !== "string" || idTransaction.length < 10) {
            throw new Error("El ID de transacción no es válido");
          }
    }

    static idUser(idUser){
        if (typeof idUser !== "string" || idUser.length < 10) {
            throw new Error("El ID de usuario no es válido");
          }
    }
}