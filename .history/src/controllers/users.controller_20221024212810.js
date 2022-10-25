import getConnection from '../database/database';
import {CREATE_USER, GET_USER} from '../database/queries'

const createUser = async (req, res) => {
    const {email, name, lastname, sub} = req.body
    const connection = await getConnection()
    const users = await connection.query(CREATE_USER, [email, name, lastname, sub])

    res.send(users)
}


export default {
    createUser
  };
  