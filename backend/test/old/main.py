
import yaml, pdb
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from linkedineasyapply import LinkedinEasyApply
from validate_email import validate_email

def init_browser():
    browser_options = Options()
    options = ['--disable-blink-features', '--no-sandbox', '--start-maximized', '--disable-extensions',
               '--ignore-certificate-errors', '--disable-blink-features=AutomationControlled']

    for option in options:
        browser_options.add_argument(option)

    driver = webdriver.Chrome(ChromeDriverManager().install(), chrome_options=browser_options)

    driver.set_window_position(0, 0)
    driver.maximize_window()

    return driver


def validate_yaml():
    with open("config.yaml", 'r') as stream:
        try:
            parameters = yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            raise exc

    mandatory_params = ['email', 'password', 'disableAntiLock', 'remote', 'experienceLevel', 'jobTypes', 'date',
                        'positions', 'locations', 'distance', 'outputFileDirectory', 'checkboxes', 'universityGpa',
                        'languages', 'industry', 'technology', 'personalInfo', 'eeo', 'uploads']

    for mandatory_param in mandatory_params:
        if mandatory_param not in parameters:
            raise Exception(mandatory_param + ' is not inside the yml file!')

    assert validate_email(parameters['email'])
    assert len(str(parameters['password'])) > 0

    assert isinstance(parameters['disableAntiLock'], bool)

    assert isinstance(parameters['remote'], bool)

    assert len(parameters['experienceLevel']) > 0
    experience_level = parameters.get('experienceLevel', [])
    at_least_one_experience = False
    for key in experience_level.keys():
        if experience_level[key]:
            at_least_one_experience = True
    assert at_least_one_experience

    assert len(parameters['jobTypes']) > 0
    job_types = parameters.get('jobTypes', [])
    at_least_one_job_type = False
    for key in job_types.keys():
        if job_types[key]:
            at_least_one_job_type = True
    assert at_least_one_job_type

    assert len(parameters['date']) > 0
    date = parameters.get('date', [])
    at_least_one_date = False
    for key in date.keys():
        if date[key]:
            at_least_one_date = True
    assert at_least_one_date

    approved_distances = {0, 5, 10, 25, 50, 100}
    assert parameters['distance'] in approved_distances

    assert len(parameters['positions']) > 0
    assert len(parameters['locations']) > 0

    assert len(parameters['uploads']) >= 1 and 'resume' in parameters['uploads']

    assert len(parameters['checkboxes']) > 0

    checkboxes = parameters.get('checkboxes', [])
    assert isinstance(checkboxes['driversLicence'], bool)
    assert isinstance(checkboxes['requireVisa'], bool)
    assert isinstance(checkboxes['legallyAuthorized'], bool)
    assert isinstance(checkboxes['urgentFill'], bool)
    assert isinstance(checkboxes['commute'], bool)
    assert isinstance(checkboxes['backgroundCheck'], bool)
    assert 'degreeCompleted' in checkboxes

    assert isinstance(parameters['universityGpa'], (int, float))

    languages = parameters.get('languages', [])
    language_types = {'none', 'conversational', 'professional', 'native or bilingual'}
    for language in languages:
        assert languages[language].lower() in language_types

    industry = parameters.get('industry', [])

    for skill in industry:
        assert isinstance(industry[skill], int)
    assert 'default' in industry

    technology = parameters.get('technology', [])

    for tech in technology:
        assert isinstance(technology[tech], int)
    assert 'default' in technology

    assert len(parameters['personalInfo'])
    personal_info = parameters.get('personalInfo', [])
    for info in personal_info:
        assert personal_info[info] != ''

    assert len(parameters['eeo'])
    eeo = parameters.get('eeo', [])
    for survey_question in eeo:
        assert eeo[survey_question] != ''

    return parameters


if __name__ == '__main__':
    parameters = validate_yaml()
    browser = init_browser()

    bot = LinkedinEasyApply(parameters, browser)
    bot.login()
    bot.security_check()
    bot.start_applying()




# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
# from selenium.common.exceptions import NoSuchElementException
# import time
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.chrome.service import Service as ChromeService
# from webdriver_manager.chrome import ChromeDriverManager

