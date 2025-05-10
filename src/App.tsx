import './App.css';
import { useState } from 'react';
import './index.css';
import Modal from './components/Modal';

// Icon imports (for Vite to handle them correctly)
import detectiveIcon from './assets/icons/detective.png';
import goButtonIcon from './assets/icons/go-button.png';
import robotIcon from './assets/icons/robot-support.png';
import fileIcon from './assets/icons/file.png';
import menuIcon from './assets/icons/menu.png';
import lockIcon from './assets/icons/lock.png';
// import codeIcon from './assets/icons/code.png';
import createIcon from './assets/icons/create.png';
import joinIcon from './assets/icons/join.png';
// import heartIcon from './assets/icons/heart.png';
import contactIcon from './assets/icons/contact.png';
// import usersIcon from './assets/icons/users.png';
import comingSoonIcon from './assets/icons/coming-soon.png';
function App() {
  const [activeModal, setActiveModal] = useState<null | 'create' | 'join' | 'contact'>(null);
  const [email, setEmail] = useState('');
const [consent, setConsent] = useState(false);
const [joined, setJoined] = useState(false);
const [joinError, setJoinError] = useState('');
const [contactForm, setContactForm] = useState({
  name: '',
  email: '',
  subject: '',
  message: '',
});
const [submitted, setSubmitted] = useState(false);
const [contactError, setContactError] = useState('');
  return (
    <main className="bg-[#222222] text-white min-h-screen w-full font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-4">
      <img
        src={detectiveIcon}
        alt="EMBAGENT logo"
        className="w-70 mb-8"
      />
        <h1 className="font-anton font-bold uppercase tracking-wide text-6xl">
          EMBAGENT
        </h1>
        <p className="text-lg text-gray-300">Your custom-trained AI agent.<br />Built for You.</p>
        <button onClick={() => console.log('Clicked!')}>
        <img
          src={goButtonIcon}
          alt="Build My Agent"
          className="mt-8 w-30 md:w-30 hover:scale-105 transition-transform duration-300"
        />
        </button>
      </section>
      {/* Features Section */}
      <section className="py-20 px-4 bg-[#222222] text-white">
      <h2 className="font-anton font-bold uppercase tracking-wide text-4xl mb-8 text-center">
        Features
      </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: robotIcon,
                title: 'Natural Conversations',
                desc: 'Upload files, documents, or enter text to define exactly what your agent should know. Make it an expert in your product, service, or anything else you choose.',
              },
              {
                icon:fileIcon,
                title: 'Customize Your Agent',
                desc: 'Upload files, documents, or enter text to define exactly what your agent should know. Make it an expert in your product, service, or anything else you choose.',
              },
              {
                icon: menuIcon,
                title: 'Embeddable Widget',
                desc: 'AI-powered responses that feel natural and human-like, creating engaging user experiences.',
              },
              {
                icon: lockIcon,
                title: 'Data Security',
                desc: 'Data privacy is a priority. Embagent doesn’t store sensitive information and follows best practices to keep your user interactions safe.',
              },
            ].map((feature, i) => (

  <div
    key={i}
    className="bg-[#2a2a2a] border border-[#2E284D] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex flex-col h-full">
    <img
      src={feature.icon}
      alt={feature.title}
      className="w-12 h-12 mb-6 mx-auto"
    />
<h3 className="text-l font-anton font-bold tracking-tight text-center mb-4">
  {feature.title}
</h3>
      <p className="text-sm text-gray-300 leading-relaxed">
        {feature.desc}
      </p>
    </div>
  </div>

            ))}
          </div>
          
        </section>
        
      {/* Get Involved Section */}
      <section className="py-20 px-4 bg-[#222222] text-white">
  <h2 className="font-anton font-bold uppercase tracking-wide text-4xl text-center mb-16">
    Get Involved
  </h2>
  <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
      {[
      {
        title: 'Try EmbAgent',
        desc: 'Test the power of Embagent. Create your own custom-trained AI agent and see how it can transform your interactions.\n\n This is a version in testing and may not be fully functional.',
        icon: './assets/icons/code.png',
        button: createIcon,
        modal: 'create' as 'create' | 'join' | 'contact',
      },
      {
        title: 'Join the Community',
        desc: "Get on our email list to stay updated on the latest features, improvements, and new releases. You'll get early access to new features and be part of our growing community.",
        icon: './assets/icons/users.png',
        button: joinIcon,
        modal: 'join' as 'create' | 'join' | 'contact',
      },
      {
        title: 'Support Us',
        desc: 'Interested in joining the team or investment opportunities? We are looking for talented individuals and partners to help us grow and improve EmbAgent.',
        icon: './assets/icons/heart.png',
        button: contactIcon,
        modal: 'contact' as 'create' | 'join' | 'contact',
      },
    ].map((item, i) => (
      <div
        key={i}
        className="flex flex-col items-center text-center flex-1 bg-[#2a2a2a] border border-[#2E284D] rounded-xl p-10 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* <img src={item.icon} alt={item.title} className="w-12 h-12 mb-6" /> */}
        <h3 className="text-xl font-anton font-bold uppercase tracking-wide mb-4">
          {item.title}
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line mb-6">
          {item.desc}
        </p>
        {joinError && <p className="text-red-500 text-sm">{joinError}</p>}
        {contactError && <p className="text-red-500 text-sm">{contactError}</p>}
        <button onClick={() => setActiveModal(item.modal)} className="mt-auto pt-6">
          <img
            src={item.button}
            alt={`Action for ${item.title}`}
            className="w-24 hover:scale-105 transition-transform duration-300 mx-auto"
          />
        </button>
      </div>
    ))}
  </div>
