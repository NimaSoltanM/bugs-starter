import { useState } from 'react';
import propTypes from 'prop-types';

export default function Form({ onSubmit }) {
  const priorities = ['بالا', 'متوسط', 'پایین'];

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(priorities[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      priority,
    };

    onSubmit(formData);
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='توضیحات راجب خطا'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          {priorities.map((priorityValue) => (
            <option key={priorityValue} value={priorityValue}>
              {priorityValue}
            </option>
          ))}
        </select>
        <button type='submit'>ثبت</button>
      </form>
    </div>
  );
}

Form.propTypes = {
  onSubmit: propTypes.func,
};
