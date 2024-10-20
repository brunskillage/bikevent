import { MsgA } from './../partials/wrappers/msg'
import { useDispatch, useSelector } from 'react-redux';
import { setRides } from '../store/thunks';
import { useEffect } from 'react';
import { LoadingA } from '../partials/wrappers/loading';
import { NavLink } from 'react-router-dom';

export const Rides = (args) => {


    const dispatch = useDispatch()
    const clubs = useSelector(state => state.club.clubs)
    const loading = useSelector(state => state.util.isLoading)

    useEffect(() => {
        dispatch(setRides())
    }, [])


    return (<>
        <div className='rides'>
            <h3>Rides</h3>
            <NavLink className="btn btn-a btn-sm" to="/ride/add">+Add</NavLink>
            <MsgA>Select your ride</MsgA>
        </div>
    </>);
}
