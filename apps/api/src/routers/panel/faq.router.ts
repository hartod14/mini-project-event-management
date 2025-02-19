import { Router } from "express";
import pannelFaqController from "@/controllers/panel/faq.controller"
export const panelFaqRouter = () => {
    const router = Router();

    router.get("/",  pannelFaqController.getFaq);
    router.post("/",  pannelFaqController.createfaq);
    router.get("/:id",  pannelFaqController.getFaqById);
    router.put("/:id",  pannelFaqController.updatefaq);
    router.delete("/:id",  pannelFaqController.deleteFaq);

    return router;
};