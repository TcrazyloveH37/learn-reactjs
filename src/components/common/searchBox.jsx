import React from 'react';

const SearchBox = ({ onChange, ...rest }) => {
	return (
		<div className='form-group'>
			<input
				{...rest}
				type='text'
				placeholder='Search...'
				name='query'
				onChange={e => onChange(e.currentTarget.value)}
			/>
		</div>
	);
};

export default SearchBox;
