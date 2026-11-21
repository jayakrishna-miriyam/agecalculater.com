import type { PageMeta } from '../types.ts';

export const informationPages: PageMeta[] = [
    {
        "path": "/about-us",
        "title": "About Us - AgeCalculater.com",
        "description": "Learn what AgeCalculater.com does, how its age and date calculations work, how to check our examples, and how to contact the site about a correction.",
        "heading": "About Us",
        "intro": "AgeCalculater.com provides free calendar tools and plain-language explanations to help you understand the dates behind an age or date interval.",
        "type": "website",
        "includeInSitemap": true,
        "sections": [
            {
                "title": "What you can do here",
                "paragraphs": [
                    "Use the site to calculate age on a chosen date, compare two birth dates, count down to a birthday, or measure the interval between calendar dates. The tools run in your browser and do not require an account, payment, or document upload.",
                    "The supporting guides explain particular tasks: checking a February 29 anniversary, expressing a child's age in months and weeks, understanding a school cut-off date, or preparing an age-on-date record for a form. They help you choose and interpret the inputs; they do not make decisions for an institution."
                ],
                "links": [
                    {
                        "href": "/all-tools",
                        "label": "Browse the calculators and guides"
                    }
                ]
            },
            {
                "title": "Understand the result, not just the number",
                "paragraphs": [
                    "The homepage shows completed years, remaining months, and remaining days. After you calculate, How we calculated your age shows the actual dates used for each step. Your birthday timeline places the selected date between the last anniversary and the next one.",
                    "These explanations use your selected target date. A separate live counter uses the device's current time. Keeping those views labeled helps distinguish age at a past event or future milestone from age now."
                ]
            },
            {
                "title": "Our calendar method",
                "paragraphs": [
                    "The calculators apply Gregorian calendar rules to dates from the year 1000 through 3000. We count complete years, then complete months from the last completed yearly anniversary, then remaining calendar days. If an anniversary day is missing from its month, we use that month's last day. February 29 therefore uses February 28 in non-leap years.",
                    "Total days measures the calendar interval. Hours, minutes, and seconds in the total-unit summary use 24 hours per calendar day. The birthday countdown instead measures time to the next local birthday midnight. It uses the device clock and can reflect daylight-saving changes.",
                    "The tools do not convert historical or non-Gregorian calendars, verify birth records, or reconstruct a time of birth. Different anniversary or day-counting rules can produce a different calendar breakdown."
                ],
                "links": [
                    {
                        "href": "/how-to-calculate-age",
                        "label": "Follow the calculation method"
                    },
                    {
                        "href": "/leap-year-age-calculator",
                        "label": "Check leap-day examples"
                    }
                ]
            },
            {
                "title": "How we check and revise the content",
                "paragraphs": [
                    "We check the calculators and published examples for leap days, month ends, invalid dates, and timezone differences. The guides use fixed examples so you can follow the method and check the result yourself.",
                    "The revision date shows when a page's content changed. Our checks do not certify results for official use.",
                    "If you find an error, send the page address, example inputs, the result you saw, and what you expected. For countdowns, include the timezone and approximate time. Invented dates that reproduce the problem are preferable to personal records."
                ],
                "links": [
                    {
                        "href": "/contact-us",
                        "label": "Contact AgeCalculater.com"
                    }
                ]
            },
            {
                "title": "Publisher and contact",
                "paragraphs": [
                    "This website is published under the AgeCalculater.com name. The site contact address for questions, corrections, and privacy inquiries is support.agecalculater@gmail.com.",
                    "AgeCalculater.com is an independent calendar-tool website. It does not represent schools, government agencies, or healthcare providers. References to external services do not imply their endorsement."
                ],
                "links": [
                    {
                        "href": "mailto:support.agecalculater@gmail.com",
                        "label": "Email support.agecalculater@gmail.com"
                    }
                ]
            },
            {
                "title": "Privacy and funding",
                "paragraphs": [
                    "AgeCalculater.com is hosted on Netlify. Entered dates are calculated locally in your browser. The website does not create a user profile or a server-side calculation history. Optional sharing sends selected dates and a result link to the sharing service or recipient you choose. Website and image delivery through Netlify still involve technical data; the Privacy Policy explains these separately.",
                    "This version runs without advertising or analytics scripts. We may use advertising to help fund the free tools in the future. The Privacy Policy explains possible advertising technologies and your choices."
                ],
                "links": [
                    {
                        "href": "/privacy-policy",
                        "label": "Privacy Policy"
                    },
                    {
                        "href": "/terms-and-conditions",
                        "label": "Terms and Conditions"
                    },
                    {
                        "href": "/disclaimer",
                        "label": "Disclaimer and calculation limitations"
                    }
                ]
            }
        ],
        "updated": "2026-11-21"
    },
    {
        "path": "/contact-us",
        "title": "Contact Us - AgeCalculater.com",
        "description": "Get help with AgeCalculater.com, report a calculation or website issue, suggest an improvement, or contact us about privacy.",
        "heading": "Contact Us",
        "intro": "Need help with a result or noticed something we could improve? Contact us about the calculators, guides, or your privacy.",
        "type": "website",
        "includeInSitemap": true,
        "sections": [
            {
                "title": "Get in touch",
                "paragraphs": [
                    "Use the address below for questions about an age result, date difference, birthday countdown, or guide. You can also report a broken link, a display problem, or something that is difficult to use.",
                    "The email link opens your device's email app. If you use webmail, you can copy the address into a new message. A short subject, such as Calculation question or Website feedback, helps explain what your message is about."
                ],
                "links": [
                    {
                        "href": "mailto:support.agecalculater@gmail.com",
                        "label": "support.agecalculater@gmail.com",
                        "icon": "mail"
                    }
                ]
            },
            {
                "title": "Report a calculation or website issue",
                "paragraphs": [
                    "A few specific details help us reproduce a problem. You do not need to know the technical cause. Tell us what you tried, what happened, and what you expected instead."
                ],
                "bullets": [
                    "Page: paste the page address or name the calculator you were using.",
                    "Steps and inputs: describe the actions that caused the issue. Use invented dates that reproduce it where possible.",
                    "Result: include the displayed answer or exact error message and explain the difference you expected.",
                    "Device: tell us whether you used a phone, tablet, or computer, and name the browser. For live counters, include your timezone and approximately when you checked.",
                    "Screenshot, if useful: crop out names, private messages, other browser tabs, and personal records before attaching it."
                ]
            },
            {
                "title": "Suggest an improvement or content correction",
                "paragraphs": [
                    "If an explanation is unclear or an example appears incorrect, include the page address and the sentence or result you are referring to. Explain the correction you suggest, and link to a relevant source if you have one.",
                    "For a feature or accessibility suggestion, describe the task you want to complete and what gets in the way. Feedback about date entry, keyboard use, screen readers, text readability, and mobile layouts is welcome."
                ]
            },
            {
                "title": "Privacy questions and messages you have sent",
                "paragraphs": [
                    "Use the same support address for privacy questions or a request concerning an earlier email. Include its subject and approximate date so we can locate the correspondence. Avoid sending identity documents, birth certificates, or children's records.",
                    "Calculator inputs are processed in your browser; ordinary calculations do not create a server-side history for us to look up. If you email us dates or other personal details, those become part of your correspondence. We use Gmail for support messages; our Privacy Policy explains email handling and optional result sharing."
                ],
                "links": [
                    {
                        "href": "mailto:support.agecalculater@gmail.com?subject=Privacy%20inquiry",
                        "label": "Send a privacy inquiry",
                        "icon": "mail"
                    },
                    {
                        "href": "/privacy-policy",
                        "label": "Read the Privacy Policy"
                    }
                ]
            },
            {
                "title": "Help with common calculation questions",
                "paragraphs": [
                    "For questions about complete years and months, leap-day birthdays, or whether both endpoint dates are counted, the guides below explain the conventions used by our tools. You are welcome to email if the explanation does not answer your question.",
                    "We can explain the site's calculation method, but cannot decide school admission, passport or visa eligibility, or other official requirements. Confirm the reference date and rules with the organisation handling your application."
                ],
                "links": [
                    {
                        "href": "/how-to-calculate-age",
                        "label": "How we calculate years, months, and days"
                    },
                    {
                        "href": "/date-difference-calculator",
                        "label": "Elapsed and inclusive day counts"
                    },
                    {
                        "href": "/leap-year-age-calculator",
                        "label": "February 29 birthdays and leap years"
                    }
                ]
            }
        ],
        "updated": "2026-11-21"
    },
    {
        "path": "/privacy-policy",
        "title": "Privacy Policy - AgeCalculater.com",
        "description": "How AgeCalculater.com handles date inputs, shared results, theme storage, website delivery, contact emails, privacy choices, and possible future Google advertising.",
        "heading": "Privacy Policy",
        "intro": "This policy explains the information involved in using AgeCalculater.com. Calculations run in your browser. Optional sharing, website delivery, and email contact involve separate data flows described below.",
        "type": "website",
        "includeInSitemap": true,
        "sections": [
            {
                "title": "Scope, contact, and current advertising status",
                "paragraphs": [
                    "This policy covers AgeCalculater.com and its calculator and guide pages. Contact the site publisher at support.agecalculater@gmail.com for questions about this policy or information associated with your use of the site.",
                    "This version does not load advertising or Google Analytics scripts. The advertising sections below describe possible future use, not services currently running on the site.",
                    "The Privacy Policy describes data practices. Merely visiting the site, using a calculator, or reading the Terms and Conditions is not consent to optional tracking."
                ],
                "links": [
                    {
                        "href": "mailto:support.agecalculater@gmail.com",
                        "label": "Email support.agecalculater@gmail.com"
                    },
                    {
                        "href": "/about-us",
                        "label": "About AgeCalculater.com"
                    }
                ]
            },
            {
                "title": "Information involved in each feature",
                "table": {
                    "caption": "What is used, why, and where it goes",
                    "headers": [
                        "Feature",
                        "Information and purpose",
                        "Where it is processed"
                    ],
                    "rows": [
                        [
                            "Calculator inputs",
                            "Birth/start date and target/end date to produce the requested result",
                            "In the browser; no calculation account or server-side history is created"
                        ],
                        [
                            "Theme preference",
                            "Light or dark preference to remember the appearance you choose",
                            "Browser local storage under the key theme"
                        ],
                        [
                            "Website and image delivery",
                            "Technical requests, potentially including IP address, URL, browser details, time, and referrer",
                            "Netlify, the website's hosting provider, to deliver and protect the site"
                        ],
                        [
                            "Optional result sharing",
                            "Selected dates, calculated age, and result link",
                            "Clipboard, the selected device sharing service, or WhatsApp, depending on your action"
                        ],
                        [
                            "Contact email",
                            "Sender address, message, and anything you attach, to handle your inquiry",
                            "Your email provider and Google Gmail, which we use to receive support messages"
                        ]
                    ]
                }
            },
            {
                "title": "Dates entered into the calculators",
                "paragraphs": [
                    "The calculator uses the dates you type in page memory. It does not transmit those inputs to a calculation API, save them to local storage, or create a user or child profile. The application does not ask for names, identity numbers, birth certificates, or other uploads.",
                    "An ordinary form entry can be changed or cleared in the current page. A saved result link can restore its dates when opened or reloaded. Browser history, device features, or a copy you share can keep that link independently of the calculator.",
                    "A date may describe you or someone else. Enter and share information only when you are entitled to do so, and avoid including unnecessary identifying information in a support message."
                ]
            },
            {
                "title": "What sharing a result sends",
                "paragraphs": [
                    "Share Result opens the device's native share sheet when supported. If native sharing is unavailable or fails, the website attempts to copy the formatted result and links to your clipboard. Canceling the native share sheet does not trigger that copy fallback. Your operating system and chosen sharing service control the subsequent sharing process.",
                    "WhatsApp opens wa.me with the prepared message in the request URL. The message contains the selected dates, result, and result link. Opening that URL sends the prepared content to WhatsApp even if you later decide not to send the message to a contact.",
                    "New result links put dates after the # character. That fragment is not included in the initial HTTP request to this site, but it is visible in the link and readable by scripts or software with access to the page. It is not encryption. Older links using date query parameters can include those dates in server request logs.",
                    "Anyone receiving a result link can read and forward its dates. The publisher cannot recall a copied message or delete a recipient's copy. Sharing providers apply their own terms, privacy notices, and settings."
                ],
                "links": [
                    {
                        "href": "https://www.whatsapp.com/legal/privacy-policy",
                        "label": "WhatsApp privacy information"
                    }
                ]
            },
            {
                "title": "Browser storage and your local controls",
                "paragraphs": [
                    "The site writes the theme value light or dark to local storage when you change the theme. It reads that preference on later visits. This entry contains no date of birth and remains until replaced, removed through browser controls, or cleared by the browser.",
                    "The calculator application does not set an advertising cookie or use local storage for a calculation history. Blocking local storage may prevent the theme from being remembered, but the calculation does not depend on it. Clear this site's data in your browser to remove the saved theme preference.",
                    "Clearing site data does not delete a link from browser history, a clipboard entry, an email, or a message you have sent. Review those separately on a shared device."
                ]
            },
            {
                "title": "Website and image hosting",
                "paragraphs": [
                    "AgeCalculater.com uses Netlify to host and deliver the website. Loading a page makes technical requests to Netlify's hosting infrastructure. Request information can include an IP address, requested URL, browser information, timestamp, and referrer, and can be recorded for delivery, diagnostics, and security. Ordinary date entry does not add the typed dates to those requests; a date-bearing query URL is a separate case.",
                    "The site icon and social-preview image are also served through Netlify. A sharing service may request the preview image when you share a link.",
                    "External services can process information in countries different from yours, depending on their infrastructure and policies. Their notices explain their own processing. A link to an external page does not make its privacy practices part of the calculator."
                ],
                "links": [
                    {
                        "href": "https://www.netlify.com/privacy/",
                        "label": "Netlify privacy information"
                    }
                ]
            },
            {
                "title": "Contact messages and retention",
                "paragraphs": [
                    "If you email support.agecalculater@gmail.com, the message includes your sender address and whatever text or attachments you provide. We use Google Gmail to receive and reply to support and privacy inquiries. Your email provider and Google process the correspondence to deliver and manage it. There is no contact-upload form or newsletter signup in the current site.",
                    "The calculator creates no server-side record of ordinary date inputs. Theme storage lasts until removed or replaced. Shared links and messages can remain wherever they were saved. Email correspondence and technical logs can remain in mailboxes, backups, and provider records; clearing calculator inputs does not remove those records.",
                    "Contact us to ask about correspondence or other records associated with you, including retention and deletion. Google's Privacy Policy explains its handling of information in Gmail."
                ],
                "links": [
                    {
                        "href": "mailto:support.agecalculater@gmail.com",
                        "label": "Email support.agecalculater@gmail.com"
                    },
                    {
                        "href": "https://policies.google.com/privacy",
                        "label": "Google Privacy Policy for Gmail and other Google services"
                    }
                ]
            },
            {
                "title": "Google AdSense and advertising data if enabled",
                "paragraphs": [
                    "If Google AdSense is enabled, Google and other participating advertising vendors may use cookies to serve advertisements based on visits to this and other websites. Google's advertising cookies allow it and its partners to personalise advertising according to those visits and the applicable choices.",
                    "Advertising providers may place or read cookies, use web beacons, and process IP addresses, browser and device information, page information, and identifiers to deliver, measure, and protect advertisements. Non-personalised advertising can still use storage or identifiers for functions such as reporting and fraud prevention.",
                    "The calculator does not send birth dates or results as analytics events or advertising targeting information. If advertising is introduced, we will update this policy to identify the participating providers and explain the available choices before it starts."
                ],
                "links": [
                    {
                        "href": "https://policies.google.com/technologies/partner-sites",
                        "label": "How Google uses information from sites and apps that use its services"
                    },
                    {
                        "href": "https://policies.google.com/technologies/ads",
                        "label": "Google advertising technologies"
                    }
                ]
            },
            {
                "title": "Consent and advertising choices",
                "paragraphs": [
                    "Advertising and analytics scripts are disabled in this version. The Privacy and cookie settings link in the footer explains the current status. When Google consent messages are available, that page offers a way to reopen the European consent message; Google's own Do Not Sell or Share My Personal Information link provides applicable US state opt-out choices. Clicking Calculate, scrolling, or waiting does not grant consent.",
                    "You can manage Google's personalised advertising through My Ad Center and explore participating vendors' opt-out choices through the Digital Advertising Alliance. These external settings do not replace choices that must be offered on this site. If ads are introduced, declining optional tracking will not prevent use of the calculators."
                ],
                "links": [
                    {
                        "href": "/privacy-policy#privacy-settings",
                        "label": "Privacy and cookie settings"
                    },
                    {
                        "href": "https://myadcenter.google.com/",
                        "label": "Google My Ad Center"
                    },
                    {
                        "href": "https://optout.aboutads.info/",
                        "label": "Digital Advertising Alliance opt-out choices"
                    }
                ]
            },
            {
                "title": "Privacy requests and applicable rights",
                "paragraphs": [
                    "Depending on the law that applies, you may have rights to request access to personal information, correction, deletion, restriction, portability, or to object to particular processing. Where processing relies on consent, you may withdraw that consent; withdrawal does not itself undo earlier lawful processing. You may also have the right to complain to the relevant privacy regulator.",
                    "Send a request to support.agecalculater@gmail.com describing the information or correspondence concerned. Start with the minimum details needed to locate it. Do not send a passport, birth certificate, or other identity document unless a necessary and appropriate verification step has been explained.",
                    "Rights, exceptions, verification requirements, and response periods depend on applicable law. Requests about information held independently by a sharing service or a recipient may need to be directed to that party. The calculator cannot identify a server-side birth-date record from ordinary input because it does not create one."
                ],
                "links": [
                    {
                        "href": "mailto:support.agecalculater@gmail.com",
                        "label": "Email support.agecalculater@gmail.com"
                    }
                ]
            },
            {
                "title": "Children and family dates",
                "paragraphs": [
                    "The child-age guide is written for parents and caregivers. The website does not create child accounts or ask children to submit names, contact details, school information, or identity documents. A calculation can be performed without sharing its result.",
                    "A child's date of birth can still be personal information when sent in an email or result link. Avoid sharing it unnecessarily. If you believe a message sent to the site contains a child's information that should be removed, contact us with enough context to locate the message."
                ],
                "links": [
                    {
                        "href": "/contact-us",
                        "label": "Contact AgeCalculater.com"
                    }
                ]
            },
            {
                "title": "Security and policy changes",
                "paragraphs": [
                    "No website, device, email service, or shared link can offer an absolute security guarantee. Protect your device, check the recipient before sharing, and avoid sending sensitive records that are not needed for a calculation or inquiry.",
                    "We will update this policy when data handling changes and provide notice where required by law. The revision date identifies the latest content update. A revised policy does not replace a separate consent choice where one is required."
                ],
                "links": [
                    {
                        "href": "/terms-and-conditions",
                        "label": "Terms and Conditions"
                    }
                ]
            }
        ],
        "updated": "2026-11-21"
    },
    {
        "path": "/terms-and-conditions",
        "title": "Terms and Conditions - AgeCalculater.com",
        "description": "Terms for using AgeCalculater.com: the scope of the free calculators, responsible use, sharing, content rights, external services, and protections under applicable law.",
        "heading": "Terms and Conditions",
        "intro": "These terms describe the conditions for using AgeCalculater.com and the scope of its free age and date tools. Please read them together with the Privacy Policy and Disclaimer.",
        "type": "website",
        "includeInSitemap": true,
        "sections": [
            {
                "title": "The service these terms cover",
                "paragraphs": [
                    "These terms cover the calculators, explanatory guides, and result-sharing features on AgeCalculater.com. In these terms, we means the site publisher. Questions can be sent to support.agecalculater@gmail.com.",
                    "The current service is free to use and does not offer accounts, paid subscriptions, document verification, or application processing. It provides general calendar information. It does not enter into an advisory relationship or act on behalf of a school, government office, employer, or healthcare provider."
                ],
                "links": [
                    {
                        "href": "mailto:support.agecalculater@gmail.com",
                        "label": "Email support.agecalculater@gmail.com"
                    },
                    {
                        "href": "/privacy-policy",
                        "label": "Privacy Policy"
                    },
                    {
                        "href": "/disclaimer",
                        "label": "Disclaimer and calculation limitations"
                    }
                ]
            },
            {
                "title": "Choosing inputs and using a result",
                "paragraphs": [
                    "Check the birth or start date, the target date, and the requested units before relying on a result. A calculation describes the dates entered; it does not authenticate those dates or the identity of a person.",
                    "If an anniversary day does not exist in a month, the calculator uses that month's last day. This includes a February 28 anniversary for February 29 births in non-leap years. If an organisation specifies another reference date or convention, follow its instructions. Confirm important records independently before submitting them.",
                    "A result link is a convenient way to reproduce a calculation. It is not a certificate, proof of age, identity document, or guarantee of eligibility."
                ],
                "links": [
                    {
                        "href": "/how-to-calculate-age",
                        "label": "Read the calendar method"
                    }
                ]
            },
            {
                "title": "Responsible use",
                "bullets": [
                    "Use the service lawfully and respect the privacy and rights of other people.",
                    "Do not attempt unauthorised access, distribute malicious code through the site, or deliberately disrupt its availability.",
                    "Do not present a calculator result or a copied page as an official decision or identity verification.",
                    "Do not generate artificial advertising clicks or impressions, use click bots, or ask others to click advertisements to support the site if ads are introduced."
                ],
                "paragraphs": [
                    "The child-age guide is intended for parents and caregivers making date calculations. You do not need to provide a child's name, identity document, school record, or medical information."
                ]
            },
            {
                "title": "Sharing dates and using external services",
                "paragraphs": [
                    "You choose whether to share a result. Shared text and links reveal the selected dates and result to recipients. Share only information that you are entitled and willing to disclose. A link can be forwarded, and the website cannot recall copies held by other people.",
                    "WhatsApp, a device share sheet, email software, and linked third-party websites are separate services with their own terms and privacy notices. Opening those services can send information to their providers. The Privacy Policy explains which sharing action sends or copies the prepared result.",
                    "Using the calculator or reading these terms does not give consent to optional advertising or analytics tracking. Where consent is required, it must be obtained separately through the applicable controls."
                ],
                "links": [
                    {
                        "href": "/privacy-policy",
                        "label": "Privacy Policy"
                    }
                ]
            },
            {
                "title": "Content and intellectual property",
                "paragraphs": [
                    "You may use your calculated results, link to the site, and share result links for legitimate purposes. Rights in original articles, branding, and interface design belong to their respective owners. Third-party names, marks, and licensed materials remain subject to their owners' rights and applicable licences.",
                    "Do not reproduce substantial original site content as your own or imply that the publisher endorses your product or service. This does not restrict uses permitted by applicable law, including applicable quotation, fair-use, or fair-dealing exceptions. Contact us about reuse that requires permission."
                ],
                "links": [
                    {
                        "href": "/contact-us",
                        "label": "Contact AgeCalculater.com"
                    }
                ]
            },
            {
                "title": "Availability and changes to the service",
                "paragraphs": [
                    "Interactive calculations require JavaScript and a compatible browser. Live counters depend on the device clock. The service may be interrupted or changed for maintenance, corrections, security, or other operational reasons. Keep your own records when you need a durable copy.",
                    "We aim to provide accurate and useful information, but do not promise that the site will always be available, error-free, or suitable for every particular purpose. Any limits on warranties apply only to the extent allowed by applicable law."
                ]
            },
            {
                "title": "Responsibility and rights that remain protected",
                "paragraphs": [
                    "A calculator cannot control the accuracy of a source document, the reference date an institution requires, or a decision made using a result. Check those matters with the relevant source. Responsibility for any loss arising from the service is determined under applicable law; these terms do not create a blanket exclusion of liability.",
                    "Nothing in these terms excludes or limits liability for fraud, fraudulent misrepresentation, death or personal injury caused by negligence where that liability cannot be excluded, or any other liability that the law does not allow us to exclude or limit. Your mandatory consumer and data-protection rights remain unaffected.",
                    "If a provision cannot be enforced under applicable law, that does not remove rights the law gives you or prevent the remaining lawful provisions from applying."
                ]
            },
            {
                "title": "Advertising and outside links",
                "paragraphs": [
                    "Advertising is disabled in the current version. If ads are introduced, an advertisement or outside link is not a recommendation, guarantee, or endorsement of the advertised product. An advertiser is responsible for its own offers and service terms, subject to applicable law.",
                    "No payment or advertisement click is required to perform a calculation."
                ],
                "links": [
                    {
                        "href": "/privacy-policy",
                        "label": "Privacy Policy"
                    }
                ]
            },
            {
                "title": "Revisions and questions",
                "paragraphs": [
                    "The revision date shown on this page identifies the latest version of these terms. Changes will be described or notified where applicable law requires. A revision does not retrospectively remove rights you already have or make past use consent to new data processing.",
                    "If you have a question or dispute about the site, contact support.agecalculater@gmail.com with the relevant page and a concise description. Contacting us does not prevent you from using a complaint process, regulator, or court available under applicable law."
                ],
                "links": [
                    {
                        "href": "mailto:support.agecalculater@gmail.com",
                        "label": "Email support.agecalculater@gmail.com"
                    }
                ]
            }
        ],
        "updated": "2026-11-21"
    },
    {
        "path": "/disclaimer",
        "title": "Disclaimer - AgeCalculater.com",
        "description": "Understand what AgeCalculater.com results can and cannot establish, including calendar assumptions, device-clock limits, official decisions, and correction requests.",
        "heading": "Disclaimer",
        "intro": "AgeCalculater.com explains calendar calculations for everyday planning and checking. The following limits help you decide whether a result answers your particular question.",
        "type": "website",
        "includeInSitemap": true,
        "sections": [
            {
                "title": "Calendar information, not an official decision",
                "paragraphs": [
                    "The calculators and guides provide general calendar information. They do not provide professional advice, verify identity, or certify eligibility.",
                    "A school cut-off example demonstrates an age on a hypothetical date. It does not decide admission. A travel-form example demonstrates a birthday boundary; it does not establish a visa category, passport validity, or permission to travel. Child age is chronological calendar age, not corrected age, a developmental assessment, or a medical schedule."
                ]
            },
            {
                "title": "Calendar conventions can affect the answer",
                "paragraphs": [
                    "The site uses the Gregorian calendar, counts complete years and months, then remaining days, and moves a missing anniversary day to the last day of its month. February 29 uses February 28 in non-leap years. These are the tool's published conventions, not a statement of the rule used by every authority.",
                    "Total days measures the elapsed calendar interval. Counting both the start and end dates as included dates is a different task. Hours, minutes, and seconds in the total-unit summary use 24-hour calendar days and do not measure a documented time of birth.",
                    "The tools do not convert dates from other calendar systems or account for historical changes in the calendar used by a particular country."
                ],
                "links": [
                    {
                        "href": "/how-to-calculate-age",
                        "label": "Calculation method and examples"
                    },
                    {
                        "href": "/date-difference-calculator",
                        "label": "Elapsed and inclusive day counts"
                    }
                ]
            },
            {
                "title": "Selected-date results and live time displays",
                "paragraphs": [
                    "The age result, calculation breakdown, and birthday timeline use the selected target date. Live age and birthday countdowns use the device's current clock and timezone. They can therefore describe different dates on the same page.",
                    "The countdown ends at local midnight at the start of the birthday. No birth time or birthplace is requested. An incorrect device clock, a timezone change, daylight-saving time, or a paused browser tab can affect a live display. The page does not send birthday reminders after it is closed."
                ]
            },
            {
                "title": "Check important inputs and requirements",
                "bullets": [
                    "Verify the birth date against the relevant source and check that day and month have not been swapped.",
                    "Use the specific reference date named by the organisation, rather than assuming today or the event date is correct.",
                    "Confirm any leap-day anniversary rule or inclusive-day rule required for the task.",
                    "Ask the school, issuing authority, employer, or qualified professional about decisions outside the calculator's scope."
                ],
                "paragraphs": [
                    "A shared link contains the entered dates and a reproducible result. It does not verify who entered them or whether the underlying record is authentic."
                ]
            },
            {
                "title": "Accuracy, external information, and corrections",
                "paragraphs": [
                    "We check the calculation code and published examples, but testing cannot eliminate every mistake or guarantee suitability for every use. Report a result that appears wrong with the page address, invented input dates that reproduce the issue, and the expected result.",
                    "External pages and any future advertisements are controlled by their providers. A reference or advertisement does not imply endorsement, affiliation, or a guarantee that an outside page remains accurate. Consult the original authority for current requirements."
                ],
                "links": [
                    {
                        "href": "/contact-us",
                        "label": "Contact AgeCalculater.com"
                    }
                ]
            },
            {
                "title": "Your legal rights",
                "paragraphs": [
                    "This disclaimer explains the intended scope and limitations of the tools. It does not exclude responsibilities or remedies that cannot lawfully be excluded. The Terms and Conditions contain the related service conditions, and the Privacy Policy explains data handling."
                ],
                "links": [
                    {
                        "href": "/terms-and-conditions",
                        "label": "Terms and Conditions"
                    },
                    {
                        "href": "/privacy-policy",
                        "label": "Privacy Policy"
                    }
                ]
            }
        ],
        "updated": "2026-11-21"
    }
];
