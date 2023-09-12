import propTypes from 'prop-types';

export default function SearchBar({ onChange }) {
  return (
    <div className='searchbar-container'>
      <input
        type='text'
        onChange={(e) => onChange(e.target.value)}
        placeholder='جستوجوی باگ ها ...'
      />
    </div>
  );
}

SearchBar.propTypes = {
  onChange: propTypes.func,
};