# chrome_options = Options()
# chrome_options.add_argument('--no-sandbox')
# chrome_options.add_argument('--disable-dev-shm-usage')
# # # chrome_options.add_argument('--headless')

# ACCOUNT_EMAIL = 'b568hello@gmail.com'
# ACCOUNT_PASSWORD = 'Gsy@Gsy4509'
# PHONE = '4996665577'

# # chrome_driver_path = 'chromedriver'
# driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
# driver.maximize_window()
# driver.get('https://www.linkedin.com/jobs/search/?f_AL=true&keywords=product%20Analyst&location=taiwan&geoId=&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0')
# # ("https://www.linkedin.com/jobs/search/?f_LF=f_AL&geoId=102257491&keywords=marketing%20intern&location=London%2C%20England%2C%20United%20Kingdom&redirect=false&position=1&pageNum=0")


# time.sleep(2)
# sign_in_button = driver.find_element('link text', "Sign in")
# sign_in_button.click()

# time.sleep(5)
# email_field = driver.find_element('id', "username")
# email_field.send_keys(ACCOUNT_EMAIL)
# password_field = driver.find_element("id", "password")
# password_field.send_keys(ACCOUNT_PASSWORD)
# password_field.send_keys(Keys.ENTER)

# time.sleep(50)

# # jobs_block = driver.find_elements("class name",'jobs-search-results__list')
# # jobs_list = jobs_block.find_elements(By.CSS_SELECTOR, ".jobs-search-results__list-item")
# page = 2
# while page < 5 :
#     i = 0
# # print(len(jobs_list))
#     while i < 4:
#         jobs_list = driver.find_elements("css selector", ".job-card-container--clickable")
#         print(len(jobs_list))
#         driver.execute_script("arguments[0].scrollIntoView();", jobs_list[-1])
#         time.sleep(2)
#         i += 1

#     for listing in jobs_list:
#         listing.click()
#         print("called")

#         time.sleep(3)
#         try:

#             apply_button = driver.find_element("css selector",".jobs-apply-button--top-card")
#             if apply_button.text == 'Easy Apply':
#                 apply_button.click()
#                 time.sleep(5)
#                 submit_button = driver.find_element("class name", "artdeco-button--primary")
#                 # first page
#                 if submit_button.text == 'Next':
#                     time.sleep(5)
#                     # resume_button = driver.find_element("css selector", "[aria-label='Choose Resume']")
#                     submit_button.click()
#                     # Second page
#                     resume_button = driver.find_element("css selector", "[aria-label='Choose Resume']")
#                     resume_button.click()
#                     time.sleep(3)
#                     # Third page
#                     review_button = driver.find_element("class name", "artdeco-button--primary")
#                     print(review_button)
#                     if review_button.text == 'Review':
#                         print('review section')
#                         review_button.click()
#                         time.sleep(3)
#                         fin_button = driver.find_element("css selector", "[aria-label='Submit application']")
#                         fin_button.click()
#                         time.sleep(3)
#                     else:
#                         print('continue section')
#                         review_button.click()
#                         time.sleep(5)

#                         # Forth page
#                         qCheck = driver.find_element("class name", "t-16")
#                         if qCheck.text == 'Additional Questions':
#                             time.sleep(3)
#                             close_button = driver.find_element("class name", "artdeco-modal__dismiss")
#                             close_button.click()
#                             time.sleep(5)
#                             # save application which needs more info

#                             save_button = driver.find_elements("class name", "artdeco-modal__confirm-dialog-btn")[1]
#                             save_button.click()
#                             time.sleep(5)
#                         else:
#                             next_button = driver.find_element("css selector", "[aria-label='Review your application']")
#                             next_button.click()
#                             time.sleep(3)
#                             fin_button = driver.find_element("css selector", "[aria-label='Submit application']")
#                             fin_button.click()
#                             time.sleep(3)

