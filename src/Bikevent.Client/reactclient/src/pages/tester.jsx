import { useSelector } from "react-redux";
import { getTodos } from "../store/thunks";
import { useDispatch } from "react-redux";
import { PageTitle } from "../partials/wrappers/pageTitle";


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
        <PageTitle title="testPage">
            This is the submenu
        </PageTitle>
        <div className="container">
            <div className="row">
                <div className="col c12">

                    This is the content                        <div className='row'>
                        <div className='col c6 formContainer'>
                        </div>

                    </div>


                </div>
            </div>
        </div>

        <div className='testPage'>
            <p>
                <button onClick={() => dispatch(getTodos())}>Get Todos</button>
            </p>

            {todos.map(todo => {
                return <div key={todo.id}>{todo.title}</div>
            })}

        </div>
    </>);
}