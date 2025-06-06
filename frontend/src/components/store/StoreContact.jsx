import React from 'react';
import { BsTwitter, BsFacebook, BsInstagram } from 'react-icons/bs';

const StoreContact = ({ contact }) => {
  const socialIcons = {
    twitter: <BsTwitter className="w-5 h-5" />,
    facebook: <BsFacebook className="w-5 h-5" />,
    instagram: <BsInstagram className="w-5 h-5" />
  };

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
              {socialIcons[platform]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreContact;
