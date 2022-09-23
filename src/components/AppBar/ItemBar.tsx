import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { useState } from 'react';

interface Props {
	classes: any;
	icon: JSX.Element;
	name: string;
}

const ItemBar = ({ classes, icon, name }: Props) => {
	const [open2, setOpen2] = useState(true);

	const handleClick = () => {
		setOpen2(!open2);
	};
	return (
		<List>
			<ListItemButton onClick={handleClick}>
				<ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
				<ListItemText primary={name} />
				{open2 ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open2} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary='Starred' />
					</ListItemButton>
				</List>
			</Collapse>
		</List>
	);
};

export default ItemBar;
