import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Plus } from "lucide-react"
import Topbar from "../components/Topbar.jsx"
import Modal from "../components/Modal.jsx"
import ProjectCard from "../components/ProjectCard.jsx"
import { useWorkspaces } from "../workspaces/WorkspaceContext.jsx"
import "../styles/projects.css"


export default function Workspaces() {
  const { onMenu } = useOutletContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpen2, setModalOpen2] = useState(false)
  const { workspaces, selectedWorkspace, setSelectedWorkspace, loadWorkspaces } = useWorkspaces()
  const visible = workspaces;
  const [inviteCode, setInviteCode] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  // handlesubmit add ws
  const addWs =async()=>{
    // e.preventDefault()
    setError("")
    setIsSubmitting(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/members/invitemember`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({invite_code: inviteCode}),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error in sending task");
      setSuccess("joined")
      await loadWorkspaces()
    } catch (error) {
      setError(error.message || "Error occured in adding workspace.");
    }finally {
      setIsSubmitting(false)
    }
  };
  // handle submit for creating new ws
  const createWs =async()=>{
    // e.preventDefault()
    setError("")
    setIsSubmitting(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/workspace/createworkspace`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({workspace_name: workspaceName}),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error in sending task");
      setSuccess("joined")
      await loadWorkspaces()
    } catch (error) {
      setError(error.message || "Error occured in adding workspace.");
    }finally {
      setIsSubmitting(false)
    }
  };
  return (
    <>
      <Topbar title="Explore Workspaces" subtitle={`${workspaces.length} workspaces you are in.`} onMenu={onMenu} />

      <div className="projects-toolbar">
        <div className="filter-chips" role="tablist" aria-label="Filter projects">  
        </div>
        <div className="projects-toolbar">
          <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={17} /> Add Workspace
          </button>  
          <button className="btn btn-primary" onClick={() => setModalOpen2(true)}>
          <Plus size={17} /> New Workspace
          </button>  
        </div>     
      </div>

      <div className="projects-grid">
        {visible.map((p) => (
          <ProjectCard key={p.workspace_id} project={p} who={"workspaces"} currentWorkspace={selectedWorkspace?.workspace_id} setCurrentWorkspace={(workspaceId) => setSelectedWorkspace(workspaces.find((workspace) => workspace.workspace_id === workspaceId) || null)}/>
        ))}
      </div>
      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add a workspace"
        subtitle="Join in the fun with projects and teammates."
      >
        <form
          className="auth-fields" onSubmit={(e) => { e.preventDefault(); addWs() }}
        >
          <div className="field">
            <label htmlFor="ws-name">Add invite code</label>
            <input id="ws-name" className="input" type="text" placeholder="e.g. myinvitecode" onChange={(e)=>{setInviteCode(e.target.value)}} required />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Join workspace
            </button>
          </div>
          {error && <p className="auth-error" role="alert">{error}</p>}
          {success ==="joined" && <p className="auth-success" role="alert">Successfully joined.</p>}
        </form>
      </Modal>
      {/* Modal */}
      <Modal
        open={modalOpen2}
        onClose={() => setModalOpen2(false)}
        title="Create workspace"
        subtitle="Group related projects and teammates together."
      >
        <form
          className="auth-fields" onSubmit={(e) => { e.preventDefault(); createWs() }}
        >
          <div className="field">
            <label htmlFor="ws-name">Enter workspace name</label>
            <input id="ws-name" className="input" type="text" placeholder="e.g. myworkspace" onChange={(e)=>{setWorkspaceName(e.target.value)}} required />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={() => setModalOpen2(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Create Workspace
            </button>
          {error && <p className="auth-error" role="alert">{error}</p>}
          {success ==="joined" && <p className="auth-success" role="alert">Successfully joined. Create your first project.</p>}
          </div>
        </form>
      </Modal>
    </>
  )
}
