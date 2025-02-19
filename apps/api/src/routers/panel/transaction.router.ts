/** @format */

import { Router } from "express";
import panelTransactionController from "../../controllers/panel/transaction.controller"
import { verifyUser } from "../../middalewares/auth.middleware";

export const panelTransactionRouter = () => {
    const router = Router();

    router.get("/", panelTransactionController.getTransactions);
    // router.post("/",  panelTransactionController.createTransaction);
    router.get("/:id", panelTransactionController.getTransactionById);
    // router.post("/send-email/:id", panelTransactionController.sendEmailTransactionStatus);
    router.patch("/:id", panelTransactionController.updateTransactionConfirmation);
    // router.delete("/:id",  panelTransactionController.deleteTransaction);

    return router;
};
