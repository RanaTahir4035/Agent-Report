
import { useState } from 'react';
import { useDeleteAgentMutation } from '../store/api/deleteAgentApi';

export const useTableHandlers = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [deleteAgent, { isLoading: isDeleting }] = useDeleteAgentMutation();

  const handleView = (item) => {
    console.log("View agent:", item);
    setSelectedAgent(item);
    setViewModalOpen(true);
  };

  const handleEdit = (item) => {
    console.log("Edit agent:", item);
    // TODO: Implement edit functionality
  };

  const handleDelete = (item) => {
    console.log("Delete agent:", item);
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
      console.log("Confirming delete for agent:", selectedAgent);
      await deleteAgent(selectedAgent.id).unwrap();
      console.log("Agent deleted successfully");
      closeDeleteModal();
      // You might want to refresh the data here or show a success message
    } catch (error) {
      console.error("Failed to delete agent:", error);
      // You might want to show an error message here
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
