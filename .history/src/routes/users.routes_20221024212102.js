import { Router } from 'express';


const router = Router();

router.post('/', (req, res) => {
    console.log(req.body)
    res.json({
        "add": "create user"
    })
})

export default router;