import React, { useState } from "react";
import images from "../../../Components/images";
import "./Faq.css";

const Faq = () => {
  const faqData = [
    {
      question: "How does Wefind work?",
      answer: `Wefind is a platform that connects companies with skilled volunteers. Companies can post job opportunities and search for candidates based on their hiring needs. Talents can create profiles, browse job listings, and apply for positions that match their skills and interests.`,
    },
    {
      question: "Is Wefind free to use?",
      answer: `Yes, Wefind is free for both companies and talents to use. There are no subscription fees or hidden charges. Simply sign up, create a profile, and start connecting with top talents or companies in your industry.`,
    },
    {
      question: "How can I get started on Wefind?",
      answer: `To get started on Wefind, simply sign up for an account as a company or talent. Fill out your profile with relevant information, including your skills, experience, and job preferences. Once your profile is complete, you can start browsing job listings or candidates and connect with potential matches.`,
    },
    {
      question: "How can I contact Wefind for support?",
      answer: `If you have any questions or need assistance, you can reach out to us via the contact form on our website. Our team is here to help and will respond to your inquiry as soon as possible. You can also connect with us on social media for updates and news about Wefind.`,
    },
    {
      question: "How do I register on Wefind?",
      answer: `To register on Wefind, simply visit our website and click on the "Get Started" button. Follow the prompts to create your account, and you'll be ready to start exploring job opportunities or posting jobs in no time.`,
    },
    {
      question: "Can I post remote job opportunities on Wefind?",
      answer: `Yes, Wefind supports remote work opportunities. You can specify in your job postings whether the position is remote, on-site, or a combination of both.`,
    },
    {
      question: "How does Wefind guarante talent quality?",
      answer: `Wefind verifies the identity and qualifications of talents through a thorough screening process. We also encourage companies to provide feedback on talents they've hired through our platform to maintain quality standards.`,
    },
  ];

  const [expanded, setExpanded] = useState(null);

  const handleClick = (index) => {
    setExpanded(index === expanded ? null : index);
  };

  return (
    <section id="faqs">
      <div className="faq-section">
        <h2>FAQs</h2>
        <div className="faq-group">
          {faqData.map((faq, index) => (
            <div className="faq" key={index}>
              <div
                className="faq-header"
                onClick={() => handleClick(index)}
                role="button" // Add this
                aria-expanded={expanded === index} // Add this
              >
                <h3>{faq.question}</h3>
                <img
                  src={images.downCarret}
                  alt="arrow"
                  style={{
                    transform:
                      expanded === index ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </div>
              {expanded === index && (
                <div className="expanded">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
