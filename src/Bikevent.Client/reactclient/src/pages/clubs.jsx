import { useDispatch, useSelector } from 'react-redux';
import { setClubs } from '../store/thunks';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import { LoadingA } from '../partials/wrappers/loading';
import { ClubListItem } from '../partials/clubListItem';
import { PageTitle } from '../partials/wrappers/pageTitle';
import { Container } from 'react-bootstrap';
import { CenteredContent } from '../partials/wrappers/centeredContent';
import { PageContainer } from '../partials/wrappers/pageContainer';
import { MsgA } from '../partials/wrappers/msg';

export const Clubs = (args) => {
    const dispatch = useDispatch()
    const clubs = useSelector(state => state.club.clubs)
    const loading = useSelector(state => state.util.isLoading)

    useLayoutEffect(() => {
        dispatch(setClubs())
    }, [])

    return (<>
        <PageContainer>
            <PageTitle>Clubs</PageTitle>
            <LoadingA isLoading={loading}></LoadingA>

            {!loading && !clubs?.length && <p>No clubs found</p>}

            {!loading && clubs?.length ? <>
                <div className='d-inline-flex flex-wrap justify-content-center clubs'>
                    {clubs.map(club => {
                        return <ClubListItem key={club.id} club={club}></ClubListItem>
                    })}
                </div>
            </> : <></>}
        </PageContainer>
    </>);
}
