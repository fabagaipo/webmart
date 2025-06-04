import React from 'react';

const StoreContact = ({ contact }) => {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Address</h4>
          <p className="text-sm text-gray-600">{contact.address}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Business Hours</h4>
          <p className="text-sm text-gray-600">{contact.hours}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Phone</h4>
          <p className="text-sm text-gray-600">{contact.phone}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Email</h4>
          <p className="text-sm text-gray-600">{contact.email}</p>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Follow Us</h4>
        <div className="flex space-x-4">
          {Object.entries(contact.social).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <span className="sr-only">{platform}</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {platform === 'facebook' && (
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                )}
                {platform === 'instagram' && (
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.244.827 2.373.625 6.035.4 7.284.333 7.729.333 12c0 4.268.067 4.721.333 6.965.2 3.662 2.07 5.791 5.428 6.035 1.281.058 1.688.072 4.999.072 3.578 0 4.042-.014 5.701-.072 3.367-.244 5.227-2.373 5.427-6.035.267-2.244.333-2.697.333-6.965 0-4.271-.067-4.732-.333-6.965-.199-3.662-2.135-5.791-5.427-6.035-1.688-.058-1.963-.072-4.999-.072zM12 10c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-6c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
                )}
                {platform === 'twitter' && (
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.989 1.995-.388 0-.776-.022-1.154-.067 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                )}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreContact;
