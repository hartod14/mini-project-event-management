/** @format */

import { Router } from "express";
import panelEventController from "../../controllers/panel/event.controller"
import { verifyUser } from "../../middalewares/auth.middleware";

export const panelEventRouter = () => {
    const router = Router();

    router.get("/", panelEventController.getEvents);
    router.post("/", panelEventController.createEvent);
    router.get("/:id", panelEventController.getEventById);
    router.get("/:id/transaction", panelEventController.getListTransaction);
    router.put("/:id", panelEventController.updateEvent);
    router.delete("/:id", panelEventController.deleteEvent);

    return router;
};