</section>

{/*------------------------------ TESTING MODAL ------------------------------ */}

<Modal isOpen={activeModal === 'create'} onClose={() => setActiveModal(null)}>
<img
  src={comingSoonIcon}
  alt="Agent Preview"
  className="w-full h-auto rounded-lg"
/>
</Modal>

{/*------------------------------ MAILING LIST MODAL ------------------------------ */}

<Modal isOpen={activeModal === 'join'} onClose={() => {
  setActiveModal(null);
  setJoined(false);
  setEmail('');
  setConsent(false);
}}>
  {!joined ? (
    <form
    onSubmit={async (e) => {
      e.preventDefault();
      if (!email || !consent) {
        setJoinError('Please enter your email and agree to receive updates.');
        return;
      }
    
      try {
        const res = await fetch('https://formspree.io/f/mnndzvrz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, consent }),
        });
    
        if (res.ok) {
          setJoined(true);
          setJoinError('');
        } else {
          setJoinError('Something went wrong. Please try again later.');
        }
      } catch (err) {
        setJoinError('Failed to submit form.');
        console.error(err);
      }
    }}
      className="flex flex-col gap-4"
    >
      <h3 className="text-xl font-bold font-anton uppercase tracking-wide text-center mb-2">
        Join the Community
      </h3>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-[#1c1c1c] text-white p-3 rounded border border-gray-600"
        required
      />
      <label className="flex items-start gap-2 text-sm text-gray-300">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        I agree to receive updates from Embagent.
      </label>
      <button
        type="submit"
        className="bg-[#2E284D] hover:bg-[#3c3570] transition-colors text-white font-bold py-2 px-4 rounded mt-2"
      >
        Join
      </button>
    </form>
  ) : (
    <div className="text-center">
      <h3 className="text-xl font-bold font-anton uppercase tracking-wide mb-2">Thank you!</h3>
      <p className="text-gray-300">You’ve been added to our list.</p>
    </div>
  )}
</Modal>

{/*------------------------------ SUPPORT US MODAL ------------------------------ */}
<Modal isOpen={activeModal === 'contact'} onClose={() => {
  setActiveModal(null);
  setSubmitted(false);
  setContactForm({ name: '', email: '', subject: '', message: '' });
}}>
  {!submitted ? (
    <form
    onSubmit={async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('https://formspree.io/f/mwpoqbzl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactForm),
        });
    
        if (res.ok) {
          setSubmitted(true);
          setContactError('');
        } else {
          setContactError('Something went wrong. Please try again later.');
        }
      } catch (err) {
        setContactError('Failed to submit form.');
        console.error(err);
      }
    }}
      className="flex flex-col gap-4"
    >
      <h3 className="text-xl font-bold font-anton uppercase tracking-wide text-center mb-2">
        Contact Us
      </h3>

      <input
        type="text"
        placeholder="Name"
        value={contactForm.name}
        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
        className="bg-[#1c1c1c] text-white p-3 rounded border border-gray-600"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={contactForm.email}
        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
        className="bg-[#1c1c1c] text-white p-3 rounded border border-gray-600"
        required
      />

      <input
        type="text"
        placeholder="Subject"
        value={contactForm.subject}
        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
        className="bg-[#1c1c1c] text-white p-3 rounded border border-gray-600"
        required
      />

      <textarea
        placeholder="Your message"
        rows={4}
        value={contactForm.message}
        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
        className="bg-[#1c1c1c] text-white p-3 rounded border border-gray-600 resize-none"
        required
      />

      <button
        type="submit"
        className="bg-[#2E284D] hover:bg-[#3c3570] transition-colors text-white font-bold py-2 px-4 rounded mt-2"
      >
        Send
      </button>
    </form>
  ) : (
    <div className="text-center">
      <h3 className="text-xl font-bold font-anton uppercase tracking-wide mb-2">Message Sent</h3>
      <p className="text-gray-300">Thanks for reaching out — we’ll be in touch soon.</p>
    </div>
  )}
</Modal>
    </main>
  );
}

export default App;