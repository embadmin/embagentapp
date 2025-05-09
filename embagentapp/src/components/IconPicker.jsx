import React from 'react';

const icons = [
  "/icons/chat.png",
  "/icons/chat (1).png",
  "/icons/chat (2).png",
  "/icons/chat-info.png",
  "/icons/chatbot (1).svg",
  "/icons/chatbot (2).svg",
  "/icons/chatbot (3).svg",
  "/icons/chatbot (4).svg",
  "/icons/robot.png",
  // "/icons/cute-robot-showing-thumbs-up.png",
  // "/icons/detective.png",
  // "/icons/info.png",
  "/icons/robot (1).png",
  "/icons/robot (2).png",
  "/icons/robot (3).png",
  "/icons/robot (4).png",
  "/icons/robot-chat.svg",
  "/icons/robot-support.png",
  "/icons/chatbot.svg"
];

const IconPicker = ({ selectedIcon, setSelectedIcon }) => {
  return (
    <div className="w-full flex justify-center">
  <div className="icon-grid px-4">
  {icons.map((icon, index) => (
    <img
      key={index}
      src={icon}
      alt={`icon-${index}`}
      className={`max-w-[80px] max-h-[80px] object-contain cursor-pointer rounded-md border-2 ${
        selectedIcon === icon ? "border-purple-500 scale-105" : "border-transparent"
      } hover:scale-105 transition-transform duration-200`}
      onClick={() => setSelectedIcon(icon)}
    />
  ))}
</div>
</div>
  );
};

export default IconPicker;