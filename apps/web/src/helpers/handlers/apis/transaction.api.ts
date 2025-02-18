"use server"

import { api } from "./_api";
import { getAccessToken } from "./auth";

export const panelGetTransactions = async (
    status: string,
    page: number,
    limit: number,
) => {

    return await api(
        `/panel/transactions?status=${encodeURIComponent(status)}&page=${page}&limit=${limit}`,
        "GET",
        undefined,
        await getAccessToken()
    );
};


export const panelGetTransactionDetail = async (id: number) => {
    return await api(
        `/panel/transactions/${id}`,
        "GET",
        undefined,
        await getAccessToken()
    );
}

// export const createTransaction = async (newTransaction: Record<string, unknown>) => {
//     try {
//         return await api(
//             "/panel/transactions",
//             "POST",
//             {
//                 body: newTransaction,
//                 contentType: "application/json"
//             },
//             await getAccessToken()
//         );
//     } catch (err) {
//         return { error: err instanceof Error ? err.message : "Network error" };
//     }
// };

// export const updateTransaction = async (id: number, updatedTransaction: Record<string, unknown>) => {
//     try {
//         return await api(
//             `/panel/transactions/${id}`,
//             "PUT",
//             {
//                 body: updatedTransaction,
//                 contentType: "application/json"
//             },
//             await getAccessToken()
//         );
//     } catch (err) {
//         return { error: err instanceof Error ? err.message : "Network error" };
//     }
// };

// export const deleteTransaction = async (id: number) => {
//     try {

//         return await api(
//             `/panel/transactions/${id}`,
//             "DELETE",
//             undefined,
//             await getAccessToken()
//         );

//     } catch (error) {
//         console.error("Delete failed:", error);
//         return { error: error instanceof Error ? error.message : "Network error" };
//     }
// };