/** @format */

import { NextFunction, Request, Response } from "express";
import { ErrorHandler, responseHandler, responsHandlerPagination } from "../../helpers/response.handler";
import panelTransactionService from "../../services/panel/transaction.service";
import transactionService from "../../services/panel/transaction.service";

class PanelTransactionController {
    async getTransactions(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await panelTransactionService.getList(req);
            const total_data = await panelTransactionService.countTotal(req)
            responsHandlerPagination(res, "success get transactions data", data, total_data);
        } catch (error) {
            next(error);
        }
    }

    async getTransactionById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await transactionService.getById(req);
            if (!data) throw new ErrorHandler("transaction not found", 404);
            responseHandler(res, "success fetching transaction with id", data);
        } catch (error) {
            next(error);
        }
    }

    // async createTransaction(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const data = await transactionService.create(req);
    //         responseHandler(res, "new transaction has been created", data, 201);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async updateTransaction(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const data = await transactionService.update(req);
    //         responseHandler(res, "transaction has been updated", data, 201);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async deleteTransaction(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         await transactionService.delete(req);
    //         responseHandler(res, "transaction has been deleted");
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

export default new PanelTransactionController();
