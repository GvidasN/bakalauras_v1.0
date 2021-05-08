import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    style: {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "left",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    },
    phantom: {
        display: 'block',
        padding: '20px',
        height: '60px',
        width: '100%',
    },
    copyright: {
        fontSize: "60%",
        display: "inline-block",
        float: "right"
    },
    text: {
        fontSize: "60%",
        display: "inline-block",
        float: "left"
    }
  }));


export default function Footer() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.phantom} />
            <div className={classes.style}>
                <p className={classes.text}>Daugiau informacijos apie sistemą galite gauti susisiekę numeriu.: +3706666666</p>
                <p className={classes.copyright}>Copyright &copy; by Gvidas Norvilis. All rights reserved</p>
            </div>
        </div>
    )
}
