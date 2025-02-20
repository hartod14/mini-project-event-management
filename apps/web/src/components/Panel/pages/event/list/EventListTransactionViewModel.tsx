import PanelButtonAction from '@/components/common/buttons/PanelButtonAction';
import { LoadingContext } from '@/context/LoadingContext';
import { formatCurrency } from '@/helpers/format.currency';
import { panelGetEventTransaction } from '@/helpers/handlers/apis/event.api';
import { IEventTransactionInterface } from '@/interfaces/event.interface';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

export default function EventListTransactionViewModel() {
  const params = useParams();
  console.log(params);
  const loading = useContext(LoadingContext);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [limit, setLimit] = useState<number>(15);
  const [total, setTotal] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [table, setTable] = useState({
    head: ['user', 'tiket', 'total'],
    body: [],
  });
  const router = useRouter();
  async function getEventList() {
    // loading?.setLoading(true);

    const body: any = [];

    const res = await panelGetEventTransaction(
      params.id?.toString(),
      page,
      limit,
    );

    const data: IEventTransactionInterface[] = res.data;
    const total_data: number = res.total_data;

    if (data) {
      data.map((row, index) => {
        body.push([
          row.user.name,
          `${row.transaction_tickets.map((row) => {
            return `${row.ticket_type.name} `;
          })}`,
          formatCurrency(Number(row.total_price)),
        ]);
      });

      setTotal(total_data);
      setTotalPage(Math.ceil(total_data / limit));
      setTable({
        ...table,
        body: body,
      });
      // loading?.setLoading(false);
    }
  }

  useEffect(() => {
    getEventList();
  }, [page, limit]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      getEventList();
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);
  return {
    setPage,
    setLimit,
    setSearch,
    search,
    table,
    router,
    page,
    limit,
    total,
    totalPage,
  };
}
