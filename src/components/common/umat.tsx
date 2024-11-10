import { t } from 'i18next';
import { InfoIcon } from 'lucide-react';
import React from 'react';
import { toSwissLocalDateTimeString } from '../../lib/date-time.utils';

type UmatProps = {
  createdBy?: string;
  modifiedBy?: string;
  modifiedAt?: Date;
  createdAt?: Date;
};

const Umat: React.FC<UmatProps> = ({ createdBy, modifiedBy, createdAt, modifiedAt }) => (
  <div className='flex items-center w-full mb-5 border border-solid border-primary-stroke rounded-sm text-primary-dark-stroke'>
    <InfoIcon className='size-5 mx-1'></InfoIcon>
    {(createdBy ?? modifiedBy) && (
      <div className='py-2 px-1'>
        <p className='text-xs'>{t('infoTextUmat')}</p>
        {(createdBy && createdAt) && (
          <p className='text-xs'>{t('createdBy')}: {createdBy} {t('on')}: {toSwissLocalDateTimeString(createdAt)} </p>
        )}
        {(modifiedBy && modifiedAt) && (
          <p className='text-xs'>{t('modifiedBy')}: {modifiedBy} {t('on')}: {toSwissLocalDateTimeString(modifiedAt)}</p>
        )}
      </div>
    )}
  </div>
);

export default Umat;