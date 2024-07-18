import noProjectsImg from '../assets/no-projects.png';


export function NoProjectSelected({onNewProjectClicked}) {
    return(
        <div className='flex flex-col gap-y-4 items-center m-8'>
            <img className='w-24' src={noProjectsImg} />
            <h1 className='text-2xl font-bold text-gray-800'>No project Selected</h1>
            <p>Select a project or get started with a new one</p>
            <button className='w-48 text-white bg-stone-800 hover:bg-stone-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2' onClick={onNewProjectClicked}>Create new Project</button>
        </div>
    );
}