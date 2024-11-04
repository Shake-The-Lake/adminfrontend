import { t } from 'i18next';
import React from 'react';

type UmatProps = {
  createdBy?: string;
  modifiedBy?: string;
  modifiedAt?: Date;
  createdAt?: Date;
};

const Umat: React.FC<UmatProps> = ({ createdBy, modifiedBy }) => (
  <div>
    {(createdBy ?? modifiedBy) && (
      <div className='mt-5'>
        <p className='text-xs'>{t('infoTextUmat')}</p>
        {createdBy && (
          <p className='text-xs'>{t('createdBy')}: {createdBy}</p>
        )}
        {modifiedBy && (
          <p className='text-xs'>{t('modifiedBy')}: {modifiedBy}</p>
        )}
      </div>
    )}
  </div>
);

export default Umat;