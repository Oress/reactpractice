export default function SideBar({ items, onProjectSelected, onNewProjectClicked }) {
    return (
        <div className=" flex flex-col gap-y-8 bg-stone-800 py-16 px-12 items-center h-full">
            <h2 className="text-3xl text-gray-50 font-bold">Your Projects</h2>
            <button onClick={onNewProjectClicked} className='w-48 text-stone-800 bg-gray-50 hover:bg-gray-200 focus:outline-none focus:ring-4
             focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2'>
                + Add Project
            </button>
            <ul className=" flex flex-col ">
                {items.map(it => <li className="bg-stone-900 p-2 my-2 text-xl text-gray-50 font-bold hover:bg-stone-950 hover:cursor-pointer"
                key={it.id} 
                onClick={() => { onProjectSelected(it.id) }}>{it.title}</li>)}
            </ul>
        </div>

    );

}