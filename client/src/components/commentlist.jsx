import Comment from './comment';
import React from 'react';
import '../css/comment.css';

class CommentList extends React.Component {
    render() {
        console.log(this.props.c)
        console.log(typeof this.props.clist) 
        let clist = this.props.c
        console.log(typeof clist)
        const chat = clist.map((cl) => (
            <Comment 
                id={cl.id}
                content={cl.content}
            />
        ));
        console.log(chat);
        return(
            <div>{chat}</div>
        )
    }
}

export default CommentList;