import { storage } from '@libs/firebase';
import clsx from 'clsx';
import { getDownloadURL, ref } from 'firebase/storage';
import React from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { useController } from 'react-hook-form';

const Degree = ({ control, user_id }) => {
  const { field, fieldState, formState } = useController({ control, name: 'degree' });
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  const onChange = async (e) => {
    if (e.target.files.length == 0) return;
    try {
      const fileRef = ref(storage, `degree/${e.target.files[0].name}-${user_id}`);
      const result = await uploadFile(fileRef, e.target.files[0]);
      const fileUrl = await getDownloadURL(fileRef);
      field.onChange(fileUrl);
    } catch (err) {
      console.log(err);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="grid-column-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Degree</label>
      <div className="flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg">
        <a
          href={field.value}
          target="_blank"
          rel="noreferrer"
          className={clsx('flex-1 p-2.5 truncate', {
            'hover:underline cursor-pointer': !!field.value,
            'pointer-events-none hover:no-underline': !field.value,
          })}
          onClick={() => {
            console.log('download');
          }}
        >
          {field.value ? 'File' : 'Empty'}
        </a>
        <label
          className={clsx(
            'block bg-blue-700 rounded-r-lg p-2.5 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-center cursor-pointer select-none relative',
            { 'bg-blue-400 cursor-not-allowed': uploading }
          )}
        >
          <p className={clsx({ 'opacity-0': uploading })}>Choose File</p>
          {uploading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg
                role="status"
                className="inline w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}
          <input
            type="file"
            accept="image/*,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
            hidden
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Degree;
