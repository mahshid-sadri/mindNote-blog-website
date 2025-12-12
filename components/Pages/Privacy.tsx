import React, { useEffect } from 'react';

export const Privacy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-custom-black dark:text-white tracking-tight mb-8">
        Privacy Policy
      </h1>
      <p className="text-sm text-custom-mediumGray dark:text-custom-darkTextMuted mb-12">
        Last updated: October 26, 2023
      </p>

      <div className="prose prose-lg dark:prose-invert hover:prose-a:text-blue-600">
        <p>
          At Neural Insight, accessible from https://neuralinsight.com, one of our main priorities is the privacy of our visitors. 
          This Privacy Policy document contains types of information that is collected and recorded by Neural Insight and how we use it.
        </p>

        <h3>Information We Collect</h3>
        <p>
          We collect information to provide better services to all our users. We may collect personal identification information from Users 
          in a variety of ways, including, but not limited to, when Users visit our site, subscribe to the newsletter, and in connection 
          with other activities, services, features, or resources we make available on our Site.
        </p>
        <p>
          You may be asked for, as appropriate, name, email address. Users may, however, visit our Site anonymously. We will collect personal 
          identification information from Users only if they voluntarily submit such information to us.
        </p>

        <h3>Log Files</h3>
        <p>
          Neural Insight follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies 
          do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, 
          browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
        </p>

        <h3>Cookies and Web Beacons</h3>
        <p>
          Like any other website, Neural Insight uses 'cookies'. These cookies are used to store information including visitors' preferences, 
          and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by 
          customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h3>Third Party Privacy Policies</h3>
        <p>
          Neural Insight's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective 
          Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about 
          how to opt-out of certain options.
        </p>

        <h3>Children's Information</h3>
        <p>
          Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, 
          participate in, and/or monitor and guide their online activity. Neural Insight does not knowingly collect any Personal Identifiable 
          Information from children under the age of 13.
        </p>

        <h3>Consent</h3>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </p>
      </div>
    </div>
  );
};
