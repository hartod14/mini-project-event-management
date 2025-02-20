import PanelButtonAction from '@/components/common/buttons/PanelButtonAction';
import { LoadingContext } from '@/context/LoadingContext';
import { formatCurrency } from '@/helpers/format.currency';
import { formatDate } from '@/helpers/format.time';
import {
  deleteVoucher,
  panelGetVouchers,
} from '@/helpers/handlers/apis/voucher.api';
import { IVoucherInterface } from '@/interfaces/Voucher.interface';
import { useRouter } from 'next/navigation';

import React, { useContext, useEffect, useState } from 'react';

export default function PanelVoucherListViewModel() {
  const loading = useContext(LoadingContext);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [limit, setLimit] = useState<number>(15);
  const [total, setTotal] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [table, setTable] = useState({
    head: ['name', 'price', 'start date', 'end date', 'action'],
    body: [],
  });
  const router = useRouter();

  async function getVoucherList() {
    // loading?.setLoading(true);

    const body: any = [];

    const res = await panelGetVouchers(search, page, limit);
    const data: IVoucherInterface[] = res.data;
    const total_data: number = res.total_data;

    if (data) {
      data.map((row, index) => {
        body.push([
          row.name,
          formatCurrency(row.price),

          formatDate(row.start_date),
          formatDate(row.end_date),
          <PanelButtonAction
            key={'button'}
            onDelete={async () => {
              await deleteVoucherList(row.id);
            }}
            onShow={() => {
              router.push(`/panel/vouchers/detail/${row.id}`);
            }}
            onUpdate={() => {
              router.push(`/panel/vouchers/edit/${row.id}`);
            }}
          />,
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

  async function deleteVoucherList(id: number) {
    try {
      loading?.setLoading(true);
      await deleteVoucher(id).then(() => {
        getVoucherList();
      });
    } catch (error) {
    } finally {
      loading?.setLoading(false);
    }
  }

  useEffect(() => {
    getVoucherList();
  }, [page, limit]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      getVoucherList();
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
