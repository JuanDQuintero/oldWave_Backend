import { Router } from 'express';


const router = Router();

router.post('', (req, res) => {
    res.json({
        "add": "create user"
    })
})

export default router;