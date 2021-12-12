import {Link} from 'react-router-dom';

const NotFound = (): React.ReactElement => (
    <>
        <h1>Oops! Page Not Found!</h1>
        <p>The Requested Page is Under Construction and Not Available</p>
        <Link to="/">Click Here</Link> to Visit the Home Page!
    </>
);

export default NotFound;
