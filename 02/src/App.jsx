import { useState } from "react";

import SideBar from "./components/Sidebar";
import { NoProjectSelected } from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [mode, setMode] = useState('NO_PROJECT'); // NO_PROJECT, SELECTED_PROJECT, NEW_PROJECT
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  function selectProject(projectId) {
    const project = projects.find(p => p.id === projectId)
    setSelectedProject(project);
    setMode('SELECTED_PROJECT');
  }

  function startNewProject() {
    setMode('NEW_PROJECT');
  }

  function addTask(project) {
    return function(task) {
      project.tasks.unshift(task);
      setProjects((oldProjects) => {
        return [...oldProjects];
      });
    }
  }

  function deleteProject(project) {
    return function() {
      setProjects((oldProjects) => {
        return oldProjects.filter(p => p.id !== project.id);
      });
    }
  }

  function deleteTask(project) {
    return function(task) {
      const newTasks = project.tasks.filter(t => t !== task);
      project.tasks = newTasks;
      setProjects((oldProjects) => {
        return [...oldProjects];
      });
    }
  }

  function cancelNewProject() {
    setMode('NO_PROJECT');
  }

  function saveNewProject(projectDescription) {
    setProjects(oldItems => [projectDescription, ...oldItems]);
    setMode('NO_PROJECT');
  }

  let contentPage;
  switch (mode) {
    case 'NEW_PROJECT':
      contentPage = <NewProject onCanceled={cancelNewProject} onSaved={saveNewProject} />;
      break;
    case 'SELECTED_PROJECT':
      contentPage = <SelectedProject project={selectedProject} 
      onProjectDeleting={deleteProject(selectedProject)}
      onTaskAdded={addTask(selectedProject)} 
      onTaskDeleted={deleteTask(selectedProject)} />;
      break;
    default:
      contentPage = <NoProjectSelected onNewProjectClicked={startNewProject} />;
      break;
  }

  return (
    <main className="flex min-h-screen h-full">
      <div className="w-1/3">
        <SideBar items={projects} onProjectSelected={selectProject} onNewProjectClicked={startNewProject}/>
      </div>
      <div className="w-2/3">
        {contentPage}
      </div>
    </main>
  );
}

export default App;
