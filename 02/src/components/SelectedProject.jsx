import { useRef } from "react";
import Input from "./common/Input";

export default function SelectedProject({project, onTaskAdded, onTaskDeleted, onProjectDeleting}) {
    const taskRef = useRef();

    function addTask() {
        const value = taskRef.current.value;
        taskRef.current.value = null;
        onTaskAdded(value);
    }

    return (
        <div className="p-16 flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-3xl font-bold text-stone-800">{project.title}</h1>
                <small>{project.dueDt}</small>
                <p>{project.description}</p>
            </div>
            <hr />
            <div className="flex flex-col gap-y-2">
                <h2 className="text-2xl text-stone-800 font-bold">Tasks</h2>
                <div className="w-full">
                    <div className="flex w-full">
                        <Input ref={taskRef}  className="flex-auto"/>
                        <button onClick={addTask} className='w-32 text-stone-800 hover:bg-gray-50 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2'>
                            Add Task
                        </button>
                    </div>
                    <ul className="w-full">
                        {project.tasks.map(task => 
                        <li key={task} className="flex bg-stone-200 p-3 my-2 justify-between w-full">
                            <span>{task}</span>
                            <button onClick={() => onTaskDeleted(task)}>Clear</button>
                        </li>)}
                    </ul>
                </div>
            </div>
        </div>
    );

}