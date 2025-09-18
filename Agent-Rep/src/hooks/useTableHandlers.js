
export const useTableHandlers = () => {
  const handleView = (item) => {
    console.log("View agent:", item);
  
  };

  const handleEdit = (item) => {
    console.log("Edit agent:", item);
    
  };

  const handleDelete = (item) => {
    console.log("Delete agent:", item);
    
  };

  return {
    handleView,
    handleEdit,
    handleDelete
  };
};
