/** @format */

import { Router } from "express";
import panelTransactionController from "../../controllers/panel/transaction.controller"
import { verifyUser } from "../../middalewares/auth.middleware";

export const panelTransactionRouter = () => {
    const router = Router();

    router.get("/",  panelTransactionController.getTransactions);
    // router.post("/",  panelTransactionController.createTransaction);
    router.get("/:id",  panelTransactionController.getTransactionById);
    // router.put("/:id",  panelTransactionController.updateTransaction);
    // router.delete("/:id",  panelTransactionController.deleteTransaction);

    return router;
};
