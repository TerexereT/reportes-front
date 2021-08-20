import React, { Fragment } from 'react';

// ? components
import TableReports from '../components/table';
import SelectList from '../components/DateTime';

const Home: React.FC = () => {
	return (
		<Fragment>
			<div className='ed-container'>
				<div className='ed-item s-center m-left s-py-2'>
					<h2>Resportes dinamicos</h2>
				</div>
				<div className='ed-item s-py-2'>
					<SelectList />
				</div>
				<div className='ed-item s-to-center'>
					<TableReports />
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
