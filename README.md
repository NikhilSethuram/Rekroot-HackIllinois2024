# Rekroot

## Inspiration
Our journey with Rekroot was ignited by our firsthand struggles in the job application landscape. With a collective 1500 internship applications between us just this season, we faced the disheartening cycle of applications and rejections head-on. This experience unveiled a critical insight: the traditional cold application process, especially within the tech and computer science fields, is profoundly inefficient and often unsuccessful. Motivated by our personal challenges and the desire to create a meaningful impact, we envisioned Rekroot as a transformative tool that not only streamlines the job application process but also fosters meaningful connections between job seekers and employers, emphasizing strategic engagement and genuine interest.

## What it does?
Rekroot reinvents the job search process with a simple, engaging swipe mechanism. Users swipe right on jobs and companies that match their interests, initiating an automated application process. This intuitive interaction is backed by a content-based recommendation system, which uses cosine similarity in Scikit-learn to suggest relevant opportunities tailored to the user's profile.

Upon swiping right, Rekroot automates sending personalized application emails directly to the right contacts, using data from the Hunter API and job aggregators. This ensures that a user’s application stands out by highlighting their interest and qualifications immediately to recruiters or hiring managers. The outreach messages are crafted and optimized by an advanced LLM chain model, ensuring that the communication is not only personalized but also has a higher chance of securing an interview. Additionally, we have a built in tracker, so you don't have to worry about what emails you sent or not!

In summary, Rekroot is a strategic tool that simplifies the job application process, making it more efficient and effective by connecting job seekers directly with opportunities that fit their interests and profiles.

## How we built it
The creation of Rekroot seamlessly blended advanced technologies to transform the job search process. We utilized React Native for a smooth user interface, and Scikit-learn for our recommendation engine, which uses a content-based filtering algorithm with cosine similarity to match user interests with job opportunities. A key feature is our integration of an advanced Large Language Model (LLM) in LangChain for automating personalized outreach messages, enhancing the application's effectiveness. Additionally, the Hunter API enabled precise email discovery, while Python allowed for comprehensive web scraping across job platforms. This integrated approach ensures Rekroot efficiently connects job seekers with relevant opportunities, offering a streamlined and personalized job application experience.

## Challenges we ran into
Developing Rekroot presented notable challenges. Foremost was ensuring seamless frontend (React Native) and backend integration for a fluid user experience, requiring technical skill and persistence. We also faced the task of navigating and extracting data from job websites like LinkedIn, which implement robust scraping defenses, pushing us to innovate our data retrieval methods.

Refining Rekroot’s features, particularly our AI-driven recommendation and application tracking systems, demanded constant learning and adaptability to ensure personalized job matches and accurate tracking. This process was complex but essential in creating an efficient and user-friendly job search ecosystem.

Each hurdle we encountered and overcame was a step towards redefining the job search experience, highlighting our commitment to innovation and user-centric design.

## Accomplishments that we're proud of
Bringing Rekroot from concept to reality is our crowning achievement. The platform stands as a testament to our dedication and technical skill, successfully addressing a significant pain point in the job search process. Our ability to learn and implement new technologies, like React Native, from the ground up, and to integrate complex systems into a cohesive and functional application is particularly gratifying. Additionally, we also were able to pivot our idea heavily and dedicate our time to making sure we maintained the mission.

## What we learned
The development of Rekroot was a profound learning journey, enriching our expertise in several key areas of technology and project management. We delved deep into the workings of React Native, honing our skills in building user-centric applications. Exploring the capabilities of large language models and recommendation systems offered insights into the potential of AI in personalizing the job search experience. Perhaps most importantly, we learned the value of resilience and adaptability, facing and overcoming challenges with innovative solutions and strategic pivots.

## What's next for Rekroot
Our vision for Rekroot is expansive, with plans to enhance the platform's capabilities and reach. We aim to refine the recommendation algorithm further, ensuring even more precise and personalized job matches. Expanding our database to encompass a broader spectrum of industries and opportunities will make Rekroot a more versatile tool for job seekers across different career stages and interests. Improving the user interface and experience remains a priority, alongside exploring strategic partnerships to enrich the platform's offerings. Additionally, we hope to more seamlessly integrate with Linkedin Easy Apply to ensure that we are a cornerstone in the job search ecosystem, revolutionizing how job seekers connect with opportunities and embark on their career journeys.