#                 elif submit_button.text == 'Submit application':
#                     resume_button = driver.find_element("css selector", "[aria-label='Choose Resume']")
#                     resume_button.click()
#                     submit_button.click()
#                     time.sleep(3)
#                 else:
#                     close_button = driver.find_element("class name", "artdeco-modal__dismiss")
#                     close_button.click()
#                     time.sleep(5)
#             #make sure window is closed
#             try:
#                 check_close_btn = driver.find_element("class name", "artdeco-modal__dismiss")
#                 check_close_btn.click()
#                 try:
#                     time.sleep(5)
#                     save_button = driver.find_elements("class name", "artdeco-modal__confirm-dialog-btn")[1]
#                     save_button.click()
#                 except :
#                     pass
#             except NoSuchElementException:
#                 pass
#         except NoSuchElementException:
#             print("No application button, skipped.")
#             try:
#                 check_close_btn = driver.find_element("class name", "artdeco-modal__dismiss")
#                 check_close_btn.click()
#                 try:
#                     time.sleep(5)
#                     save_button = driver.find_elements("class name", "artdeco-modal__confirm-dialog-btn")[1]
#                     save_button.click()
#                 except :
#                     pass
#             except NoSuchElementException:
#                 pass
#             continue
#     driver.find_elements("xpath", f"//button[@aria-label='Page {page}']")[0].click()
#     page += 1
# time.sleep(5)
# driver.quit()


# # import csv
# # import requests
# # from bs4 import BeautifulSoup
  
# # file = open('linkedin-jobs.csv', 'a')
# # writer = csv.writer(file)
# # writer.writerow(['Title', 'Company', 'Location', 'Apply'])



# # def linkedin_scraper(webpage, page_number):
# #    next_page = webpage + str(page_number)
# #    print(str(next_page))
# #    response = requests.get(str(next_page))
# #    soup = BeautifulSoup(response.content,'html.parser')
  
# #    jobs = soup.find_all('div', class_='base-card relative w-full hover:no-underline focus:no-underline base-card--link base-search-card base-search-card--link job-search-card')
# #    for job in jobs:
# #        tmp=[]
# #        job_title = job.find('h3', class_='base-search-card__title').text.strip().encode('utf-8')
# #        job_company = job.find('h4', class_='base-search-card__subtitle').text.strip().encode('utf-8')
# #        job_location = job.find('span', class_='job-search-card__location').text.strip().encode('utf-8')
# #        job_link = job.find('a', class_='base-card__full-link')['href']
# #        job_title=str(job_title, "utf-8")
# #        job_company=str(job_company, "utf-8")
# #        job_location=str(job_location, "utf-8")
# #        #job_link=str(job_link, "utf-8")
# #        tmp.append(job_title)
# #        tmp.append(job_company)
# #        tmp.append(job_location)
# #        tmp.append(job_link)
    
       
# #        writer.writerow([
# #            job_title,
# #            job_company,
# #            job_location,
# #            job_link
# #            ])
       
# #    if page_number < 250:
# #      page_number = page_number + 250
# #      linkedin_scraper(webpage, page_number)
# #    else:
# #        file.close()
# #        print('File closed')
  

# # linkedin_scraper('https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=python&location=San%20Francisco%20Bay%20Area&amp;geoId=90000084&amp;trk=public_jobs_jobs-search-bar_search-submit&amp;position=1&amp;pageNum=0&amp;start=', 0) 



# # # from selenium import webdriver
# # # from webdriver_manager.chrome import ChromeDriverManager
# # # from linkedineasyapply import LinkedinEasyApply


# # # def init_browser():
# # #     browser_options = webdriver.ChromeOptions()
    
# # #     browser_options.add_argument("--disable-blink-features")
# # #     browser_options.add_argument("--no-sandbox")
# # #     browser_options.add_argument("--start-maximized")
# # #     browser_options.add_argument("--disable-extensions")
# # #     browser_options.add_argument("--ignore-certificate-errors")
# # #     browser_options.add_argument("--disable-blink-features=AutomationControlled")

# # #     driver = webdriver.Chrome(
# # #         # service=ChromeDriverManager().install(),
# # #         options=browser_options
# # #     )
    
# # #     driver.set_window_position(0, 0)
# # #     driver.maximize_window()

# # #     return driver

# # # if __name__ == "__main__":
# # #     browser = init_browser()

# # #     bot = LinkedinEasyApply(browser)
# # #     bot.login()
# # #     bot.security_check()
# # #     bot.start_applying()