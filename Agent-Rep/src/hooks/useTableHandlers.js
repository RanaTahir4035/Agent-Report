
import { useState } from 'react';

export const useTableHandlers = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

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

  const confirmDelete = () => {
    console.log("Confirming delete for agent:", selectedAgent);
    // TODO: Integrate with delete API
    closeDeleteModal();
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
    confirmDelete
  };
};
