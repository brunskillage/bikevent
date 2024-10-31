import { useDispatch, useSelector } from 'react-redux';
import { setClubs } from '../store/thunks';
import { useEffect } from 'react';
import { LoadingA } from '../partials/wrappers/loading';
import { ClubListItem } from '../partials/clubListItem';

export const Clubs = (args) => {
    const dispatch = useDispatch()
    const clubs = useSelector(state => state.club.clubs)
    const loading = useSelector(state => state.util.isLoading)

    useEffect(() => {
        dispatch(setClubs())
    }, [])

    return (<>
        <div className='clubsPage'>
            <h3>Clubs </h3>

            <LoadingA isLoading={loading}></LoadingA>
            <div className="clubData">
                {clubs && clubs.length ? <>
                    {clubs.map(club => {
                        return <ClubListItem key={club.id} club={club}></ClubListItem>
                    })}

                </> : <>
                    <p>No clubs found</p>
                </>}
            </div>
        </div>
    </>);
}