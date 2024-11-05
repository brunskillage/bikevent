import { useDispatch, useSelector } from 'react-redux';
import { setClubRides } from '../store/thunks';
import { useEffect } from 'react';
import { LoadingA } from '../partials/wrappers/loading';
import { useParams } from 'react-router-dom';
import { ADD_RIDE_TO_CLUB, VIEW_CLUB } from '../lib/common';
import { LinkButton } from '../partials/wrappers/linkButton';
import { PageTitle } from '../partials/wrappers/pageTitle';
import { RideListItem } from '../partials/rideListItem';

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
        <div className='ridesPage'>
            <PageTitle title={("Rides for " + club?.nameOf)}>
                <LinkButton path={VIEW_CLUB.replace(":clubId", clubId)} text="Club Page"></LinkButton>
                <LinkButton path={ADD_RIDE_TO_CLUB.replace(":clubId", clubId)} text="Add"></LinkButton>
            </PageTitle>

            <LoadingA isLoading={loading}></LoadingA>
            {rides && rides.length ? <>
                <div className='rides'>
                    {rides.map(ride => {
                        return <RideListItem key={ride.id} {...ride}></RideListItem>
                    })}
                </div>
            </> : <>
                <p>No rides found</p>
            </>}

        </div >
    </>);
}
