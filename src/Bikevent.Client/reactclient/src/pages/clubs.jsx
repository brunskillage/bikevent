import { MsgA } from './../partials/wrappers/msg'
import { useDispatch, useSelector } from 'react-redux';
import { setClubs } from '../store/thunks';
import { useEffect } from 'react';
import { LoadingA } from '../partials/wrappers/loading';
import { NavLink } from 'react-router-dom';

export const Clubs = (args) => {
    const dispatch = useDispatch()
    const clubs = useSelector(state => state.club.clubs)
    const loading = useSelector(state => state.util.isLoading)

    useEffect(() => {

        dispatch(setClubs())
    }, [])

    const onReloadClick = () => {
        dispatch(setClubs())
    }

    return (<>
        <div className='clubs'>
            <h3>Clubs </h3>
            <NavLink className="btn btn-a btn-sm" to="/club/add">+Add</NavLink>
            <LoadingA isLoading={loading}></LoadingA>
            {clubs && clubs.length ? <>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>President/Owner</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clubs.map(club => {
                            return <tr key={club.id}>
                                <td>{club.nameOf}</td>
                                <td>{club.president}</td>
                                <td><NavLink className="btn btn-a btn-sm" to={`/club/${club.id}`} >View</NavLink>&nbsp;<NavLink className="btn btn-a btn-sm" to={`/club/${club.id}/edit`}>Edit</NavLink></td>
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