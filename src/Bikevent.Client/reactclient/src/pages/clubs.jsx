import { useDispatch, useSelector } from 'react-redux';
import { setClubs } from '../store/thunks';
import { useEffect } from 'react';
import { LoadingA } from '../partials/wrappers/loading';
import { ClubListItem } from '../partials/clubListItem';
import { PageTitle } from '../partials/wrappers/pageTitle';
import { Container } from 'react-bootstrap';
import { CenteredContent } from '../partials/wrappers/centeredContent';

export const Clubs = (args) => {
    const dispatch = useDispatch()
    const clubs = useSelector(state => state.club.clubs)
    const loading = useSelector(state => state.util.isLoading)

    useEffect(() => {
        dispatch(setClubs())
    }, [])

    return (<>

        <PageTitle title="Clubs"></PageTitle>
        <LoadingA isLoading={loading}></LoadingA>
        <CenteredContent>
            {clubs && clubs.length ? <>
                {clubs.map(club => {
                    return <ClubListItem key={club.id} club={club}></ClubListItem>
                })}

            </> : <>
                <p>No clubs found</p>
            </>}
        </CenteredContent>
    </>);
}
