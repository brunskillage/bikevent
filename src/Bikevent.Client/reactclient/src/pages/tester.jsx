import { useSelector } from "react-redux";
import { getTodos } from "../store/thunks";
import { useDispatch } from "react-redux";


export const Tester = (args) => {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.counter.todos)

    // {
    //     "userId": 1,
    //     "id": 1,
    //     "title": "delectus aut autem",
    //     "completed": false
    // },
    return (<>
        <div className='tester'>
            <h3>Test Page</h3>
            <p>
                <button onClick={() => dispatch(getTodos())}>Get Todos</button>
            </p>

            {todos.map(todo => {
                return <div key={todo.id}>{todo.title}</div>
            })}

        </div>
    </>);
}