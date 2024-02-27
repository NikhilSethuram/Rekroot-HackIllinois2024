import requests

def fetch_jobs(search_query, location):
    """
    Fetches jobs from Google Jobs via SerpApi.

    Args:
    - search_query (str): The job title or interest to search for.
    - location (str): The geographic location for the job search.
    - api_key (str): Your SerpApi API key.

    Returns:
    - dict: A dictionary object with the search results.
    """
    base_url = "https://serpapi.com/search.json"
    params = {
        "engine": "google_jobs",
        "q": search_query,
        "location": location,
        "hl": "en",  # Change this as needed for language
        "api_key": "8be06802deaa1ad7513b6aa1667159d3f79a3557da8983487115421dd151a10d10099992233"
    }

    response = requests.get(base_url, params=params)

        # for s in response.json()['jobs_results'][0]['description']:
    #     print(s)

    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to fetch jobs data")
        return {}

# Example usage
search_query = "software engineer"  # Change this to your job interest
location = "New York, NY"  # Change this to your preferred location

jobs_data = fetch_jobs(search_query, location)
print(jobs_data)

