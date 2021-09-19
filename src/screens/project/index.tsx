import { Link, Route, Routes, Navigate } from "react-router-dom";
import { KanbanScreen } from "../kanban";
import { EpicScreen } from "../epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        {/* /projects/:projectId/kanban */}
        <Route path="/kanban" element={<KanbanScreen />} />
        <Route path="/epic" element={<EpicScreen />} />
        {/* 默认跳到kanban */}
        <Navigate to="kanban" />
      </Routes>
    </div>
  );
};
