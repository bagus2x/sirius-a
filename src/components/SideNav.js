import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeRounded from '@material-ui/icons/HomeRounded';
import Description from '@material-ui/icons/DescriptionRounded';
import Person from '@material-ui/icons/PersonRounded';
import Pie from '@material-ui/icons/PieChartRounded';
import { ReactComponent as Profile } from '../assets/images/profile.svg';
import blue from '@material-ui/core/colors/blue';
import MoreVert from '@material-ui/icons/MoreVertRounded';
import IconButton from '@material-ui/core/IconButton';
import { Link, useRouteMatch } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
const useStyles = makeStyles((theme) => ({
	appBarVert: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		alignItems: 'center',
		height: () => `calc(100vh - ${2 * theme.spacing(4)}px)`,
		background: theme.palette.primary.main,
		color: '#fff',
		width: 120,
		zIndex: 0,
		borderRadius: 20,
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
	cutsomTab: {
		width: '80%',
		minWidth: 0,
		zIndex: 0,
		padding: 40,
		borderRadius: 20,
	},
	indicator: {
		background: blue[300],
		width: '80%',
		justifyContent: 'center',
		transform: 'translate(-11%)',
		borderRadius: 20,
		zIndex: -1,
	},
	tabsCont: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconNav: {
		color: '#fff',
	},
	containera: {
		display: 'flex',
		alignItems: 'center',
		height: '100vh',
		paddingLeft: theme.spacing(4),
	},
	stickToBottom: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
	},
}));

function UserNav() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const path = useRouteMatch().params.nav || '';
	// prevent flickering sidebar on render
	// 0 = width <= 600px, 1 = width > 600px
	const matcheDesktop = useMediaQuery('(min-width:960px)');
	const matcheMobile = useMediaQuery('(max-width:960px)');
	useEffect(() => {
		switch (path) {
			case '':
				return setValue(0);
			case 'task':
				return setValue(1);
			case 'analytics':
				return setValue(2);
			default:
				return 0;
		}
	}, [path]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	if (matcheMobile)
		return (
			<BottomNavigation
				classes={{ root: classes.stickToBottom }}
				value={value}
				onChange={handleChange}
				className={classes.root}
			>
				<BottomNavigationAction label="Home" value="home" icon={<HomeRounded />} />
				<BottomNavigationAction label="Task" value="task" icon={<Description />} />
				<BottomNavigationAction label="Analytic" value="analytics" icon={<Pie />} />
				<BottomNavigationAction label="Profile" value="profile" icon={<Person />} />
			</BottomNavigation>
		);

	if (matcheDesktop)
		return (
			<div className={classes.containera}>
				<div className={classes.appBarVert}>
					<div>
						<Profile />
					</div>
					<Tabs
						value={value}
						onChange={handleChange}
						variant="fullWidth"
						classes={{ indicator: classes.indicator, flexContainerVertical: classes.tabsCont }}
						orientation="vertical"
					>
						<Tab
							disableRipple
							classes={{ root: classes.cutsomTab }}
							icon={<HomeRounded />}
							component={Link}
							to="/u/"
						/>
						<Tab
							disableRipple
							classes={{ root: classes.cutsomTab }}
							icon={<Description />}
							component={Link}
							to="/u/task"
						/>
						<Tab
							disableRipple
							classes={{ root: classes.cutsomTab }}
							icon={<Pie />}
							component={Link}
							to="/u/analytics"
						/>
					</Tabs>
					<IconButton disableRipple className={classes.iconNav}>
						<MoreVert />
					</IconButton>
				</div>
			</div>
		);
	return '';
}

export default UserNav;
