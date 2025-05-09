import React, { useState } from "react";
import IconPicker from "../components/IconPicker";
import AgentForm from "../components/AgentForm";
import FileUploader from "../components/FileUploader";

const CreateAgent = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [agentData, setAgentData] = useState({
    who: "",
    what: "",
    name: ""
  });
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      icon: selectedIcon,
      ...agentData,
      files
    };

    console.log("🚀 Submitting Agent Config:", payload);
    // TODO: Send this to backend
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAgentData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="w-full">
      <section className="agent-hero">
  <img src="/icons/detective.png" alt="Embagent Logo" className="logo-img" />
  <h1 className="agent-title">EMBAGENT</h1>
  <p className="agent-subtitle">
    Your custom-trained AI agent.<br />
    Built for You.
  </p>
  <div className="mt-10 flex justify-center">
  <button
    type="submit"
    className="bg-transparent border-none p-0 focus:outline-none"
  >
    <img
      src="/icons/build-button.png"
      alt="Build My Agent"
      className="w-full max-w-[200px] h-auto object-contain transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
    />
  </button>
</div>
</section>
      <div className="w-full px-4 py-12">
        <h1 className="text-4xl font-bold text-center">Let's Build Your Agent</h1>
        <h2 className="text-2xl font-semibold text-center mt-6">Choose Your Icon</h2>

        {/* Icon Picker */}
        <div className="w-full mt-10">
          <IconPicker selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
        </div>

        {/* Agent Info Form */}
        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <AgentForm agentData={agentData} onChange={handleFormChange} />

          {/* File Upload */}
          <FileUploader files={files} setFiles={setFiles} />

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-all"
            >
              Submit Agent
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateAgent;