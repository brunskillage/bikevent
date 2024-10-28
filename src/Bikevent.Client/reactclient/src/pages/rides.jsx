import { MsgA } from './../partials/wrappers/msg'
import { useDispatch, useSelector } from 'react-redux';
import { setClubRides } from '../store/thunks';
import { useEffect } from 'react';
import { LoadingA } from '../partials/wrappers/loading';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';
import { ADD_RIDE_TO_CLUB, EDIT_RIDE_FOR_CLUB, momentToLocal, VIEW_RIDE_FOR_CLUB } from '../lib/common';
import { LinkButton } from '../partials/wrappers/linkButton';

export const Rides = (args) => {

    const dispatch = useDispatch()
    const rides = useSelector(state => state.ride.rides)
    const club = useSelector(state => state.club.selectedClub)
    const loading = useSelector(state => state.util.isLoading)
    const { clubId } = useParams()

    useEffect(() => {
        if (clubId) {
            dispatch(setClubRides(clubId))
        }

    }, [])


    return (<>
        <div className='rides'>
            <h3>Rides for {club.nameOf}</h3>
            <LinkButton path={ADD_RIDE_TO_CLUB.replace("clubId", club.id)} text="Add"></LinkButton>
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
                                <td><LinkButton path={VIEW_RIDE_FOR_CLUB.replace(":rideId", ride.id).replace(":clubId", ride.clubId)} text={ride.title}></LinkButton></td>
                                <td>   {momentToLocal(ride.startsOn).format("h:mma, ddd Do MMM")}  ({moment(ride.startsOn).fromNow()})</td>
                                <td><LinkButton path={EDIT_RIDE_FOR_CLUB.replace(":rideId", ride.id).replace(":clubId", ride.clubId)} text="Edit"></LinkButton></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </> : <>
                <p>No rides found</p>
            </>}

        </div>
    </>);
}
