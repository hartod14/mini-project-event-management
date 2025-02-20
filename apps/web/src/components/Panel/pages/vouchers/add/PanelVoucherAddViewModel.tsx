import { LoadingContext } from '@/context/LoadingContext';
import { panelGetEvents } from '@/helpers/handlers/apis/event.api';
import { IEventInterface } from '@/interfaces/event.interface';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

export default function PanelVoucherAddViewModel() {
  const [isLoading, setIsLoading] = useState(false);
  const loading = useContext(LoadingContext);
  const [eventOption, setEventOptions] = useState<{
    label: string;
    value: string | number;
  }[]>();
  const router = useRouter();
  async function getEventList() {
    // loading?.setLoading(true);

    const body: any = [];

    const res = await panelGetEvents('', 1, 1000);

    const data: IEventInterface[] = res.data;

    if (data) {
      const tempOptionEvent = data.map((row) => {
        return {
          value: row.id,
          label: row.name,
        };
      });
      setEventOptions(tempOptionEvent);

      // loading?.setLoading(false);
    }
  }

  useEffect(()=>{
    getEventList()
  },[])
  return { isLoading, setIsLoading, router, loading,eventOption };
}
