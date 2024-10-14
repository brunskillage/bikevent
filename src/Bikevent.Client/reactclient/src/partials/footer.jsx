import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { appConfigContext } from "../App";



export const Footer = () => {


    var ctx = useContext(appConfigContext)

    return ( <>
        <div className="footer">       
        <hr/>&copy; 2025 bikevent.com/nz
            {ctx?.isDevEnvironment && <>
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
                    </ul>

                </>
            }
        </div>
    </> );
}
