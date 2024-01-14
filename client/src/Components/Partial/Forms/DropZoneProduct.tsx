import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UseControllerProps, useController } from 'react-hook-form';

interface IProps extends UseControllerProps {}

const DropZoneProduct = (props: IProps) => {
  const { fieldState, field } = useController({ ...props, defaultValue: null });

  const onDrop = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acceptedFiles: any) => {
      acceptedFiles[0] = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
      field.onChange(acceptedFiles[0])
    },
    [field]
  )
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: {
        'image': ['image/*'],
      },
    onDrop
  });
  
  const activeBorderColor = isDragAccept
  ? 'border-green-800'
  : isDragReject
  ? 'border-red-800'
  : 'border-deep-brown opacity-70'


  return (
    <div
    {...getRootProps()}
    className={`flex flex-col items-center p-4 w-full border-4 border-dashed ${
     activeBorderColor
    }`}
  >
      <input {...getInputProps()} />
      <FontAwesomeIcon icon={faCloudUploadAlt} className="text-6xl mb-2" />
      { !isDragActive && 
        <p className="text-gray-600">
            Släpp din bild eller klicka och välj en bild
        </p>
      }
      {fieldState?.error && (
        <p className="text-red-800 text-xs italic mt-2">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default DropZoneProduct;
