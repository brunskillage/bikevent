/* eslint-disable react/jsx-no-target-blank */

import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';

export const Footer = () => {

    const appConfig = useSelector(state => state.appConfig)


    return (<>
        <div className="footer">
            <hr />&copy; 2025 bikevent.com/nz
            {appConfig.isDevEnvironment && <>
                <h4>Dev only links</h4>
                <ul>
                    <li><a className="link" href="/swagger/index.html" target="_blank">API Browser</a>
                    </li>
                    <li>
                        <a className="link" href="http://192.168.1.140/phpMyAdmin/db_structure.php?server=1&db=bikeventdb" target="_blank">DB Browser</a></li>
                    <li>
                        <a className="link" href="https://mincss.com/" target="_blank">Min CSS</a></li>
                    <li>
                        <a className="link" href="https://mincss.com/" target="_blank">React</a></li>
                    <li>
                        <a className="link" href="https://reactrouter.com/en/main/start/overview/" target="_blank">React Router</a></li>
                    <li>
                        <a className="link" href="https://momentjs.com/" target="_blank">Moment</a></li>
                    <li>
                        <NavLink className='link' to="/tester">Test Page</NavLink></li>
                </ul>

                <pre>
                    {JSON.stringify(appConfig)}
                </pre>
            </>
            }
        </div>
    </>);
}
