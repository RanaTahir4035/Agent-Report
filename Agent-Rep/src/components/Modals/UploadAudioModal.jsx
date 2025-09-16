import React, { useState } from 'react';
import BasicDialog from '../BasicDialog/BasicDialog';
import uploadIcon from '../../assets/Mp3-button/green-upload-icon.svg';
import calendarIcon from '../../assets/Action-icons/calendar-icon.svg';

const UploadAudioModal = ({ isOpen, onClose }) => {
  const [selectedAgent, setSelectedAgent] = useState('');
  const [callDate, setCallDate] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload here
      console.log('File dropped:', e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload here
      console.log('File selected:', e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', { selectedAgent, callDate });
    onClose();
  };

  return (
    <BasicDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Audio"
      size="md"
    >
      <div className="space-y-6">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-[#298F84] bg-[#298F84]/10' 
              : 'border-gray-300 bg-[#E8F5F3]'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".mp3,audio/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          {/* Upload Icon */}
          <div className="flex justify-center mb-4">
            <img src={uploadIcon} alt="uploadIcon" className="w-[36px] h-[36px] " />
          </div>
          
          <span className="text-[#298F84] font-semibold text-sm">
            Upload MP3 File
          </span>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Agent Selection */}
          <div>
            <label className="block text-sm font-medium text-[#202224] mb-2">
              Agent
            </label>
            <div className="relative">
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#298F84] focus:border-transparent appearance-none"
              >
                <option value="">Select agent</option>
                <option value="agent1">Agent 1</option>
                <option value="agent2">Agent 2</option>
                <option value="agent3">Agent 3</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Date of Call */}
          <div>
            <label className="block text-sm font-medium text-[#202224] mb-2">
              Date of Call
            </label>
            <div className="relative">
              <input
                type="date"
                value={callDate}
                onChange={(e) => setCallDate(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#298F84] focus:border-transparent [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <img src={calendarIcon} alt="calendar" className="w-[20px] h-[20px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-[#298F84] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#298F84]/90 transition-colors duration-200 md:w-[140px] w-[100px] md:h-[48px] h-[40px]"
          >
            Add
          </button>
        </div>
      </div>
    </BasicDialog>
  );
};

export default UploadAudioModal;
