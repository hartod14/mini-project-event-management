// import { deleteTransactions, getTransactions } from "@/axios/repository/admin/transactions";
import ButtonAction from "@/components/common/buttons/PanelButtonAction";
import { LoadingContext } from "@/context/LoadingContext";
import { formatCurrency } from "@/helpers/format.currency";
import { convertEnumToString } from "@/helpers/format.text";
import { formatTimeOnly, formatDate } from "@/helpers/format.time";
import { panelGetTransactions } from "@/helpers/handlers/apis/transaction.api";
import { ITransactionInterface } from "@/interfaces/transaction.interface";
import { log } from "console";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function TransactionsListViewModel() {
    const loading = useContext(LoadingContext);
    const [page, setPage] = useState<number>(1)
    const [status, setStatus] = useState<string>('')
    const [limit, setLimit] = useState<number>(15)
    const [total, setTotal] = useState<number>(0)
    const [totalPage, setTotalPage] = useState<number>(0)
    const [table, setTable] = useState({
        head: ["event", "transaction number", "total price", "user", "transaction date", "payment status", "action"],
        body: [],
    });
    const router = useRouter();

    async function getTransactionList() {
        // loading?.setLoading(true);

        const body: any = [];

        const res = (await panelGetTransactions(status, page, limit));

        const data: ITransactionInterface[] = res.data
        const total_data: number = res.total_data

        if (data) {
            data.map((row, index) => {
                let date = formatDate(row.created_at)
                body.push([
                    row.event.name,
                    row.transaction_number,
                    formatCurrency(row.total_price),
                    row.user.name,
                    date,
                    convertEnumToString(row.payment_status),
                    <ButtonAction
                        key={"button"}
                        onUpdate={() => {
                            router.push(`/panel/transactions/edit/${row.id}`);
                        }}
                    />,
                ]);
            });

            setTotal(total_data)
            setTotalPage(Math.ceil(total_data / limit))
            setTable({
                ...table,
                body: body,
            });
            // loading?.setLoading(false);
        }
    }

    useEffect(() => {
        getTransactionList();
    }, [page, limit,status]);

    return {
        setPage,
        setLimit,
        setStatus,
        status,
        table,
        router,
        page,
        limit,
        total,
        totalPage,
    };
};
