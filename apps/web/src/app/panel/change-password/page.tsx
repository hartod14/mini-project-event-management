'use client';
import { InputField } from '@/components/common/inputs/InputField';
import { LoadingContext } from '@/context/LoadingContext';
import { changePassword, forgetPassword, updateUserNew } from '@/helpers/handlers/apis/auth';
import { changePasswordValidator } from '@/validators/auth.validator';

import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';

export default function PanelChangePassword() {
  const initChangePassword = {
    password: '',
    new_password: '',
    confirm_new_password: '',
  };
  const loading = useContext(LoadingContext);
  const router = useRouter();
  const { data: session } = useSession();

  const handleForgetPassword = async (email: string) => {
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Email is required to reset the password!',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'A password reset email will be sent to your registered email address.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#ABABAB',
      confirmButtonText: 'Yes, send email!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          loading?.setLoading(true);

          const res: any = await forgetPassword({ email });

          if (res?.error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.error || 'Something went wrong, please try again later!',
            });
          } else {
            Swal.fire({
              title: 'Email Sent!',
              text: 'Check your email for password reset instructions.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong, please try again later!',
          });
        } finally {
          loading?.setLoading(false);
        }
      }
    });
  };



  return (
    <div>
      <Formik
        initialValues={initChangePassword}
        validationSchema={changePasswordValidator}
        // onSubmit={(values) => alert(JSON.stringify(values, null, 3))}
        onSubmit={async (values) => {
          Swal.fire({
            title: 'Submit this change password?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ABABAB',
            confirmButtonText: 'Yes, save it!',
            cancelButtonText: 'Back',
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                loading?.setLoading(true);

                const res: any = await changePassword(values).then(() => { });

                if (res?.error) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong, please try again later!',
                  });
                } else {

                  Swal.fire({
                    title: 'Saved!',
                    text: 'Your new password has been updated.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                  }).then(() => {
                    // router.push('/panel/banners');
                  });
                }
              } catch (error) {
                alert('something error');
              } finally {
                loading?.setLoading(false);
              }
            }
          });
        }}
      >
        {(formik) => (
          <Form>
            <div className="grid gap-6 mb-6 grid-cols-1">
              <InputField
                type="password"
                id="password"
                name="password"
                label="Password"
                placeholder=""
                required
              />
              <InputField
                type="password"
                id="new_password"
                name="new_password"
                label="New Password"
                placeholder=""
                required
              />
              <InputField
                type="password"
                id="confirm_new_password"
                name="confirm_new_password"
                label="Confirm New Password"
                placeholder=""
                required
              />
            </div>
            <Link
              href="#"
              className='font-bold text-blue-800'
              onClick={(e) => {
                e.preventDefault();
                handleForgetPassword(String(session?.user?.email));
              }}
            >Forget Password?</Link>

            <hr className="my-10 text-gray-50" />

            <div className="flex justify-end">
              <div className="flex gap-2">
                <div
                  onClick={() => router.back()}
                  className={
                    'bg-gray-50 border cursor-pointer border-gray-300 text-gray-400font-semibold px-5 py-3 rounded mb-6'
                  }
                >
                  Back
                </div>
                <button
                  type="submit"
                  className={`${!(formik.isValid && formik.dirty) || formik.isSubmitting
                    ? 'bg-gray-300 text-gray-400'
                    : 'bg-blue-900 text-white'
                    }   font-semibold px-5 py-3 rounded mb-6`}
                  disabled={
                    !(formik.isValid && formik.dirty) || formik.isSubmitting
                  }
                >
                  {formik.isSubmitting ? 'Processing...' : 'Submit'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
