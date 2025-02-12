
import { Router } from "express"
import cityController from "@/controllers/city.controller";

export const cityRouter = () => {
    const router = Router()

    router.get('/', cityController.getCities);

    return router
}