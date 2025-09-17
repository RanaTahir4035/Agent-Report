import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components';
import GlobalTable from '../components/GlobalTable/GlobalTable';
import BasicDialog from '../components/BasicDialog/BasicDialog';
import { useGetUsersQuery } from '../store/api/usersApi';

const Agents = () => {
  const navigate = useNavigate();
  
  const { data: usersData, error, isLoading } = useGetUsersQuery();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  const recentAgentsData = usersData || [];

  const recentAgentsColumns = [
    {
      title: "Agent Name",
      key: "name",
      type: "default"
    },
    {
      title: "Email",
      key: "email",
      type: "default"
    },
    {
      title: "Total Calls",
      key: "totalCalls",
      type: "default",
      align: "left"
    },
    {
      title: "Average Score",
      key: "averageScore",
      type: "default",
      align: "left"
    },
    {
      title: "Status",
      key: "status",
      type: "badge",
      badgeClass: (value) => {
        switch (value) {
          case "Excellent": return "bg-[#34C759] text-white w-[86px] text-center";
          case "Good": return "bg-[#007AFF] text-white w-[86px] text-center";
          case "Average": return "bg-[#FFCC00] text-white w-[86px] text-center";
          default: return "bg-gray-100 text-gray-800 text-center";
        }
      }
    },
    {
      title: "Action",
      key: "actions",
      type: "actions",
      align: "left"
    }
  ];

  const handleView = (item) => {
    console.log("View agent:", item);
    navigate(`/agent/${item.id}`);
  };

  const handleEdit = (item) => {
    console.log("Edit agent:", item);
  };

  const handleDelete = (item) => {
    console.log("Delete agent:", item);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('Searching agents for:', term);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Adding new agent:', formData);
    handleCloseModal();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#298F84] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading agents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="md:w-80 sm:w-50 w-40">
            <SearchBar
              placeholder="Search"
              onSearch={handleSearch}
              size="medium"
            />
          </div>
          <button
            onClick={handleOpenModal}
            className="bg-[#E7F8F6] text-[#298F84] py-2 rounded-lg font-semibold md:text-sm text-[10px] transition-colors duration-200 md:w-[144px] w-[100px] md:h-[48px] h-[40px] border border-[#298F84] hover:bg-[#298F84] hover:text-white"
          >
            + Add New Agent
          </button>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Failed to Load Agents
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Unable to fetch agents from the API. Please check your connection and try again.</p>
              </div>
            </div>
          </div>
        </div>
      
        <GlobalTable
          data={[]}
          columns={recentAgentsColumns}
          title="Recent Agents"
          showActions={true}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showHeader={true}
          showSearch={false}
          showFilters={false}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={0}
          onPageChange={handlePageChange}
          showPagination={false}
        />

        <BasicDialog
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Add Agent"
          size="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Agent Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter agent name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#298F84] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#298F84] focus:border-transparent"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-[#298F84] text-white rounded-lg hover:bg-[#1f6b5f] transition-colors duration-200 md:w-[144px] w-[120px] md:h-[48px] h-[40px]"
              >
                Add
              </button>
            </div>
          </form>
        </BasicDialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="md:w-80 sm:w-50 w-40">
          <SearchBar
            placeholder="Search"
            onSearch={handleSearch}
            size="medium"
          />
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-[#E7F8F6] text-[#298F84] py-2 rounded-lg font-semibold md:text-sm text-[10px] transition-colors duration-200 md:w-[144px] w-[100px] md:h-[48px] h-[40px] border border-[#298F84] hover:bg-[#298F84] hover:text-white"
        >
          + Add New Agent
        </button>
      </div>

      <GlobalTable
        data={recentAgentsData}
        columns={recentAgentsColumns}
        title="Recent Agents"
        showActions={true}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showHeader={true}
        showSearch={false}
        showFilters={false}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={recentAgentsData.length}
        onPageChange={handlePageChange}
        showPagination={true}
      />

      <BasicDialog
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add Agent"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Agent Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter agent name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#298F84] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#298F84] focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">

            <button
              type="submit"
              className="px-4 py-2 bg-[#298F84] text-white rounded-lg hover:bg-[#1f6b5f] transition-colors duration-200 md:w-[144px] w-[120px] md:h-[48px] h-[40px]"
            >
              Add
            </button>
          </div>
        </form>
      </BasicDialog>
    </div>
  );
};

export default Agents;
