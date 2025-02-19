'use client'
import { DisableInput } from '@/components/common/inputs/DisableInputField';
import { DisableTextArea } from '@/components/common/inputs/DisableTextarea';
import PanelFaqsAddViewModel from '@/components/Panel/pages/faqs/add/PanelFaqsAddViewModel';
import { panelGetFaqDetail } from '@/helpers/handlers/apis/faq.api';
import { ICreateFaqInterface, IFaqInterface } from '@/interfaces/faq.interface';
import { Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
type Props = {
  params: Promise<{ id: number }>;
};
export default function PanelDetailFaq({ params }: any) {
  const { isLoading, loading, router, setIsLoading } = PanelFaqsAddViewModel();
  const [initialValues, setInitialValues] = useState<ICreateFaqInterface>({
    answer: '',
    is_active: 'ACTIVE',
    question: '',
  });
  useEffect(() => {
    async function fetchFaq() {
      try {
        const { id } = await params;
        const faq: IFaqInterface = (await panelGetFaqDetail(id)).data;

        // console.log(Faq);

        if (faq) {
          console.log('test', faq);
          setInitialValues((prev) => {
            return {
              answer: faq.answer,
              is_active: faq.is_active,
              question: faq.question,
            };
          });
        }
      } catch (error) {
        console.error('Error fetching Faq:', error);
      }
    }

    fetchFaq();
  }, [params]);
  return (
    <div className="">
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <DisableInput label="Question" value={initialValues?.question} />
        <DisableTextArea label="Answer" value={initialValues.answer} />

        <DisableInput label="Status" value={initialValues.is_active} />
      </div>
      <hr className="my-10 text-gray-50" />

      <div className="flex justify-end">
        <Link
          href={'/panel/faqs'}
          className="bg-gray-50 border border-gray-300 text-gray-700  px-5 py-3 rounded mb-6"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
