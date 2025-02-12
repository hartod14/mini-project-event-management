/** @format */

import { Router } from "express";
import panelEventController from "../../controllers/panel/event.controller"
import { uploader } from "@/helpers/multer";

export const panelEventRouter = () => {
    const router = Router();

    router.get("/", panelEventController.getEvents);
    // router.post("/image", uploader().single("image"), panelEventController.addImageCloudinary);
    // router.get("/:slug", panelEventController.getProductBySlug);
    // router.post("/", panelEventController.createProduct);
    // router.delete("/:id", panelEventController.deleteevent);
    // router.patch("/:id", panelEventController.updateProduct);

    return router;
};
