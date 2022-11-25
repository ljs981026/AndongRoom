// import React from 'react'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
// import { Link } from 'react-router-dom';
// import SideInfo from './sideinfo.jsx';
// import $ from 'jquery';

// class RoomList2 extends React.Component {
//     render() {
//         let title = this.props.title;
//         let index = this.props.index;
//         let addr = this.props.addr;
//         let type = this.props.type;
//         let isclick = this.props.isclick;
//         console.log(this.props.isclick)
//         return(
//             <Card sx={{ width: "400px", height: "250px", marginBottom: "20px", border: "none", margin: "5px auto"}}>
//                       <CardActionArea sx={{ width: "400px", height: "250px", opacity: "1" }} >
//                         <CardMedia
//                           component="img"
//                           height="160"
//                           image= {process.env.PUBLIC_URL + `/${type}/${index}/1.jpg`}
//                           alt="green iguana"
//                         />
//                         <CardContent>
//                           <Typography gutterBottom variant="h5" component="div">
//                             {title}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {addr}
//                           </Typography>
//                         </CardContent>
//                       </CardActionArea>
//                 </Card>
//         )
//     }
// }

// export default RoomList2;