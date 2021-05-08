import React from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
    title: {
      display: "inline-block",   
      fontSize: "140%",
      paddingRight: "5px"  
    },
    row: {      
        borderBottom: "1px solid",
        borderBottomColor: "#c90000",
        marginBottom: "1em",
        display: "inline-block"
    },   
    collapse: {
        marginBottom: "1em",
        marginTop: "1em"
    }
  }));

export default function AboutTableItem(props) {
    

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (      
        <div>
            <div className={classes.row}>
                <h4 className={classes.title}>{props.title}</h4>
                <IconButton className={classes.title} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </div>  
            <div className={classes.collapse}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <p>{props.message}</p>
                    </Box>
                </Collapse>
            </div>                      
            
  
        </div>
                           
    )          
}

