import { t } from 'i18next';
import { InfoIcon } from 'lucide-react';
import React from 'react';
import { toSwissLocalDateTimeString } from '../../lib/date-time.utils';
import { type BaseModel } from '../../models/api/base.model';

const ActivityTraceInfo: React.FC<BaseModel> = ({ createdBy, modifiedBy, createdAt, modifiedAt }) => (
  <div className='flex items-center w-full mb-5 border border-solid border-primary-stroke rounded-sm text-primary-dark-stroke'>
    <InfoIcon className='size-5 mx-1'></InfoIcon>
    {(createdBy ?? modifiedBy) && (
      <div className='py-2 px-1'>
        <p className='text-xs'>{t('infoTextActivityTraceInfo')}</p>
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

export default ActivityTraceInfo;