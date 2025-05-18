function About() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">About WebMart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              WebMart was founded with a vision to make shopping accessible and convenient for everyone. 
              We believe in providing quality products at competitive prices while maintaining excellent customer service.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-600 text-white text-2xl flex items-center justify-center">
                  🏆
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Mission</h3>
                  <p className="text-gray-600">To provide our customers with the best shopping experience possible.</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-600 text-white text-2xl flex items-center justify-center">
                  🎯
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Vision</h3>
                  <p className="text-gray-600">To be the leading e-commerce platform in the region.</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-600 text-white text-2xl flex items-center justify-center">
                  🤝
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Values</h3>
                  <p className="text-gray-600">Customer satisfaction, innovation, and integrity.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  🏠
                </div>
                <div className="ml-4">
                  <p className="text-gray-600">123 Shopping Street, Metro Manila, Philippines</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  📞
                </div>
                <div className="ml-4">
                  <p className="text-gray-600">(032) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  📧
                </div>
                <div className="ml-4">
                  <p className="text-gray-600">support@webmart.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  ⏰
                </div>
                <div className="ml-4">
                  <p className="text-gray-600">24/7 Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
