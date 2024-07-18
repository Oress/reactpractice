import { useRef } from "react";
import Input from "./common/Input";

let _nextId = 0;

function nextId() {
    return _nextId++;
}

export default function NewProject({ onCanceled, onSaved }) {
    const titleRef = useRef();
    const desciptionRef = useRef();
    const dueDtRef = useRef();

    function createNewProject() {
        const project = {
            id: nextId(),
            title: titleRef.current.value,
            description: desciptionRef.current.value,
            dueDt: dueDtRef.current.value,
            tasks: []
        }
        onSaved(project);
    }

    return (
        <div className="p-16">
            <div className="flex justify-end">
                <button onClick={onCanceled} className='w-48 text-stone-800 hover:bg-gray-50 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2'>
                    Cancel
                </button>
                <button onClick={createNewProject} className='w-48 text-white bg-stone-800 hover:bg-stone-900 focus:outline-none focus:ring-4
             focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2'>
                    Save
                </button>
            </div>
            <div className="flex flex-col gap-4">
                <Input ref={titleRef} label="Title" />
                <Input ref={desciptionRef} label="Description" isMultiline="true" />
                <Input ref={dueDtRef} label="Due Date"  type="date" />
            </div>
        </div>

    );
}