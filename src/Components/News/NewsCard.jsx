import { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './NewsStyle.css';
import NewsModal from './Modals/NewsModal.js';
import DeleteNewsModal from './Modals/DeleteNewsModal';

class NewsCard extends Component {
       
    
    render()
    {
        return (           
            <Card className={"card"}>
                <CardContent>
                    <Typography className={"date"} color="textSecondary" gutterBottom>{this.props.date.split("T")[0]}</Typography>
                    <Typography variant="h5" className={"newsTitle"}>{this.props.title}</Typography>
                   
                </CardContent>
                <CardActions>
                    <NewsModal title={this.props.title} date={this.props.date.split("T")[0]} message={this.props.message}/>
                    {
                        this.props.isAdmin
                        ?
                        <DeleteNewsModal newsId={this.props.newsId} title={this.props.title}/>
                        :
                        null
                    }
                </CardActions>
            </Card>          
        )
    }       
}

export default NewsCard;