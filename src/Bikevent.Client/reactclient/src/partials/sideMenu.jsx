import { Nav, Offcanvas, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../store/utilSlice";
import { NavLink } from "react-router-dom";
import { FaArrowRightFromBracket, FaRegCircleUser } from "react-icons/fa6";
import { IoCalendarSharp } from "react-icons/io5";
import { FaTachometerAlt } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";

export const SideMenu = ({ children }) => {

  const isSideBarOpen = useSelector(state => state.util.isSideBarOpen)
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()

  function handleOnHide() {
    if (isSideBarOpen) {
      dispatch(toggleSideBar())
    }
  }

  return <>
    <Offcanvas show={isSideBarOpen} onHide={handleOnHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav>
          <Stack>
            {user && user.isLoggedIn ? <>
              <NavLink className="nav-link" to={"/clubs"}><FaWarehouse /> Clubs</NavLink>
              <NavLink className="nav-link" to={"/rides"}><FaTachometerAlt /> Rides</NavLink>
              <NavLink className="nav-link" to={"/events"}><IoCalendarSharp></IoCalendarSharp> Events</NavLink>
              <NavLink className="nav-link" to={"/logout"}> <FaArrowRightFromBracket></FaArrowRightFromBracket> Logout</NavLink>
              <NavLink className="nav-link text-right" to="/account"><FaRegCircleUser className='text-end' ></FaRegCircleUser > {user.nickName}</NavLink></>
              :
              <NavLink className="nav-link" to={"/login"}> Login</NavLink>
            }
          </Stack></Nav>
      </Offcanvas.Body>
    </Offcanvas>
  </>
};