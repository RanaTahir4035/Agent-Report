import { useState } from 'react';
import { useDeleteAgentMutation } from '../store/api/deleteAgentApi';

export const useDashboardTableHandlers = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [deleteAgent, { isLoading: isDeleting }] = useDeleteAgentMutation();

  const handleView = (item) => {
    console.log("View agent from Dashboard:", item);
    setSelectedAgent(item);
    setViewModalOpen(true);
  };

  const handleEdit = (item) => {
    console.log("Edit agent from Dashboard:", item);
  };

  const handleDelete = (item) => {
    console.log("Delete agent from Dashboard:", item);
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
      console.log("Confirming delete for agent from Dashboard:", selectedAgent);
      await deleteAgent(selectedAgent.id).unwrap();
      console.log("Agent deleted successfully from Dashboard");
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete agent from Dashboard:", error);
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
