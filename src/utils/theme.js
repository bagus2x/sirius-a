import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: blue[300],
			main: blue[500],
			dark: blue[700],
		},
		secondary: {
			light: deepOrange[300],
			main: deepOrange[500],
			dark: deepOrange[700],
		},
	},
	overrides: {
		MuiButton: {
			root: {
				borderRadius: 20,
			}
		},
		MuiCssBaseline: {
			"@global" : {
				body: {
					backgroundColor : '#fff',
				}
			}
		}
	},
	custom: {
		centerElement: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}
	},
});

export { theme };
