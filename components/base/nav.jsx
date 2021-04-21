import styles from '../../assets/css/header.module.css'
import {Typography,List,ListItem,ListItemText,ListItemIcon  } from '@material-ui/core' 
import AppsIcon from '@material-ui/icons/Apps';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({
    button: {
        justifyContent: 'space-between',
        color: 'inherit',
        padding: '0.775rem',
        fontSize: '1.125em',
        borderRadius: '6px'
    },
    text:{
        textTransform: 'capitalize'
    },
    icon:{
        display: 'none',
        minWidth: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        }
    },
}));


export default function Nav(){
    const classes = useStyles();

    return(

    <List  className={styles.navigation} role='navigation'>
        <Link href='/animes'>
            <ListItem className={classes.button}  button component='a'>
                
                <ListItemText primary="Каталог"  className={classes.text}/>
                <ListItemIcon className={classes.icon}>
                    <AppsIcon color="secondary"  className={classes.icon, styles.navigation_button__icon}/>
                </ListItemIcon>
                
            </ListItem>
        </Link> 
    </List>

    )
}