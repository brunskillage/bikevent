import { useDispatch, useSelector } from 'react-redux';
import { setClubRides } from '../store/thunks';
import { useEffect } from 'react';
import { LoadingA } from '../partials/wrappers/loading';
import { useParams } from 'react-router-dom';
import { ADD_RIDE_TO_CLUB, VIEW_CLUB } from '../lib/common';
import { LinkButton } from '../partials/wrappers/linkButton';
import { PageTitle } from '../partials/wrappers/pageTitle';
import { RideListItem } from '../partials/rideListItem';
import { SubMenu } from '../partials/wrappers/subMenu';
import { PageContainer } from '../partials/wrappers/pageContainer';
import { Table } from 'react-bootstrap';

export const Rides = (args) => {

    const dispatch = useDispatch()
    const rides = useSelector(state => state.ride.rides)
    const club = useSelector(state => state.club.selectedClub)
    const util = useSelector(state => state.util)
    const { clubId } = useParams()

    useEffect(() => {
        if (clubId) {
            dispatch(setClubRides(clubId))
        }

    }, [])

    return (<>
        <div className='eventsPage'>
            <PageTitle >{("Rides for " + club?.nameOf)}</PageTitle>
            <SubMenu>
                <LinkButton path={VIEW_CLUB.replace(":clubId", clubId)} text="Club Page"></LinkButton>
                <LinkButton path={ADD_RIDE_TO_CLUB.replace(":clubId", clubId)} text="Add"></LinkButton>
            </SubMenu>

            <PageContainer>
                <LoadingA isLoading={util?.loading}></LoadingA>
                {!util?.loading && rides && rides.length ? <>
                    <div className='rides'>
                        <Table className='table-responsive align-middle' size="sm">
                            {/* <table className="table table-responsive align-middle"> */}
                            <thead>
                                <th>When</th>
                                <th>More</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {rides.map(ride => {
                                    return <RideListItem key={ride.id} {...ride}></RideListItem>
                                })}
                            </tbody>


                        </Table>

                    </div>
                </> : <>
                    <p>No ridea found</p>
                </>}
            </PageContainer>
        </div>
    </>);
}
