import logging 
import json 
import re 
from groq import Groq 

logger = logging.getLogger(__name__) 

def get_schemes(): 
    client = Groq()

    formatted_prompt = """
    Search the web and find the best and currently active government agricultural schemes for Indian farmers.


    For each scheme, include:
    - Scheme Name
    - Description
    - Eligibility
    - Required Documents
    - Forms
    - Application Process

    Important instructions:
    1. Try to list the latest schemes keep stuff as recent as possible. 
    2. Include information about where to find forms, how to fill them, where to submit them, etc.
    3. Include relevant URLs, contact information, and helpline numbers where applicable.
    4. Make the instructions simple enough for farmers with limited technical knowledge to understand.
    5. Include information about tracking the application status after submission.

    Example:
    "schemes" : {
        {
        "name": "Kisan Credit Card Scheme",
        "description": "Provides easy credit to farmers for agricultural needs.",
        "eligibility": "Farmers with land records and Aadhaar",
        "requiredDocuments": [
            "Aadhaar",
            "land records",
            "bank account"
        ],
        "forms": "Available at local bank branches",
        "applicationProcess": "Apply through local bank branches. Fill the form carefully and submit it along with the required documents.",
        "helpline": "Bank-specific helplines",
        "tracking": "Track application status by contacting the bank branch where the application was submitted.",
        "url": "https://www.bankingfront.com/kisan-credit-card"
        }
    }
    """

    response = client.chat.completions.create(
        model="compound-beta",
        messages=[
            {
                "role": "system",
                "content": "You are Sahayak AI Assistant. Do not include any explanations, markdown, or extra text. Output a JSON object with a single key \"schemes\". whose value is a list of scheme objects as shown in the example. Do not output a raw list or any other structure.    "
            },
            {
                "role": "user",
                "content": formatted_prompt
            }
        ],
        response_format={"type": "json_object"}
    )

    content = response.choices[0].message.content

    # Extract the first JSON object from the response
    match = re.search(r'(\{.*\}|\[.*\])', content, re.DOTALL)
    if match:
        json_str = match.group(1)
        try:
            data = json.loads(json_str)
            # If data is a list, wrap it in a dict
            if isinstance(data, list):
                return {"schemes": data}
            # If data is already a dict with 'schemes', return as is
            if isinstance(data, dict) and "schemes" in data:
                return data
            # If data is a single scheme dict, wrap in a list
            if isinstance(data, dict):
                return {"schemes": [data]}
            return data
        except json.JSONDecodeError:
            logger.error("Extracted content was not valid JSON:")
            return (json_str)
    else:
        logger.error("No JSON object or array found in response:")
        return(content)