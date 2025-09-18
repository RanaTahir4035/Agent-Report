import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteAgentsAgentMutation } from '../store/api/deleteAgentsAgentApi';

export const useAgentsTableHandlers = () => {
  const navigate = useNavigate();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [deleteAgent, { isLoading: isDeleting }] = useDeleteAgentsAgentMutation();

  const handleView = (item) => {
    console.log("View agent from Agents page:", item);
    navigate(`/agent/${item.id}`);
  };

  const handleEdit = (item) => {
    console.log("Edit agent from Agents page:", item);
  };

  const handleDelete = (item) => {
    console.log("Delete agent from Agents page:", item);
    setSelectedAgent(item);
    setDeleteModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedAgent(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedAgent(null);
  };

  const confirmDelete = async () => {
    if (!selectedAgent) return;
    
    try {
      console.log("Confirming delete for agent from Agents page:", selectedAgent);
      await deleteAgent(selectedAgent.id).unwrap();
      console.log("Agent deleted successfully from Agents page");
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete agent from Agents page:", error);
    }
  };

  return {
    handleView,
    handleEdit,
    handleDelete,
    viewModalOpen,
    deleteModalOpen,
    selectedAgent,
    closeViewModal,
    closeDeleteModal,
    confirmDelete,
    isDeleting
  };
};
