import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import classNames from 'classnames';
import { FC, useState } from 'react';
import DetalleXACI from './components/DetallexAci';
import General from './components/General';
import { sxStyled, useStyles } from './styles';

const ContabilidadXACI: FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState('DetallexACI');

	const handleChange = (event: any, newValue: any) => {
		setTab(newValue);
	};

	return (
		<div className={classNames(classes.wrapper, classes.base)}>
			<TabContext value={tab}>
				<TabList
					onChange={handleChange}
					aria-label='pestañas de modulo contabilidad'
					indicatorColor='primary'
					textColor='primary'>
					<Tab
						sx={sxStyled.tabName}
						label='Detalle por ACI'
						value={'DetallexACI'}
						wrapped
						classes={{ root: classes.tabLabel }}
					/>
					<Tab
						sx={sxStyled.tabName}
						label='General'
						value={'General'}
						wrapped
						classes={{ root: classes.tabLabel }}
					/>
				</TabList>
				<TabPanel value={'DetallexACI'} classes={{ root: classes.tabPanel }}>
					<DetalleXACI />
				</TabPanel>
				<TabPanel value={'General'} classes={{ root: classes.tabPanel }}>
					<General />
				</TabPanel>
			</TabContext>
		</div>
	);
};

export default ContabilidadXACI;
