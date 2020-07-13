import React from 'react';
import { ReactComponent as ErrorImage } from '../assets/images/error.svg';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/HomeRounded';
import HelpIcon from '@material-ui/icons/HelpRounded';
import { Link } from 'react-router-dom';

function Error({ nav }) {
	return (
		<>
			<div>
				<Box
					width="100%"
					height={window.innerHeight}
					display="flex"
					justifyContent="center"
					alignItems="center"
					padding={1}
					flexDirection="column"
				>
					<ErrorImage width="100%" />
					{nav && (
						<Box width="100%" display="flex" justifyContent="center">
							<IconButton component={Link} to="/" color="primary">
								<HomeIcon />
							</IconButton>
							<IconButton component={Link} to="/help" color="primary">
								<HelpIcon />
							</IconButton>
						</Box>
					)}
				</Box>
			</div>
		</>
	);
}

export default Error;
