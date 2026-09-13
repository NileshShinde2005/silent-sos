import { useState } from "react";

import "./EmergencyContacts.css";

import {
  ArrowLeft,
  Check,
  Edit3,
  History,
  Mail,
  Phone,
  Plus,
  ShieldCheck,
  Trash2,
  UserRound,
  Users,
  X,
} from "lucide-react";


const defaultContacts = [
  {
    id: "1",
    name: "Amit Sharma",
    phone: "+91 98765 43210",
    email: "amit@example.com",
    relation: "Brother",
    primary: true,
  },
  {
    id: "2",
    name: "Priya Sharma",
    phone: "+91 98765 12345",
    email: "priya@example.com",
    relation: "Mother",
    primary: false,
  },
  {
    id: "3",
    name: "Rahul Patil",
    phone: "+91 91234 56789",
    email: "rahul@example.com",
    relation: "Friend",
    primary: false,
  },
];


function EmergencyContactsPage() {

  const [contacts, setContacts] = useState(() => {

    const savedContacts =
      localStorage.getItem("silentSOSContacts");

    if (savedContacts) {
      try {
        return JSON.parse(savedContacts);
      } catch {
        return defaultContacts;
      }
    }

    return defaultContacts;
  });


  const [showForm, setShowForm] = useState(false);

  const [editingContact, setEditingContact] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    relation: "",
    primary: false,
  });

  const [error, setError] = useState("");


  const saveContacts = (updatedContacts) => {

    setContacts(updatedContacts);

    localStorage.setItem(
      "silentSOSContacts",
      JSON.stringify(updatedContacts)
    );
  };


  const openAddForm = () => {

    setEditingContact(null);

    setFormData({
      name: "",
      phone: "",
      email: "",
      relation: "",
      primary: contacts.length === 0,
    });

    setError("");

    setShowForm(true);
  };


  const openEditForm = (contact) => {

    setEditingContact(contact);

    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      relation: contact.relation,
      primary: contact.primary,
    });

    setError("");

    setShowForm(true);
  };


  const closeForm = () => {

    setShowForm(false);

    setEditingContact(null);

    setError("");
  };


  const handleChange = (event) => {

    const { name, value, type, checked } =
      event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };


  const handleSubmit = (event) => {

    event.preventDefault();

    const name = formData.name.trim();

    const phone = formData.phone.trim();

    const email = formData.email.trim();

    const relation = formData.relation.trim();


    if (!name || !phone) {

      setError(
        "Name and phone number are required."
      );

      return;
    }


    if (phone.length < 8) {

      setError(
        "Please enter a valid phone number."
      );

      return;
    }


    let updatedContacts;


    if (editingContact) {

      updatedContacts = contacts.map((contact) =>
        contact.id === editingContact.id
          ? {
              ...contact,
              name,
              phone,
              email,
              relation: relation || "Trusted contact",
              primary: formData.primary,
            }
          : contact
      );

    } else {

      const newContact = {
        id: String(Date.now()),
        name,
        phone,
        email,
        relation: relation || "Trusted contact",
        primary: formData.primary,
      };

      updatedContacts = [
        ...contacts,
        newContact,
      ];
    }


    // Keep only one primary contact.
    if (
      formData.primary &&
      updatedContacts.length > 0
    ) {

      const savedId = editingContact
        ? editingContact.id
        : updatedContacts[updatedContacts.length - 1].id;

      updatedContacts = updatedContacts.map(
        (contact) => ({
          ...contact,
          primary: contact.id === savedId,
        })
      );
    }


    // If there is no primary contact,
    // automatically make the first one primary.
    if (
      updatedContacts.length > 0 &&
      !updatedContacts.some(
        (contact) => contact.primary
      )
    ) {

      updatedContacts[0] = {
        ...updatedContacts[0],
        primary: true,
      };
    }


    saveContacts(updatedContacts);

    closeForm();
  };


  const deleteContact = (contactId) => {

    const contactToDelete = contacts.find(
      (contact) => contact.id === contactId
    );

    if (!contactToDelete) {
      return;
    }


    const confirmed = window.confirm(
      `Remove ${contactToDelete.name} from your emergency contacts?`
    );

    if (!confirmed) {
      return;
    }


    let updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );


    if (
      contactToDelete.primary &&
      updatedContacts.length > 0
    ) {

      updatedContacts = updatedContacts.map(
        (contact, index) => ({
          ...contact,
          primary: index === 0,
        })
      );
    }


    saveContacts(updatedContacts);
  };


  const makePrimary = (contactId) => {

    const updatedContacts = contacts.map(
      (contact) => ({
        ...contact,
        primary: contact.id === contactId,
      })
    );

    saveContacts(updatedContacts);
  };


  const goBack = () => {

    window.location.href = "/dashboard";
  };


  const user = JSON.parse(
    localStorage.getItem("silentSOSUser")
  );

  const userName = user?.name || "User";


  return (
    <div className="contacts-page">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="contacts-sidebar">

        <div className="contacts-logo">

          <div className="contacts-logo-icon">
            <ShieldCheck size={20} />
          </div>

          <span>
            Silent SOS
          </span>

        </div>


        <nav className="contacts-nav">

          <p className="contacts-nav-label">
            MENU
          </p>


          <a
            href="/dashboard"
            className="contacts-nav-item"
          >
            <ShieldCheck size={17} />
            <span>Dashboard</span>
          </a>


          <a
            href="/contacts"
            className="contacts-nav-item active"
          >
            <Users size={17} />
            <span>Emergency Contacts</span>
          </a>


          <a
            href="/history"
            className="contacts-nav-item"
          >
            <History size={17} />
            <span>Alert History</span>
          </a>


          <p className="contacts-nav-label contacts-account-label">
            ACCOUNT
          </p>


          <a
            href="#profile"
            className="contacts-nav-item"
          >
            <UserRound size={17} />
            <span>Profile</span>
          </a>


          <a
            href="#settings"
            className="contacts-nav-item"
          >
            <ShieldCheck size={17} />
            <span>Settings</span>
          </a>

        </nav>


        <div className="contacts-sidebar-bottom">

          <div className="contacts-protected">

            <ShieldCheck size={16} />

            <div>
              <strong>
                You're protected
              </strong>

              <span>
                Safety network ready
              </span>
            </div>

          </div>


          <button
            className="contacts-logout"
            onClick={() => {
              localStorage.removeItem(
                "silentSOSLoggedIn"
              );

              window.location.href = "/login";
            }}
          >
            <ArrowLeft size={16} />
            Logout
          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="contacts-main">

        <header className="contacts-header">

          <div>
            <p className="contacts-header-label">
              YOUR SAFETY DASHBOARD
            </p>
          </div>


          <div className="contacts-user">

            <div className="contacts-user-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{userName}</strong>
              <span>Protected</span>
            </div>

          </div>

        </header>


        <div className="contacts-content">

          <button
            className="contacts-back"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </button>


          <div className="contacts-title-row">

            <div>

              <p className="contacts-kicker">
                SAFETY NETWORK
              </p>

              <h1>
                Emergency contacts
              </h1>

              <p className="contacts-subtitle">
                People you trust can be notified when you need help.
              </p>

            </div>


            <button
              className="contacts-add-button"
              onClick={openAddForm}
            >
              <Plus size={17} />
              Add contact
            </button>

          </div>


          <div className="contacts-summary">

            <div className="contacts-summary-icon">
              <Users size={20} />
            </div>

            <div>
              <strong>
                {contacts.length}{" "}
                {contacts.length === 1
                  ? "contact"
                  : "contacts"}{" "}
                ready
              </strong>

              <span>
                Your emergency network is available for SOS alerts.
              </span>
            </div>

          </div>


          <section className="contacts-list">

            {contacts.length === 0 ? (

              <div className="contacts-empty">

                <div className="contacts-empty-icon">
                  <Users size={25} />
                </div>

                <h2>
                  No emergency contacts yet
                </h2>

                <p>
                  Add someone you trust so they can be part of your safety network.
                </p>

                <button
                  className="contacts-add-button"
                  onClick={openAddForm}
                >
                  <Plus size={17} />
                  Add your first contact
                </button>

              </div>

            ) : (

              contacts.map((contact) => (

                <article
                  className="contact-card"
                  key={contact.id}
                >

                  <div className="contact-avatar">
                    {contact.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>


                  <div className="contact-main-info">

                    <div className="contact-name-row">

                      <h2>
                        {contact.name}
                      </h2>

                      {contact.primary && (
                        <span className="primary-badge">
                          <Check size={12} />
                          Primary
                        </span>
                      )}

                    </div>


                    <span className="contact-relation">
                      {contact.relation}
                    </span>


                    <div className="contact-details">

                      <span>
                        <Phone size={14} />
                        {contact.phone}
                      </span>


                      {contact.email && (
                        <span>
                          <Mail size={14} />
                          {contact.email}
                        </span>
                      )}

                    </div>

                  </div>


                  <div className="contact-actions">

                    {!contact.primary && (
                      <button
                        className="contact-action primary-action"
                        onClick={() =>
                          makePrimary(contact.id)
                        }
                        title="Make primary"
                      >
                        Make primary
                      </button>
                    )}


                    <button
                      className="contact-icon-button"
                      onClick={() =>
                        openEditForm(contact)
                      }
                      title="Edit contact"
                    >
                      <Edit3 size={16} />
                    </button>


                    <button
                      className="contact-icon-button delete-action"
                      onClick={() =>
                        deleteContact(contact.id)
                      }
                      title="Delete contact"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </article>

              ))

            )}

          </section>


          <div className="contacts-note">

            <ShieldCheck size={16} />

            <span>
              Contact information is stored locally in this frontend prototype.
            </span>

          </div>

        </div>

      </main>


      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showForm && (

        <div
          className="contact-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget
            ) {
              closeForm();
            }

          }}
        >

          <div className="contact-modal">

            <div className="contact-modal-header">

              <div>

                <p className="contacts-kicker">
                  {editingContact
                    ? "UPDATE CONTACT"
                    : "NEW CONTACT"}
                </p>

                <h2>
                  {editingContact
                    ? "Edit contact"
                    : "Add emergency contact"}
                </h2>

                <p>
                  Keep someone you trust ready to receive your SOS alert.
                </p>

              </div>


              <button
                className="modal-close-button"
                onClick={closeForm}
              >
                <X size={18} />
              </button>

            </div>


            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <label>
                Full name

                <div className="contact-input-wrap">
                  <UserRound size={16} />

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    autoFocus
                  />
                </div>

              </label>


              <label>
                Phone number

                <div className="contact-input-wrap">
                  <Phone size={16} />

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>

              </label>


              <label>
                Email address
                <span className="optional-label">
                  Optional
                </span>

                <div className="contact-input-wrap">
                  <Mail size={16} />

                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                  />
                </div>

              </label>


              <label>
                Relationship
                <span className="optional-label">
                  Optional
                </span>

                <div className="contact-input-wrap">
                  <Users size={16} />

                  <input
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    placeholder="Mother, brother, friend..."
                  />
                </div>

              </label>


              <label className="primary-checkbox">

                <input
                  type="checkbox"
                  name="primary"
                  checked={formData.primary}
                  onChange={handleChange}
                />

                <span className="custom-checkbox">
                  <Check size={12} />
                </span>

                <span>
                  Set as primary emergency contact
                </span>

              </label>


              {error && (
                <div className="contact-form-error">
                  {error}
                </div>
              )}


              <div className="contact-form-actions">

                <button
                  type="button"
                  className="contact-cancel-button"
                  onClick={closeForm}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="contacts-add-button"
                >
                  <Check size={16} />

                  {editingContact
                    ? "Save changes"
                    : "Add contact"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


export default EmergencyContactsPage;
