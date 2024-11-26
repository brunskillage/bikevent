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
                    <li>
                        <a className='link' href="https://react-bootstrap.github.io/docs/layout/grid">React Bootstrap</a></li>
                    <li><a className="link" href="/swagger/index.html" target="_blank">API Browser</a>
                    </li>
                    <li>
                        <a className="link" href="https://getbootstrap.com/docs/5.3/getting-started/introduction/" target="_blank">Bootstrap</a></li>
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
                        <a className="link" href="https://docs.fluentvalidation.net/en/latest/" target="_blank">Fluent Validation</a></li>
                    <li>
                        <a className="link" href="https://react-hook-form.com/" target="_blank">React hook forms</a></li>
                    <li>
                        <a className="link" href="https://github.com/brunskillage/bikevent/tree/main/src" target="_blank">Github Source</a></li>
                    <li>
                        <a className='link' href="/tester">Test Page</a></li>
                    <li>
                        <a className='link' href="/template">Template Page</a></li>
                    <li>
                        <a className='link' href="https://flexbox.malven.co/">Flexbox</a></li>
                    <li>
                        <a className='link' href="https://192.168.1.74:7186/api/v1/config">Dev Setup - Trust cert</a></li>
                    <li>
                        .env<br></br>
                        REACT_APP_BASE_URL = {process.env.REACT_APP_BASE_URL}

                    </li>
                </ul>

                <code>
                    {JSON.stringify(appConfig)}
                </code>
            </>
            }
        </div>
    </>);
}
