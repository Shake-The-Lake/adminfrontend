import { t } from 'i18next';
import { InfoIcon } from 'lucide-react';
import React from 'react';
import { toSwissLocalDateTimeString } from '../../lib/date-time.utils';
import { type BaseModel } from '../../models/api/base.model';

const ActivityTraceInfo: React.FC<BaseModel> = ({ createdBy, updatedBy, createdAt, updatedAt }) => (
  <div className='flex items-center w-full mb-5 border border-solid border-primary-stroke rounded-sm text-primary-dark-stroke'>
    <InfoIcon className='size-5 mx-1'></InfoIcon>
    {(createdBy ?? modifiedBy) && (
      <div className='py-2 px-1'>
        <p className='text-xs'>{t('infoTextActivityTraceInfo')}</p>
        {(createdBy && createdAt) && (
          <p className='text-xs'>{t('createdBy')}: {createdBy} {t('on')}: {toSwissLocalDateTimeString(createdAt)} </p>
        )}
        {(updatedBy && updatedAt) && (
          <p className='text-xs'>{t('modifiedBy')}: {updatedBy} {t('on')}: {toSwissLocalDateTimeString(updatedAt)}</p>
        )}
      </div>
    )}
  </div>
);

export default ActivityTraceInfo;