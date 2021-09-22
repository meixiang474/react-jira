import React from "react";
import { Drawer, Button } from "antd";

interface ProjectModalProps {
  projectModalOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = (props) => {
  const { projectModalOpen, onClose } = props;
  return (
    <Drawer onClose={onClose} width="100%" visible={projectModalOpen}>
      <h1>Project Modal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};
