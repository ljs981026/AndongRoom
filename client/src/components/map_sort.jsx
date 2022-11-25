import { Link } from 'react-router-dom';

const MapSort = () => {
  return(
    <div>
      <ul>
        <Link to='/around/food'><li>밥집</li></Link>
        <Link to="/around/alchole"><li>술집</li></Link>
        <Link to="/around/play"><li>놀거리</li></Link>
        <Link to="/around/convinience"><li>편의시설</li></Link>
      </ul>
    </div>
  )
}

export default MapSort;