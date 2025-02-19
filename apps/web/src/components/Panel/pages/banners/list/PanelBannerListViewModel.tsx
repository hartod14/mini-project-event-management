import PanelButtonAction from '@/components/common/buttons/PanelButtonAction';
import { LoadingContext } from '@/context/LoadingContext';
import { deleteBanner, panelGetBanners } from '@/helpers/handlers/apis/banner.api';
import { IBannerInterface } from '@/interfaces/banner.interface';
import { useRouter } from 'next/navigation';

import React, { useContext, useEffect, useState } from 'react';

export default function PanelBannerListViewModel() {
  const loading = useContext(LoadingContext);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [limit, setLimit] = useState<number>(15);
  const [total, setTotal] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [table, setTable] = useState({
    head: ['Name', 'status', 'action'],
    body: [],
  });
  const router = useRouter();

  async function getFaqList() {
    // loading?.setLoading(true);

    const body: any = [];

    const res = await panelGetBanners(search, page, limit);
    const data: IBannerInterface[] = res.data;
    const total_data: number = res.total_data;

    if (data) {
      data.map((row, index) => {
        body.push([
          row.name,

          row.is_active == 'ACTIVE' ? (
            <span className="text-green-600">Active</span>
          ) : (
            <span className="text-red-600">Inactive</span>
          ),
          <PanelButtonAction
            key={'button'}
            onDelete={async () => {
              await deleteBannerList(row.id);
            }}
            onShow={() => {
              router.push(`/panel/banners/detail/${row.id}`);
            }}
            onUpdate={() => {
              router.push(`/panel/banners/edit/${row.id}`);
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

  async function deleteBannerList(id: number) {
    try {
      loading?.setLoading(true);
      await deleteBanner(id).then(() => {
        getFaqList();
      });
    } catch (error) {
    } finally {
      loading?.setLoading(false);
    }
  }
  useEffect(() => {
    getFaqList();
  }, [page, limit]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      getFaqList();
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
