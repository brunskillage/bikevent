import { MsgA } from './../partials/wrappers/msg'
import { useDispatch, useSelector } from 'react-redux';
import { setClubs } from '../store/thunks';
import { useEffect } from 'react';

export const Clubs = (args) => {
    const dispatch = useDispatch()
    const clubs = useSelector(state => state.club.clubs)

    useEffect(() => {
        dispatch(setClubs())
    }, [])

    return (<>
        <div className='rides'>
            <h3>Clubs</h3>
            <MsgA>Select your club </MsgA>
            {clubs && clubs.length ? <>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>President/Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clubs.map(club => {
                            return <tr key={club.id}>
                                <td>{club.nameOf}</td>
                                <td>{club.president}</td>
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