import { useState } from 'react';

import propTypes from 'prop-types';

const statuses = ['جدید', 'در دست بررسی', 'بر طرف شده', 'بسته'];

export default function Card({
  id,
  title,
  priority,
  status,
  onUpdateStatus,
  onClick,
}) {
  const [selectedStatus, setSelectedStatus] = useState(status[0]);

  const [showFooter, setShowFooter] = useState(false);

  let priorityClass = '';
  if (priority === 'بالا') {
    priorityClass = 'high-priority';
  } else if (priority === 'متوسط') {
    priorityClass = 'medium-priority';
  } else if (priority === 'پایین') {
    priorityClass = 'low-priority';
  }

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    onUpdateStatus(id, e.target.value);
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h3>{title}</h3>
      </div>

      <div className='card-details'>
        <div>
          درجه اهمیت :{' '}
          <span className={`value chip ${priorityClass}`}>{priority}</span>
        </div>

        <div>
          وضعیت : <span className='value'>{status}</span>
        </div>

        <div>
          شناسه : <span className='value'>{id}</span>
        </div>

        <button onClick={() => setShowFooter(!showFooter)}>ویرایش</button>
      </div>

      {showFooter && (
        <div className='card-footer'>
          <select value={selectedStatus} onChange={handleStatusChange}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button onClick={() => onClick(id)}>حذف</button>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  id: propTypes.number,
  title: propTypes.string,
  priority: propTypes.string,
  status: propTypes.string,
  onUpdateStatus: propTypes.func,
  onClick: propTypes.func,
};
