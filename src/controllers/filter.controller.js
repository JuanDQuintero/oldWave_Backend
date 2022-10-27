import getConnection from "../database/database";
import {
  GET_ALL_BRAND, GET_ALL_CATEGORIES, GET_ALL_STATE
} from "../database/queries";

const getAllFilters = async(req, res) => {
    try {
        const connection = await getConnection();
        const categories = await connection.query(GET_ALL_CATEGORIES);
        const brand = await connection.query(GET_ALL_BRAND)
        const state = await connection.query(GET_ALL_STATE)
    
        res.status(200).json({category: categories, brand, state})
        
    } catch (e) {
        res.status(400).end({error: "Ha ocurrido un error interno"})
    }
}


export default {
    getAllFilters
  };
  