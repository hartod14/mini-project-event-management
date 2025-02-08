/** @format */

import { Router } from "express";
import panelEventController from "../../controllers/panel/event.controller"

export const panelEventRouter = () => {
    const router = Router();

    router.get("/", panelEventController.getEvents);
    // router.get("/:slug", panelEventController.getProductBySlug);
    // router.post("/", panelEventController.createProduct);
    // router.delete("/:id", panelEventController.deleteProduct);
    // router.patch("/:id", panelEventController.updateProduct);

    return router;
};
