import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog({ handleClose, open, title, message, btnYes, btnNo }) {
	const handleValue = (v) => {
		handleClose(v);
	};
	return (
		<Dialog
			disableBackdropClick
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{btnNo && (
					<Button onClick={() => handleValue(false)} color="primary">
						{btnNo}
					</Button>
				)}
				{btnYes && (
					<Button onClick={() => handleValue(true)} color="primary" autoFocus>
						{btnYes}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
}

export default React.memo(AlertDialog);
