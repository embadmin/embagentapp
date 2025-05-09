const AgentForm = ({ agentData, onChange }) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        name="who"
        placeholder="Who is it for?"
        value={agentData.who}
        onChange={onChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-md"
      />
      <input
        type="text"
        name="what"
        placeholder="What is it for?"
        value={agentData.what}
        onChange={onChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-md"
      />
      <input
        type="text"
        name="name"
        placeholder="Give it a name"
        value={agentData.name}
        onChange={onChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-md"
      />
    </div>
  );
};

export default AgentForm;