import { MsgA } from './../partials/wrappers/msg'
import { useDispatch, useSelector } from 'react-redux';
import { setRides } from '../store/thunks';
import { useEffect } from 'react';
import { LoadingA } from '../partials/wrappers/loading';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { momentToLocal } from '../lib/common';

export const Rides = (args) => {

    const dispatch = useDispatch()
    const rides = useSelector(state => state.ride.rides)
    const loading = useSelector(state => state.util.isLoading)


    useEffect(() => {
        dispatch(setRides())
    }, [])


    return (<>
        <div className='clubs'>
            <h3>Rides</h3>
            <NavLink className="btn btn-a btn-sm" to="/ride/-/add">+Add</NavLink>
            <LoadingA isLoading={loading}></LoadingA>
            {rides && rides.length ? <>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Starts On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rides.map(ride => {
                            return <tr key={ride.id}>
                                <td><NavLink className="" to={`/ride/${ride.id}`} >{ride.title}</NavLink></td>
                                <td>   {momentToLocal(ride.startsOn).format("h:mma, ddd Do MMM")}  ({moment(ride.startsOn).fromNow()})</td>
                                <td><NavLink className="btn btn-a btn-sm" to={`/ride/${ride.id}`} >View</NavLink>&nbsp;<NavLink className="btn btn-a btn-sm" to={`/ride/${ride.id}/edit`}>Edit</NavLink></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </> : <>
                <p>No clubs found</p>
            </>}

        </div>
    </>);
}
